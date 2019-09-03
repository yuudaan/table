<template>
    <UiDialog
        title="编辑数据"
        width="816px"
        height="576px"
        class="table-data-dialog"
        :visible="sycnVisible"
        @close="resetDataGrid(false)"
    >
        <template v-slot:header>
            <h1 class="ui-dialog__title header-info">
                <span>编辑数据</span>
                <Icon
                    name="tip-caution"
                    class="header-info__tip"
                />
            </h1>
            <button
                class="ui-dialog__close"
                @click="sycnVisible = false"
            >
                <Icon name="close-popup" />
            </button>
        </template>
        <DataGrid
            ref="dataGrid"
            :data="gridData"
            :options="gridOptions"
            @save-grid="saveGridData"
        />
    </UiDialog>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import DataGrid from './DataCrid';

export default {
    name: 'DataEditor',

    components: {
        DataGrid,
    },

    props: {
        visible: {
            type: Boolean,
            default: false,
        },

        editor: {
            type: Object,
            required: true,
        },
    },

    computed: {
        sycnVisible: {
            get() {
                return this.visible;
            },

            set(v) {
                this.$emit('update:visible', v);
            },
        },

        currentElement() {
            const { currentSubElement, currentElement } = this.editor || {};
            return currentSubElement || currentElement || null;
        },

        gridData() {
            const { currentElement } = this;
            if (!currentElement) {
                return [];
            }
            return currentElement.gridData || [];
        },

        gridOptions() {
            const { currentElement } = this;
            if (!currentElement) {
                return {};
            }
            return currentElement.gridOptions || {};
        },
    },

    watch: {
        sycnVisible(v) {
            if (v) {
                this.resetDataGrid(true);
            }
        },
    },

    methods: {
        saveGridData({ data, checked }) {
            const { currentElement } = this.editor;
            currentElement.gridData = cloneDeep(data);
            if (currentElement.gridOptions.checkbox) {
                currentElement.gridOptions.checkbox.checked = cloneDeep(checked);
            }
            this.sycnVisible = false;
            this.editor.makeSnapshot('change_grid_data');
        },

        resetDataGrid(visible) {
            const { dataGrid } = this.$refs;
            if (dataGrid) {
                dataGrid.initGridData();
            }
            this.sycnVisible = visible;
        },
    },
};
</script>

<style lang="postcss">
.table-data-dialog {
    .ui-dialog__content {
        position: relative;
        border: none;
    }

    .ui-dialog__header {
        border: none;
    }

    .header-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28px;

         &__tip {
            width: 16px;
            height: 16px;
            color: var(--text-dis);
            margin-left: 16px;
        }
    }
}
</style>
