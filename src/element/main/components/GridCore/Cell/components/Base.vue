<template>
    <div
        :style="cellUi"
        class="grid-base-cell"
    >
        {{ cellText }}
    </div>
</template>

<script>
import base from './mixins/base';

export default {
    name: 'GridBaseCell',

    mixins: [base],
};
</script>

<style>
.grid-base-cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    background-clip: content-box;
    border: none;
}
</style>
