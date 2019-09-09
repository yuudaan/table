<template>
    <div class="theme-colors-rules">
        <span class="theme-colors-rules__title">
            {{ confText }}
        </span>
        <ul class="theme-colors-rules__panel">
            <li
                v-for="(rule, index) in confRules"
                :key="index"
                :style="colorRuleStyle"
                class="theme-colors-rules__list"
                @click="selectColors(rule)"
            >
                <span
                    v-for="(color, cIndex) in rule.useful"
                    :key="cIndex"
                    v-bind="getColorBind(color, cIndex === rule.useful.length -1)"
                    class="theme-colors-rules__item"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import { isWhiteColor } from '@/element/main/utils/ui';

const COLOR_TEXTS = ['单色', '两色', '三色', '四色', '五色'];

export default {
    props: {
        rules: {
            type: Array,
            default: () => ([]),
        },

        indexs: {
            type: Array,
            default: () => ([]),
        },
    },

    computed: {
        length() {
            return this.indexs.length;
        },

        confText() {
            const { length } = this;
            const prefix = COLOR_TEXTS[length - 1] || `${length} `;
            return `${prefix}预设`;
        },

        confRules() {
            const { rules, indexs } = this;
            // eslint-disable-next-line
            return rules.map(colors => {
                return {
                    full: colors,
                    useful: indexs.map(index => colors[index]),
                };
            });
        },

        colorRuleStyle() {
            const width = this.length > 3 ? '88px' : '56px';
            return { width };
        },
    },

    methods: {
        selectColors(rule) {
            this.$emit('select-colors', cloneDeep(rule.full));
        },

        getColorBind(color, isTail) {
            return {
                style: {
                    backgroundColor: color,
                },
                class: {
                    // 判断颜色列表的最后一种颜色是否是白色，白色需要加个区分边框
                    'is-white': isTail && isWhiteColor(color),
                },
            };
        },
    },
};
</script>

<style lang="postcss">
.theme-colors-rules {
    width: 228px;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 2px 1px 14px rgba(53, 100, 175, .15);

    &__title {
        display: block;
        margin-bottom: 13px;
        color: var(--text-sec);
        font-size: 12px;
        font-weight: 500;
        font-weight: 500;
    }

    &__panel {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        margin-bottom: 8px;
        cursor: pointer;
        border-radius: 2px;
        overflow: hidden;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__item {
        flex: 1;
        height: 100%;

        &.is-white {
            border: 1px solid #f3f3f3;
        }
    }
}
</style>
