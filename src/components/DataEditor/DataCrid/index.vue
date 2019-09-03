<template>
    <div
        class="data-grid"
        :class="{ 'convertible': convertible }"
    >
        <div class="data-grid__wrap">
            <div class="data-grid__inner">
                <HotTable
                    ref="grid"
                    :data="gridData"
                    :settings="settings"
                    class="data-grid__body"
                    license-key="non-commercial-and-evaluation"
                />
            </div>
        </div>
        <div class="data-grid__footer">
            <div class="data-grid__ctrl">
                <div class="data-grid__input">
                    <span class="data-grid__input-label">行数</span>
                    <UiNumberInput
                        v-model="gridCount.rowNum"
                        min="1"
                    />
                </div>
                <div class="data-grid__input">
                    <span class="data-grid__input-label">列数</span>
                    <UiNumberInput
                        v-model="gridCount.colNum"
                        min="1"
                    />
                </div>
                <div class="data-grid__input-separator" />
                <UiButton
                    type="secondary"
                    label="清空数据"
                    class="clear-btn"
                    @click="clearGridData"
                />
            </div>
            <UiButton
                label="确认修改"
                class="confirm-btn"
                @click="saveGridData"
            />
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import throttle from 'lodash/throttle';
import { HotTable } from '@handsontable/vue';
import ContextMenu from './context-menu';
import cellRenderer from './cellRenderer';
import 'handsontable/dist/handsontable.full.css';

const SHOW_ROW = 9;
const SHOW_COL = 7;

function padding(count, size, source) {
    for (let i = 0; i < count; i += 1) {
        if (size === 1) {
            source.push(null);
        } else {
            source.push(new Array(size).fill(null));
        }
    }
}

export default {
    name: 'DataGrid',

    components: {
        HotTable,
    },

    props: {
        data: {
            type: Array,
            default: () => ([]),
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        this.gridInstance = null;
        const {
            handlerCellClick,
            gridCellsRender,
        } = this;
        return {
            gridData: [],
            gridCount: {
                rowNum: 0,
                colNum: 0,
            },
            gridChecked: [],
            settings: {
                comments: true,
                rowHeaders: true,
                colHeaders: true,
                manualColumnMove: true,
                manualRowMove: true,
                contextMenu: ContextMenu,
                width: '100%',
                height: 418,
                colWidths: 94,
                rowHeights: 40,
                rowHeaderWidth: 94,
                columnHeaderHeight: 40,
                // 单元格点击
                afterOnCellMouseDown: handlerCellClick,
                cells: gridCellsRender,
            },
        };
    },

    computed: {
        convertible() {
            return this.options && this.options.convertible;
        },

        gridRow() {
            return this.gridData.length;
        },

        gridCol() {
            if (!this.gridData[0]) {
                return 0;
            }
            return this.gridData[0].length;
        },
    },

    watch: {
        data: {
            immediate: true,
            handler() {
                this.initGridData();
            },
        },

        gridCount: {
            deep: true,
            handler: 'updateGridRowCol',
        },
    },

    mounted() {
        const { grid } = this.$refs;
        if (!grid) return;
        this.gridInstance = grid.hotInstance;
    },

    methods: {
        initGridData(data) {
            const gridData = cloneDeep(data || this.data);
            gridData.forEach((rows) => {
                if (rows.length > SHOW_COL) return;
                padding(SHOW_COL - rows.length, 1, rows);
            });
            const diffRow = SHOW_ROW - gridData.length;
            if (diffRow > 0) {
                padding(diffRow, SHOW_COL, gridData);
            }
            this.gridCount.rowNum = gridData.length;
            this.gridCount.colNum = gridData[0].length;
            this.gridData = gridData;
            if (this.options.checkbox) {
                this.gridChecked = this.options.checkbox.checked || [];
            }
        },

        /**
         * @description 通过行列输入框控制表格的行列数量
         */
        updateGridRowCol: throttle(function update({ rowNum, colNum }) {
            if (!Number(rowNum) || !Number(colNum)) {
                return;
            }
            const { gridRow, gridCol, gridData } = this;
            const diffRow = rowNum - gridRow;
            if (diffRow) {
                if (diffRow > 0) {
                    padding(diffRow, colNum, gridData);
                } else {
                    gridData.splice(gridRow + diffRow, gridRow);
                }
            }
            const diffCol = colNum - gridCol;
            if (diffCol) {
                gridData.forEach((rows) => {
                    if (diffCol > 0) {
                        padding(diffCol, 1, rows);
                    } else {
                        rows.splice(gridCol + diffCol, gridCol);
                    }
                });
            }
        }, 800),

        saveGridData() {
            this.$emit('save-grid', {
                data: this.getValidTableData(),
                checked: this.gridChecked || [],
            });
        },

        /**
         * 清空表格数据
         */
        clearGridData() {
            this.gridInstance.clear();
        },

        /**
         * 单元格点击处理
         */
        handlerCellClick({ target }) {
            const { convertible } = this;
            // 单选类型选中单元格
            if (target.classList.contains('cell-radio-input')) {
                const { row, col } = target.dataset;
                this.updateGridChecked({
                    row: Number(row),
                    col: Number(col),
                });
                return;
            }
            // 行列转换
            if (convertible && target.classList.contains('cornerHeader')) {
                this.convertGridData();
            }
        },

        /**
         * 表格数据行列转换
         */
        convertGridData() {
            const gridData = this.getValidTableData();
            const convertData = [];
            const rowLength = gridData.length;
            const colLength = gridData[0].length;
            if (!rowLength || !colLength) return;
            for (let i = 0; i < colLength; i += 1) {
                const rows = [];
                for (let j = 0; j < rowLength; j += 1) {
                    rows.push(gridData[j][i]);
                }
                convertData.push(rows);
            }
            this.initGridData(convertData);
        },

        /**
         * 更新单元格选中项
         */
        updateGridChecked({ row, col }) {
            const { gridChecked } = this;
            const checked = [];
            gridChecked.forEach((it) => {
                if (it.row !== row) {
                    checked.push(it);
                }
            });
            checked.push({ row, col });
            this.gridChecked = checked;
        },

        /**
         * @description 获取非空表格数据
         */
        getValidTableData() {
            const { gridInstance } = this;
            const rowCount = gridInstance.countRows();
            const colCount = gridInstance.countCols();
            const rows = [];
            const cols = [];

            for (let i = 0; i < rowCount; i += 1) {
                if (!gridInstance.isEmptyRow(i)) {
                    rows.push(i);
                }
            }

            for (let j = 0; j < colCount; j += 1) {
                if (!gridInstance.isEmptyCol(j)) {
                    cols.push(j);
                }
            }

            const minRow = rows[0] || 0;
            const maxRow = rows.length >= 1 ? rows[rows.length - 1] : minRow;
            const minCol = cols[0] || 0;
            const maxCol = cols.length >= 1 ? cols[cols.length - 1] : minCol;

            const data = gridInstance.getData(minRow, minCol, maxRow, maxCol);
            return data;
        },

        /**
         * 单选表格渲染
         */
        gridCellsRender() {
            const { checkbox } = this.options;
            if (!checkbox) {
                return {};
            }
            return {
                renderer: cellRenderer.bind(this),
            };
        },
    },
};
</script>

<style lang="postcss">
.data-grid {
    width: 100%;
    height: 100%;
    color: var(--text-sec);

    &__wrap {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 418px;
        border: 1px solid var(--stroke);
        border-radius: 4px;
    }

    &__inner {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 100%;
        height: 418px;
    }

    &__body {
        position: relative;
        width: 100%;
        height: 418px;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        margin-top: 24px;
    }

    &__ctrl,
    &__input {
        display: flex;
        align-items: center;
    }

    &__input:first-child {
        margin-right: 24px;
    }

    &__input-label {
        margin-right: 8px;
        font-size: 4px;
        font-size: 14px;
        font-weight: 500;
    }

    &__input-separator {
        width: 2px;
        height: 20px;
        background: var(--bg-reg);
        margin: 0 16px;
    }

    &.convertible {
        .cornerHeader {
            font-weight: 500;
            cursor: pointer;
        }

        .cornerHeader::before {
            content: "转换";
            position: absolute;
            top: 50%;
            left: 65%;
            color: var(--text-sec);
            font-size: 14px;
            font-weight: 500;
            transform: translate(-50%, -50%);
        }

        .cornerHeader::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 35%;
            width: 12px;
            height: 12px;
            background-image: url("~@/assets/icon/switch.svg");
            background-size: cover;
            transform: translate(-50%, -50%);
        }
    }

    .cell-radio {
        input {
            margin-right: 4px;
        }

        span {
            vertical-align: middle;
        }
    }

    .clear-btn {
        color: var(--error);
        font-size: 14px;
        font-weight: 500;
        background-color: rgba(222, 65, 92, .1);
    }


    .confirm-btn {
        font-size: 14px;
        font-weight: 500;
    }

    /* 覆盖表格默认样式 */
    .handsontable th {
        background-color: #f8fafc;
    }

    .handsontable .relative {
        font-weight: 500;
    }

    .handsontable tr:first-child th,
    .handsontable tr:first-child td {
        border-color: var(--stroke);
    }

    .handsontable tbody th.ht__highlight,
    .handsontable thead th.ht__highlight {
        background-color: #f8fafc;
    }

    /* 表格的四个圆角 */
    .handsontable .htCore thead tr:first-child th:last-child {
        border-radius: 0 4px 0 0;
    }
    .handsontable .htCore thead tr:first-child th:first-child {
        border-radius: 4px 0 0 0;
    }
    .handsontable .htCore tbody tr:last-child td:last-child {
        border-radius: 0 0 4px 0;
    }
    .handsontable .htCore tbody tr:last-child th:first-child {
        border-radius: 0 0 0 4px;
    }

    .handsontable th,
    .handsontable td {
        color: var(--text-sec);
        line-height: 36px;
        text-align: center;
        border-color: var(--stroke);
    }
}

/* 表格右键菜单样式 */
.htContextMenu table.htCore {
    border-color: var(--stroke);
}

.htContextMenu table tbody tr td {
    padding: 7px 6px;
    font-size: 12px;
}
</style>
