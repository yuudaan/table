/**
 * handsontable 插件的菜单中文
 */

const ContextMenu = {
    items: {
        row_above: {
            name: '在上面添加行',
        },
        row_below: {
            name: '在下面添加行',
        },
        col_left: {
            name: '在前面添加列',
        },
        col_right: {
            name: '在后面添加列',
        },
        cut: {
            name: '剪切 ( Ctrl/⌘+X 用于 Excel )',
        },
        copy: {
            name: '复制 ( Ctrl/⌘+C 用于 Excel )',
        },
        paste: {
            name: '粘贴 ( Ctrl/⌘+V 用于 Excel )',
            disabled() {
                window.clipboardCache = window.clipboardCache || '';
                return window.clipboardCache.length === 0;
            },
            callback() {
                const plugin = this.getPlugin('copyPaste');
                this.listen();
                plugin.paste(window.clipboardCache);
            },
        },
        hsep2: '---------',
        remove_row: {
            name: '删除行',
        },
        remove_col: {
            name: '删除列',
        },
    },

    callback() {
    },
};

export default ContextMenu;
