<template>
    <div
        class="grid-checkbox"
        :style="cellUi"
    >
        <span
            class="grid-checkbox__content"
            :style="checkboxUi"
        >
            {{ cellText }}
        </span>
    </div>
</template>

<script>
import base from './mixins/base';

export default {
    name: 'GridCheckbox',

    mixins: [base],

    props: {
        checkbox: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        checkboxUi() {
            const {
                checked,
                ui: [checkedUi, uncheckedUi],
            } = this.checkbox || {};
            if (!checked) {
                return {
                    ...this.ui,
                    ...uncheckedUi,
                };
            }
            return {
                ...this.ui,
                ...checkedUi,
            };
        },
    },
};
</script>

<style>
.grid-checkbox {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-checkbox__content {
    position: relative;
    border-color: transparent;
}

.grid-checkbox__content::after {
    content: " ";
    position: absolute;
    width: 100%;
    top: 130%;
    left: 0;
    border-bottom: 2px solid transparent;
    border-color: inherit;
}
</style>
