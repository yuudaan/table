<template>
    <table
        class="grid-core"
        border="0"
        cellpadding="0"
        cellspacing="0"
    >
        <tbody>
            <tr
                v-for="(rows, rIdx) in gridData"
                :key="rIdx"
            >
                <td
                    v-for="(cell, cIdx) in rows"
                    :key="cIdx"
                    :style="getCellStyle(rIdx, cIdx, cell)"
                    :class="{
                        'grid-core__cell--checkbox': isCheckbox,
                        'grid-core__cell--checkbox-header': isCheckbox && !cIdx,
                    }"
                    class="grid-core__cell"
                >
                    <Cell v-bind="cell" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import Cell from './Cell/index';
import {
    createStyle,
    createGridStyle,
    createLineStyle,
    createGradientColors,
} from '../../utils/ui';

export default {
    name: 'GridCore',

    components: {
        Cell,
    },

    props: {
        data: {
            type: Array,
            default: () => ([]),
        },

        theme: {
            type: Object,
            required: true,
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        isCheckbox() {
            return !!this.theme.checkbox;
        },

        lineConf() {
            return this.theme.lines;
        },

        gridConf() {
            return this.theme.grids;
        },

        gridRow() {
            return this.data.length;
        },

        gridCol() {
            return this.data[0].length;
        },

        // 除去标题栏表格的内容区域
        contentRange() {
            const {
                options: {
                    header,
                },
                gridRow,
                gridCol,
            } = this;
            const {
                row: headerRows = [],
                col: headerCols = [],
            } = header || {};
            const start = {
                row: headerRows.length ? Math.max.apply(null, headerRows) + 1 : 0,
                col: headerCols.length ? Math.max.apply(null, headerCols) + 1 : 0,
            };
            const end = {
                row: Math.max(gridRow - 1, 0),
                col: Math.max(gridCol - 1, 0),
            };
            return { start, end };
        },

        /**
         * 由表格内容自动生成对应单元渐变色
         */
        contentColorMap() {
            const {
                data,
                gridCol,
                options: {
                    gradient,
                },
                theme: {
                    colors,
                    gradientColors,
                },
                contentRange: {
                    start,
                    end,
                },
            } = this;
            if (!gradient || !gradient.content) {
                return {};
            }
            const contentMap = {};
            /* eslint-disable */
            /**
             * 按从左到右从上至下的索引设置单元格内容权重
             */
            for (let row = start.row; row <= end.row; row += 1) {
                for (let col = start.col; col <= end.col; col += 1) {
                    const content = data[row] ? data[row][col] : '';
                    if (content) {
                        const weight = col * gridCol + row;
                        contentMap[content] = Math.max(contentMap[content] || 0, weight);
                    }
                }
            }
            // 按权重排序
            const sequence = Object.entries(contentMap)
                .sort((a, b) => a[1] - b[1])
                .map(([key]) => key);
            const standardColors = gradientColors.map(color => (colors[color] || color));
            // 按内容渐变
            if (sequence && sequence.length) {
                const colorList = createGradientColors(
                    standardColors[0],
                    standardColors[1],
                    sequence.length,
                );
                const colorMap = {};
                sequence.forEach((value, index) => {
                    colorMap[value] = colorList[index];
                });
                return colorMap;
            }
            return {};
        },

        // 单元格值对应的颜色 map
        directionColorMap() {
            const {
                options: {
                    gradient,
                },
                theme: {
                    colors,
                    gradientColors,
                },
                contentRange: {
                    start,
                    end,
                },
            } = this;
            if (
                !gradient
                || !gradientColors
                || !gradientColors.length
            ) {
                return {};
            }
            const { direction } = gradient;
            const standardColors = gradientColors.map(color => (colors[color] || color));
            // 按行列方向渐变
            if (direction) {
                let rowColors = [];
                let colColors = [];
                if (direction === 'row') {
                    colColors = createGradientColors(
                        standardColors[0],
                        standardColors[1],
                        end.col - start.col + 1,
                    );
                } else {
                    rowColors = createGradientColors(
                        standardColors[0],
                        standardColors[1],
                        end.row - start.row + 1,
                    );
                }
                const colorMap = {};
                for (let i = 0; i <= end.row - start.row; i += 1) {
                    const rowColor = rowColors[i];
                    for (let j = 0; j <= end.col - start.col; j += 1) {
                        const colColor = colColors[j];
                        const color = rowColor || colColor;
                        if (color) {
                            colorMap[`${i + start.row}-${j + start.col}`] = color;
                        }
                    }
                }
                return colorMap;
            }
            return {};
        },

        checkedCellMap() {
            const { checkbox } = this.options;
            if (!checkbox || !checkbox.checked.length) {
                return {};
            }
            const cellMap = {};
            checkbox.checked.forEach(({ row, col }) => {
                cellMap[`${row}-${col}`] = true;
            });
            return cellMap;
        },

        checkedCellAttrs() {
            const {
                options: {
                    checkbox,
                },
                theme,
                contentRange,
            } = this;
            if (!checkbox || !theme.checkbox) return null;
            const {
                view,
                ui: checkboxUi = [],
            } = theme.checkbox || {};
            return {
                checkbox: {
                    checked: false,
                    ui: [
                        createStyle(checkboxUi[0] || {}, theme.colors),
                        createStyle(checkboxUi[1] || {}, theme.colors),
                    ],
                    range: contentRange,
                },
                component: view || 'checkbox',
            };
        },

        gridData() {
            const {
                data,
                gridConf,
                theme,
                options: {
                    header,
                    gradient,
                },
                contentColorMap,
                directionColorMap,
                checkedCellMap: cellMap,
                checkedCellAttrs: cellAttrs,
            } = this;
            return data.map((rows, rIdx) => {
                const gridRows = rows.map((content, cIdx) => {
                    const cell = {
                        col: cIdx,
                        row: rIdx,
                        component: 'base',
                        data: content,
                        gradientColor: '',
                        ui: {},
                    };
                    const options = {
                        row: rIdx,
                        col: cIdx,
                    };
                    // 附加网格单元样式
                    Object.assign(cell.ui, createGridStyle(gridConf, theme.colors, options));
                    // 颜色渐变设置
                    if (gradient) {
                        cell.gradientColor = directionColorMap[`${rIdx}-${cIdx}`] || contentColorMap[content] || '';
                    }
                    // 选中类型的表格设置
                    if (cellAttrs) {
                        if (
                            header.row.indexOf(rIdx) === -1
                            && header.col.indexOf(cIdx) === -1
                        ) {
                            Object.assign(cell, cloneDeep(cellAttrs));
                            cell.checkbox.checked = cellMap[`${rIdx}-${cIdx}`] || false;
                        }
                    }
                    return cell;
                });
                return gridRows;
            });
        },
    },

    methods: {
        getCellStyle(rIdx, cIdx, cell) {
            const {
                lineConf,
                gridConf,
                gridRow,
                gridCol,
                theme,
                contentColorMap,
            } = this;
            const lineStyle = createLineStyle(lineConf, gridConf, theme.colors, {
                row: rIdx,
                col: cIdx,
                rowLength: gridRow,
                colLength: gridCol,
            });
            const ui = cell.ui || {};
            const gradientColor = contentColorMap[cell.data];
            return {
                ...lineStyle,
                width: ui.width,
                backgroundColor: ui.backgroundColor || ui['background-color'] || gradientColor,
            };
        },
    },
};
</script>

<style>
.grid-core {
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
}

.grid-core__cell {
    padding: 0;
    margin: 0;
    border: none;
}

.grid-core__cell--checkbox {
    width: 200px;
}

.grid-core__cell--checkbox-header {
    width: 300px;
}
</style>
