<template>
    <div>
        <div class="layer-thumbnail">
            <div class="thumbnail-table">
                <Icon
                    class="thumbnail-table__icon"
                    :name="iconName"
                />
            </div>
        </div>
        <span class="layer-info">表格元素</span>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line
    props: ['element'],

    computed: {
        iconName() {
            const { gridTheme } = this.element;
            return gridTheme.name || 'table-cate-normal';
        },
    },
};
</script>

<style>
.thumbnail-table {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
}

.thumbnail-table .icon-font {
    width: 20px;
    height: 20px;
}
</style>
