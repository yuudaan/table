<template>
    <div
        class="gradient-checkbox"
        :style="ui"
    >
        <div
            class="gradient-checkbox__content"
            :style="contentStyle"
            :class="checkedClass"
        >
            <span class="gradient-checkbox__hide">{{ cellText }}</span>
            <span class="gradient-checkbox__text">{{ cellText }}</span>
            <span
                v-if="checkbox.checked"
                class="gradient-checkbox__sliding"
                :style="checkedStyle"
            />
        </div>
    </div>
</template>

<script>
import base from './mixins/base';

export default {
    name: 'GradientCheckbox',

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
        contentStyle() {
            if (this.gradientColor) {
                return { backgroundColor: this.gradientColor };
            }
            return {};
        },

        checkedStyle() {
            const {
                ui: checckedUi = [],
            } = this.checkbox;
            const [checked] = checckedUi;
            return checked;
        },

        checkedClass() {
            const {
                col,
                checkbox: {
                    range: {
                        start,
                        end,
                    },
                },
            } = this;
            return {
                'gradient-checkbox__content--start': start.col === col,
                'gradient-checkbox__content--end': end.col === col,
            };
        },
    },
};
</script>

<style lang="postcss">
.gradient-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: none;

    &__content {
        position: relative;
        width: 100%;
        height: 8px;
        text-align: center;

        &--start {
            border-radius: 4px 0 0 4px;
        }

        &--end {
            border-radius: 0 4px 4px 0;
        }
    }

    &__hide {
        opacity: 0;
    }

    &__text {
        display: block;
        position: absolute;
        top: 200%;
        left: 0;
        width: 100%;
        font-size: 18px;
    }

    &__sliding {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60%;
        height: 180%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        background: #fff;
        border-radius: 50px;
    }
}
</style>
