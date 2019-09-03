<template>
    <PanelContainer>
        <TableOperatorPanel :editor="editor" />
    </PanelContainer>
</template>

<script>
import TableOperatorPanel from './TableOperatorPanel';

export default {
    name: 'TablePanel',

    components: {
        TableOperatorPanel,
    },

    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
};
</script>
