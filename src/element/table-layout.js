import inherit from 'vue-poster-editor/lib/utils/vue-inherit';
import BaseElement from 'vue-poster-editor/lib/base/base-element';
import loader from '@gaoding/editor-utils/lib/loader';
import uniq from 'lodash/uniq';
import DesignTable from './main/index';
import elementDependence from '@/mixins/element-dependence';
import { flattenPickValue } from './utils';
import createDbclickEvent from '@/utils/create-dblclick-event';
import template from './table-layout.html';

import './table-layout.css';

export default inherit(BaseElement, {
    mixins: [elementDependence],

    name: 'table-element',

    template,

    data() {
        return {
            borderZoom: 1,
        };
    },

    components: {
        DesignTable,
    },

    computed: {
        gridFontNames() {
            const {
                model: {
                    gridTheme,
                },
            } = this;
            // 下属属性中会包含有关字体的配置
            const {
                container = {},
                grids = [],
                lines = [],
                checkbox,
            } = gridTheme;
            let uiList = [
                container,
                grids.map(it => it.ui),
                lines.map(it => it.ui),
            ];
            if (checkbox && checkbox.ui) {
                uiList = uiList.concat(checkbox.ui);
            }
            const fontNames = [];
            uiList.forEach((ui) => {
                // eslint-disable-next-line
                const names = flattenPickValue(ui, ({ key }) => {
                    return /family$/.test(key);
                });
                fontNames.push(...names);
            });
            return uniq(fontNames);
        },
    },

    watch: {
        gridFontNames: 'load',
    },

    events: {
        ...createDbclickEvent('table'),
    },

    methods: {
        getCloseFont(name = '') {
            const { fontList, fontsMap } = this.options;

            if (!name) {
                name = this.model.fontFamily;
            }

            return fontsMap[name] || fontList[0];
        },

        // 这里会覆盖元素内部 baseElement 的 load 行为，用户做元素依赖资源的加载（字体）
        load() {
            const {
                options,
                gridFontNames,
            } = this;
            // 下属属性中会包含有关字体的配置
            if (!gridFontNames || !gridFontNames.length) {
                return Promise.resolve();
            }
            const fontLoads = gridFontNames.map((name) => {
                const font = this.getCloseFont(name);
                if (!font) {
                    return Promise.resolve();
                }

                return loader.loadFont({
                    ...font,
                    display: 'swap',
                }, options.fontLoadTimeout);
            });

            return Promise.all(fontLoads);
        },
    },
});
