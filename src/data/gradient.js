import COLORS from './colors';

export default [
    {
        theme: {
            name: 'table-gradient-0',
            colors: [...COLORS[0]],
            container: {
                color: 0,
                font: {
                    family: 'SourceHanSansSC-Light',
                    size: 22,
                },
                background: {
                    color: 5,
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
                        col: 0,
                    },
                    ui: {
                        font: {
                            family: 'SourceHanSansSC-Medium',
                            weight: 500,
                        },
                    },
                },
                {
                    type: 'single',
                    match: {
                        row: 0,
                    },
                    ui: {
                        font: {
                            family: 'SourceHanSansSC-Medium',
                            weight: 500,
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
                {
                    type: 'repeat',
                    match: {
                        single: true,
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
                                style: 'solid',
                            },
                        },
                    },
                },
            ],
            /**
             * 渐变颜色索引，提供一个 [startColor, endColor] 通过渐变算法自动计算
             * 3 4 为主题颜色索引
             */
            gradientColors: [
                4,
                1,
            ],
        },
        options: {
            convertible: true,

            header: {
                row: [0],
                col: [0],
            },

            gradient: {
                content: true,
            },
        },
    },
    // {
    //     theme: {
    //         name: 'table-gradient-1',
    //         colors: COLORS[0],
    //         container: {
    //             color: 0,
    //             background: {
    //                 color: 4,
    //             },
    //             border: {
    //                 color: 1,
    //                 width: 1,
    //                 style: 'solid',
    //             },
    //         },
    //         grids: [
    //             {
    //                 type: 'single',
    //                 match: {
    //                     row: 0,
    //                 },
    //                 ui: {
    //                     font: {
    //                         weight: 'bold',
    //                     },
    //                 },
    //             },
    //         ],
    //         lines: [
    //             {
    //                 type: 'repeat',
    //                 match: {
    //                     single: true,
    //                     row: {
    //                         coefficient: 1,
    //                         remainder: 0,
    //                     },
    //                 },
    //                 ui: {
    //                     border: {
    //                         right: {
    //                             color: 1,
    //                             width: 1,
    //                             style: 'solid',
    //                         },
    //                     },
    //                 },
    //             },
    //             {
    //                 type: 'repeat',
    //                 match: {
    //                     single: true,
    //                     col: {
    //                         coefficient: 1,
    //                         remainder: 0,
    //                     },
    //                 },
    //                 ui: {
    //                     border: {
    //                         bottom: {
    //                             color: 1,
    //                             width: 1,
    //                             style: 'solid',
    //                         },
    //                     },
    //                 },
    //             },
    //         ],
    //         /**
    //          * 渐变颜色索引，提供一个 [startColor, endColor] 通过渐变算法自动计算
    //          * 3 4 为主题颜色索引
    //          */
    //         gradientColors: [
    //             3,
    //             2,
    //         ],
    //     },
    //     options: {
    //         convertible: true,

    //         header: {
    //             row: [0],
    //             col: [],
    //         },

    //         gradient: {
    //             direction: 'row',
    //         },
    //     },
    // },
    // {
    //     theme: {
    //         name: 'table-gradient-2',
    //         colors: COLORS[0],
    //         container: {
    //             color: 0,
    //             background: {
    //                 color: 4,
    //             },
    //             border: {
    //                 color: 1,
    //                 width: 1,
    //                 style: 'solid',
    //             },
    //         },
    //         grids: [
    //             {
    //                 type: 'single',
    //                 match: {
    //                     row: 0,
    //                 },
    //                 ui: {
    //                     font: {
    //                         weight: 'bold',
    //                     },
    //                 },
    //             },
    //         ],
    //         lines: [
    //             {
    //                 type: 'repeat',
    //                 match: {
    //                     single: true,
    //                     row: {
    //                         coefficient: 1,
    //                         remainder: 0,
    //                     },
    //                 },
    //                 ui: {
    //                     border: {
    //                         right: {
    //                             color: 1,
    //                             width: 1,
    //                             style: 'solid',
    //                         },
    //                     },
    //                 },
    //             },
    //             {
    //                 type: 'repeat',
    //                 match: {
    //                     single: true,
    //                     col: {
    //                         coefficient: 1,
    //                         remainder: 0,
    //                     },
    //                 },
    //                 ui: {
    //                     border: {
    //                         bottom: {
    //                             color: 1,
    //                             width: 1,
    //                             style: 'solid',
    //                         },
    //                     },
    //                 },
    //             },
    //         ],
    //         /**
    //          * 渐变颜色索引，提供一个 [startColor, endColor] 通过渐变算法自动计算
    //          * 3 4 为主题颜色索引
    //          */
    //         gradientColors: [
    //             3,
    //             2,
    //         ],
    //     },
    //     options: {
    //         convertible: true,

    //         header: {
    //             row: [0],
    //             col: [],
    //         },

    //         gradient: {
    //             direction: 'col',
    //         },
    //     },
    // },
];
