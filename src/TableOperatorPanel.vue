<template>
    <div class="table-operator-panel">
        <ThemeSelect :editor="editor" />
        <div class="table-operator-panel__edit">
            <title class="table-operator-panel__edit-title">
                表格选项
            </title>
            <PanelButton
                label="编辑表格数据"
                class="table-operator-panel__edit-btn"
                @click="editTableData"
            />
        </div>
        <DataEditor
            :visible.sync="showTableDataDialog"
            :editor="editor"
        />
    </div>
</template>

<script>
import ThemeSelect from './components/ThemeSelect';

const DataEditor = () => import('./components/DataEditor');

export default {
    name: 'TableOperatorPanel',

    components: {
        ThemeSelect,
        DataEditor,
    },

    props: {
        editor: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            showTableDataDialog: false,
        };
    },

    created() {
        this.editor.$on('editor.table.dblclick', this.editTableData);
    },

    methods: {
        editTableData() {
            this.showTableDataDialog = true;
        },
    },
};
</script>

<style>
.table-operator-panel__colors {
    padding-bottom: 12px;
    margin: 12px 0 24px 0;
    border-bottom: 1px solid var(--stroke);
}

.table-operator-panel__edit {
    margin-top: 24px;
}

.table-operator-panel__edit-title {
    display: block;
    height: 20px;
    color: var(--text-ter);
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 12px;
}
.table-operator-panel__edit-btn {
    width: 228px;
}
</style>
