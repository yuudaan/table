<template>
    <section
        v-click-outside2="{
            handler: hidenPopActive,
            isActive: popActive,
        }"
        class="theme-color-picker"
        @click="updatePopActive"
    >
        <div class="theme-color-picker__header">
            <div class="theme-color-picker__main">
                <span class="theme-color-picker__title">
                    表格配色
                </span>
                <span
                    ref="wheel"
                    class="theme-color-picker__wheel"
                    @click="onWheelClick($event)"
                >
                    <Icon
                        class="theme-color-picker__palette"
                        name="palette"
                    />
                </span>
            </div>
            <div
                ref="colors"
                class="theme-color-picker__colors"
            >
                <span
                    v-for="color in usefulThemeColors"
                    :key="color.index"
                    v-bind="getColorBind(color)"
                    class="theme-color-picker__color"
                    @click="onColorClick(color)"
                />
            </div>
        </div>
        <div
            v-show="popActive"
            ref="panel"
            class="theme-color-picker__body"
            @click.stop
        >
            <ColorPicker
                v-if="currPanel === 'picker'"
                v-model="currColor"
                @change="updateThemeItemColor"
            />
            <ColorRules
                v-if="currPanel === 'rules'"
                :rules="themeRules"
                :indexs="gridColorIndexs"
                @select-colors="selectColors"
            />
        </div>
    </section>
</template>

<script>
import { ColorPicker } from '@gaoding/editor-ui';
import throttle from 'lodash/throttle';
import uniq from 'lodash/uniq';
import ColorRules from './Rules';
import themeRules from '../../../data/colors';
import { isWhiteColor } from '@/element/main/utils/ui';
import { flattenPickValue } from '@/element/utils';

export default {
    components: {
        ColorPicker,
        ColorRules,
    },

    props: {
        editor: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            themeRules,
            colorIndex: 0,
            currColor: '',
            currPanel: 'color',
            popActive: false,
            action: '',
        };
    },

    computed: {
        currentElement() {
            const { currentSubElement, currentElement } = this.editor || {};
            return currentSubElement || currentElement || null;
        },

        currentGridTheme() {
            const { currentElement } = this;
            if (currentElement) {
                return currentElement.gridTheme;
            }
            return null;
        },

        // 获取主题中包含的所有颜色索引值，剔除重复索引值
        gridColorIndexs() {
            const { currentGridTheme } = this;
            if (currentGridTheme) {
                // 下面的几个属性中包含有表格的颜色配置
                const {
                    container = {},
                    grids = [],
                    lines = [],
                    checkbox,
                    gradientColors = [],
                } = currentGridTheme;
                let uiList = [
                    container,
                    grids.map(it => it.ui),
                    lines.map(it => it.ui),
                ];
                if (checkbox && checkbox.ui) {
                    uiList = uiList.concat(checkbox.ui);
                }
                let indexList = [];
                uiList.forEach((ui) => {
                    // eslint-disable-next-line
                    const indexs = flattenPickValue(ui, ({ key, value }) => {
                        return /C|color$/.test(key) && value < 6;
                    });
                    indexList.push(...indexs);
                });
                indexList = indexList.concat(gradientColors);
                return uniq(indexList).sort((a, b) => a - b);
            }
            return [];
        },

        // 完整的主题颜色列表
        fullThemeColors: {
            get() {
                const { currentElement } = this;
                if (!currentElement) {
                    return [];
                }
                return currentElement.gridTheme.colors || [];
            },

            set(colors) {
                this.currentElement.gridTheme.colors = colors;
            },
        },

        // 实际有使用的到的主题颜色
        usefulThemeColors() {
            const {
                gridColorIndexs,
                fullThemeColors: colors,
            } = this;
            return gridColorIndexs.map(index => ({ index, value: colors[index] }));
        },
    },

    watch: {
        popActive(v) {
            if (!v) {
                this.action = '';
            }
        },

        action(v) {
            if (v === 'select-color') {
                this.editor.makeSnapshot('change_grid_color');
            }
        },
    },

    methods: {
        getColorBind({ value }) {
            return {
                style: {
                    backgroundColor: value,
                },
                class: {
                    // 判断颜色列表的最后一种颜色是否是白色，白色需要加个区分边框
                    'is-white': isWhiteColor(value),
                },
            };
        },

        onColorClick(color) {
            this.popActive = true;
            this.colorIndex = color.index;
            this.currColor = color.value;
            this.currPanel = 'picker';
            this.action = 'select-color';
        },

        onWheelClick(event) {
            const { popActive, currPanel } = this;
            if (popActive && currPanel !== 'rules') {
                event.stopPropagation();
            }
            this.currPanel = 'rules';
        },

        selectColors(colors) {
            this.fullThemeColors = colors;
            this.editor.makeSnapshot('change_grid_colors');
        },

        hidenPopActive() {
            this.popActive = false;
        },

        updatePopActive({ target }) {
            const { wheel, colors, panel } = this.$refs;
            // eslint-disable-next-line
            this.popActive = [wheel, colors, panel].some((el) => {
                return el && (el === target || el.contains(target));
            });
        },

        /**
         * 拖动颜色面板更新比较频繁，这里加个节流
         */
        updateThemeItemColor: throttle(function updateColor(color) {
            this.action = 'change-selected-color';
            this.$set(this.fullThemeColors, this.colorIndex, color.hex);
        }, 200),
    },
};
</script>

<style lang="postcss">
.theme-color-picker {
    position: relative;
    height: 90px;

    &__header {
        width: 100%;
        height: 100%;
        padding: 14px;
    }

    &__main {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    &__title {
        height: 16px;
        color: var(--text-prim);
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
    }

    &__wheel {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 16px;
        height: 16px;
        background: #fff;
        cursor: pointer;
    }

    &__palette {
        display: block;
        width: 100%;
        height: 100%;
        color: var(--text-sec);
        vertical-align: middle;
    }

    &__colors {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
    }

    &__color {
        flex: 1;
        height: 100%;
        transition: transform .2s;
        border-radius:2px;
        margin-right: 8px;
        cursor: pointer;

        &.is-white {
            border: 1px solid var(--stroke);
        }

        &:hover {
            transform: scale(1.03, 1.1);
        }

        &:last-child {
            margin-right: 0px;
        }
    }

    &__body {
        position: absolute;
        top: 80px;
        left: 50%;
        background: #fff;
        transform: translate(-50%, 0);
    }

    .gd-color-picker {
        position: relative;
    }
}
</style>
