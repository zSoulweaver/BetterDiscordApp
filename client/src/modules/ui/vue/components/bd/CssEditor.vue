<template src="./templates/CssEditor.html"></template>

<script>
    const { CssEditor } = require('../../../../');

    /*Imports*/
    import { SettingsWrapper } from './';
    const components = { SettingsWrapper };

    function openInternalEditor() {
        CssEditor.show();
    }

    export default {
        components,
        methods: { openInternalEditor }
    }
</script>