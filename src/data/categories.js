import table from './index';
import { DEFAULT_GRID_DATA } from './conf';

const DEFAULT_ELEMENT = {
    type: 'table',
    height: 360,
    width: 720,
    fontFamily: 'DIN-Medium',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 22,
};

export default [
    {
        title: '常规型',
        icon: 'normal',
        element: {
            ...DEFAULT_ELEMENT,
            gridCategory: 'normal',
            gridData: DEFAULT_GRID_DATA.normal,
            gridTheme: table.normal[0].theme,
            gridOptions: table.normal[0].options || {},
        },
    },
    {
        title: '选中型',
        icon: 'checkbox',
        element: {
            ...DEFAULT_ELEMENT,
            gridCategory: 'checkbox',
            gridData: DEFAULT_GRID_DATA.checkbox,
            gridTheme: table.checkbox[0].theme,
            gridOptions: table.checkbox[0].options || {},
        },
    },
    {
        title: '渐变型',
        icon: 'gradient',
        element: {
            ...DEFAULT_ELEMENT,
            gridCategory: 'gradient',
            gridData: DEFAULT_GRID_DATA.gradient,
            gridTheme: table.gradient[0].theme,
            gridOptions: table.gradient[0].options || {},
        },
    },
];
