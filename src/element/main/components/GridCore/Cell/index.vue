<template>
    <Component
        :is="cellComponent"
        v-bind="$attrs"
    />
</template>

<script>
import BaseCell from './components/Base';
import BaseCheckbox from './components/Checkbox';
import FillCheckBox from './components/FillCheckBox';
import GradientCheckbox from './components/GradientCheckbox';

const components = {
    base: BaseCell,
    checkbox: BaseCheckbox,
    'fill-checkbox': FillCheckBox,
    'gradient-checkbox': GradientCheckbox,
};

export default {
    inheritAttrs: false,

    props: {
        component: {
            type: String,
            default: 'base',
        },
    },

    computed: {
        cellComponent() {
            return components[this.component] || components.base;
        },
    },
};
</script>
