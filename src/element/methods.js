/* eslint-disable */
export default {
    /**
     * 进入表格编辑状态
     * @param {element} element - 文字元素
     */
    showTableEditor(element) {
        const currentEditTable = this.getElement(element);
        currentEditTable.dragable = false;
        this.currentEditTable = currentEditTable;
    },

    /**
     * 退出表格编辑状态
     */
    hideTableEditor() {
        if (this.currentEditTable) {
            this.currentEditTable.dragable = true;
            this.currentEditTable = null;
        }
    },
};
