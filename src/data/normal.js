import COLORS from './colors';

const DEF_COLORS = COLORS[0];

export default [
    {
        theme: {
            name: 'normal-table-0',
            colors: [...DEF_COLORS],
            container: {
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                color: 0,
                border: {
                    bottom: {
                        color: 2,
                        width: 1,
                        style: 'solid',
                    },
                },
            },
            grids: [],
            lines: [
                {
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            bottom: {
                                color: 2,
                                width: 1,
                                style: 'solid',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-1',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                background: {
                    color: '#fff',
                },
                border: {
                    color: 2,
                    width: 1,
                    style: 'solid',
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        font: {
                            weight: 'bold',
                        },
                        color: 0,
                        background: {
                            color: 3,
                        },
                    },
                },
            ],
            lines: [
                {
                    type: 'repeat',
                    match: {
                        col: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            right: {
                                color: 2,
                                width: 1,
                                style: 'solid',
                            },
                        },
                    },
                },
                {
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            bottom: {
                                color: 2,
                                width: 1,
                                style: 'solid',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-2',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                background: {
                    color: '#fff',
                },
            },
            grids: [
                {
                    type: 'common',
                    ui: {
                        justifyContent: 'start',
                        padding: [0, 16],
                    },
                },
                {
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 2,
                            remainder: 1,
                        },
                    },
                    ui: {
                        color: '#fff',
                        background: {
                            color: 2,
                        },
                    },
                },
            ],
            lines: [
                {
                    type: 'repeat',
                    match: {
                        col: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            right: {
                                color: 1,
                                width: 1,
                                style: 'solid',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-3',
            colors: [...DEF_COLORS],
            font: {
                family: 'SourceHanSansSC-Regular',
                size: 22,
            },
            container: {
                color: 0,
                border: {
                    bottom: {
                        color: 1,
                        width: 1,
                        style: 'dashed',
                    },
                },
            },
            grids: [
                {
                    type: 'common',
                    ui: {
                        justifyContent: 'start',
                        padding: [0, 32, 0, 0],
                    },
                },
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        color: 0,
                        width: '6em',
                        padding: [0],
                        font: {
                            weight: '500',
                        },
                    },
                },
            ],
            lines: [
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        border: {
                            bottom: {
                                color: 1,
                                width: 1,
                                style: 'dashed',
                            },
                        },
                    },
                },
                {
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            bottom: {
                                color: 1,
                                width: 1,
                                style: 'dashed',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-4',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                background: {
                    color: '#fff',
                },
                border: {
                    color: 1,
                    width: 1,
                    style: 'solid',
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        color: 0,
                        background: {
                            color: 2,
                        },
                        font: {
                            family: 'SourceHanSansSC-Medium',
                            weight: 500,
                        },
                    },
                },
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        font: {
                            family: 'SourceHanSansSC-Medium',
                        },
                    },
                },
            ],
            lines: [
                {
                    type: 'repeat',
                    match: {
                        single: true,
                        col: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            right: {
                                color: 1,
                                width: 1,
                                style: 'solid',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-5',
            colors: [...DEF_COLORS],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                border: {
                    bottom: {
                        color: 2,
                        width: 1,
                        style: 'solid',
                    },
                },
            },
            grids: [
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        color: 5,
                        background: {
                            color: 2,
                        },
                        font: {
                            family: 'SourceHanSansSC-Medium',
                            weight: 500,
                        },
                    },
                },
                {
                    type: 'single',
                    match: {
                        col: 0,
                    },
                    ui: {
                        font: {
                            family: 'SourceHanSansSC-Medium',
                        },
                    },
                },
            ],
            lines: [],
        },
        options: {
            convertible: true,
        },
    },
    {
        theme: {
            name: 'normal-table-6',
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
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        background: {
                            color: 4,
                        },
                    },
                },
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        color: 5,
                        background: {
                            color: 0,
                        },
                    },
                },
            ],
            lines: [
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        border: {
                            bottom: {
                                style: 'solid',
                                width: 10,
                                color: '#fff',
                            },
                        },
                    },
                },
                {
                    type: 'repeat',
                    match: {
                        row: {
                            coefficient: 1,
                            remainder: 0,
                        },
                    },
                    ui: {
                        border: {
                            bottom: {
                                style: 'solid',
                                width: 10,
                                color: '#fff',
                            },
                        },
                    },
                },
            ],
        },
        options: {
            convertible: true,
        },
    },
];
