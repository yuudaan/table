export default {
    props: {
        data: {
            required: true,
        },

        gradientColor: {
            type: String,
            default: '',
        },

        ui: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        cellText() {
            return this.data || '';
        },

        cellUi() {
            const { ui, gradientColor } = this;
            if (!gradientColor) {
                return ui;
            }
            return {
                ...ui,
                backgroundColor: gradientColor,
            };
        },
    },
};
