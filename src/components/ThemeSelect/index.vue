<template>
    <UiPreviewSelect
        :options="themeList"
        :active="activeOption"
        @select="switchTheme"
    >
        <template v-slot:item="{ option }">
            <div
                class="table-item-preview"
                :class="[option.theme.name]"
            />
        </template>
        <template v-slot:footer>
            <div class="table-colors-conf">
                <ColorSelect :editor="editor" />
            </div>
        </template>
    </UiPreviewSelect>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import themes from '../../data';
import ColorSelect from './ColorSelect';

export default {
    components: {
        ColorSelect,
    },

    props: {
        editor: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            currTableName: '',
        };
    },

    computed: {
        themeList() {
            return themes[this.gridCate];
        },

        currentElement() {
            const { currentSubElement, currentElement } = this.editor || {};
            return currentSubElement || currentElement || null;
        },

        gridCate() {
            const { currentElement } = this;
            if (!currentElement) {
                return 'normal';
            }
            return currentElement.gridCategory || 'normal';
        },
    },

    watch: {
        currentElement: {
            immediate: true,
            handler(elem) {
                if (elem && elem.gridTheme) {
                    this.currTableName = elem.gridTheme.name;
                }
            },
        },
    },

    methods: {
        activeOption(table) {
            return table.theme.name === this.currTableName;
        },

        switchTheme({ theme, options = {} }) {
            const { currentElement } = this;
            if (currentElement) {
                const {
                    gridOptions,
                } = currentElement;
                this.currentElement.gridTheme = {
                    ...theme,
                    colors: cloneDeep(theme.colors),
                };
                const checkboxOptions = {};
                if (gridOptions.checkbox) {
                    checkboxOptions.checkbox = {
                        checked: gridOptions.checkbox.checked || [],
                    };
                }
                this.currentElement.gridOptions = {
                    ...(gridOptions || {}),
                    ...options,
                    ...checkboxOptions,
                };
                this.currTableName = theme.name;
                this.editor.makeSnapshot('change_grid_theme');
            }
        },
    },
};
</script>

<style lang="postcss">
.table-item-preview {
    width: 100%;
    height: 100%;
    background: #fff no-repeat no-repeat center / 74px 58px;

    &.normal-table-0 {
        background-image: url("~@/assets/table-icons/normal-0-2x.png");
    }
    &.normal-table-1 {
        background-image: url("~@/assets/table-icons/normal-1-2x.png");
    }
    &.normal-table-2 {
        background-image: url("~@/assets/table-icons/normal-2-2x.png");
    }
    &.normal-table-3 {
        background-image: url("~@/assets/table-icons/normal-3-2x.png");
    }
    &.normal-table-4 {
        background-image: url("~@/assets/table-icons/normal-4-2x.png");
    }
    &.normal-table-5 {
        background-image: url("~@/assets/table-icons/normal-5-2x.png");
    }
    &.normal-table-6 {
        background-image: url("~@/assets/table-icons/normal-6-2x.png");
    }
    &.table-checkbox-0 {
        background-image: url("~@/assets/table-icons/checkbox-0-2x.png");
    }
    &.table-checkbox-1 {
        background-image: url("~@/assets/table-icons/checkbox-1-2x.png");
    }
    &.table-checkbox-2 {
        background-image: url("~@/assets/table-icons/checkbox-2-2x.png");
    }
    &.table-gradient-0 {
        background-image: url("~@/assets/table-icons/gradient-0-2x.png");
    }
}

.table-colors-conf {
    border-top: 1px solid var(--panel-stroke);
}
</style>
