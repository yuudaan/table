import COLORS from './colors';

const DEF_COLORS = COLORS[0];

export default [
    {
        theme: {
            name: 'table-checkbox-0',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        font: {
                            weight: 'bold',
                        },
                    },
                },
            ],
            lines: [],
            checkbox: {
                view: 'checkbox',
                // 选中与非选中的样式信息
                ui: [
                    {
                        border: {
                            color: 0,
                        },
                    },
                ],
            },
        },
        options: {
            convertible: false,

            // 行列标题
            header: {
                row: [],
                col: [0],
            },

            // 可选元素表格配置
            checkbox: {
            // 选中的元素
                checked: [
                    {
                        row: 0,
                        col: 1,
                    },
                    {
                        row: 1,
                        col: 2,
                    },
                    {
                        row: 2,
                        col: 3,
                    },
                    {
                        row: 3,
                        col: 4,
                    },
                ],
            },
        },
    },
    {
        theme: {
            name: 'table-checkbox-1',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        color: 0,
                        font: {
                            weight: 'bold',
                        },
                    },
                },
            ],
            lines: [],
            checkbox: {
                view: 'fill-checkbox',
                // 选中与非选中的样式信息
                ui: [
                    {
                        color: 5,
                        background: {
                            color: 1,
                        },
                    },
                    {
                        background: {
                            color: 3,
                        },
                    },
                ],
            },
        },
        options: {
            convertible: false,

            // 行列标题
            header: {
                row: [],
                col: [0],
            },

            gradient: null,

            // 可选元素表格配置
            checkbox: {
            // 选中的元素
                checked: [
                    {
                        row: 0,
                        col: 1,
                    },
                    {
                        row: 1,
                        col: 2,
                    },
                    {
                        row: 2,
                        col: 3,
                    },
                    {
                        row: 3,
                        col: 4,
                    },
                ],
            },
        },
    },
    {
        theme: {
            name: 'table-checkbox-2',
            colors: [...DEF_COLORS],
            container: {
                color: 1,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                    weight: 500,
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        font: {
                            weight: 'bold',
                        },
                    },
                },
            ],
            lines: [],
            gradientColors: [
                4,
                0,
            ],
            checkbox: {
                view: 'gradient-checkbox',
                // 选中与非选中的样式信息
                ui: [
                    {
                        border: {
                            color: 0,
                        },
                    },
                ],
            },
        },
        options: {
            convertible: false,

            // 行列标题
            header: {
                row: [],
                col: [0],
            },

            gradient: {
                direction: 'row',
            },

            // 可选元素表格配置
            checkbox: {
                checked: [
                    {
                        row: 0,
                        col: 1,
                    },
                    {
                        row: 1,
                        col: 2,
                    },
                    {
                        row: 2,
                        col: 3,
                    },
                    {
                        row: 3,
                        col: 4,
                    },
                ],
            },
        },
    },
];
