import TableCateSelect from './components/CateSelect';
import TablePanel from './TablePanel';
import Table from './element';
import Thumbnail from './contextmenu/table';
import pkg from '../package';

const ElementType = 'table';

export const headerbarItems = [{
    name: '表格',
    icon: {
        name: 'add-table',
        width: 28,
        height: 24,
    },
    popup: TableCateSelect,
}];

export const panels = [{
    name: '表格',
    when() {
        return window.od.editorContext.hasTypeofElementFocused(ElementType)
            || window.od.editorContext.onlyTypeofElementSelected(ElementType);
    },
    component: TablePanel,
}];

export const elements = [{
    type: ElementType,
    def: Table,
}];

export const contextmenuItems = [{
    type: ElementType,
    component: Thumbnail,
}];

export const meta = pkg;
