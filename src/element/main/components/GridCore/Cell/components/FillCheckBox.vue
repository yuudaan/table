<template>
    <div
        class="fill-checkbox"
        :style="ui"
    >
        <span
            class="fill-checkbox__content"
            v-bind="checkboxAttrs"
        >
            {{ cellText }}
        </span>
    </div>
</template>

<script>
import base from './mixins/base';

export default {
    name: 'FillCheckbox',

    mixins: [base],

    props: {
        row: {
            type: Number,
            default: 0,
        },

        col: {
            type: Number,
            default: 0,
        },

        checkbox: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        checkboxAttrs() {
            const {
                col,
                checkbox: {
                    checked,
                    ui: [checkedUi, uncheckedUi],
                    range: {
                        start,
                        end,
                    },
                },
            } = this;
            const attrs = {
                class: {
                    'fill-checkbox__content--start': start.col === col,
                    'fill-checkbox__content--end': end.col === col,
                },
            };
            if (!checked) {
                attrs.style = {
                    ...this.ui,
                    ...uncheckedUi,
                };
            } else {
                attrs.style = {
                    ...this.ui,
                    ...checkedUi,
                };
            }
            return attrs;
        },
    },
};
</script>

<style lang="postcss">
.fill-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: none;

    &__content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 32px;
        border: none;

        &--start {
            border-radius: 16px 0 0 16px;
        }

        &--end {
            border-radius: 0 16px 16px 0;
        }
    }
}
</style>
