<template>
    <div
        class="grid-container"
        :style="containerStyle"
    >
        <slot />
    </div>
</template>

<script>
import { createStyle } from '../../utils/ui';

export default {
    name: 'GridContainer',

    props: {
        theme: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        containerStyle() {
            const { container, colors } = this.theme;
            return createStyle(container, colors);
        },
    },
};
</script>

<style>
.grid-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    font-size: 22px;
    font-weight: 400;
    background: none;
}
</style>
