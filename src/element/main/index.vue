<template>
    <section class="editor-table">
        <GridContainer :theme="theme">
            <GridCore
                :data.sync="data"
                :theme="theme"
                :options="options"
            />
        </GridContainer>
    </section>
</template>

<script>
import GridContainer from './components/GridContainer/index';
import GridCore from './components/GridCore/index';

export default {
    components: {
        GridContainer,
        GridCore,
    },

    props: {
        // 配置信息
        options: {
            type: Object,
            default: () => ({}),
        },

        // 表格源数据
        data: {
            type: Array,
            default: () => ([]),
        },

        // 表格主题
        theme: {
            type: Object,
            default: () => ({}),
        },

        // 表格依赖的编辑选项
        element: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style>
.editor-table {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
