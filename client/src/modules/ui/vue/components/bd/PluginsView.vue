<template src="./templates/PluginsView.html"></template>
<script>
    /*Imports*/
    import { SettingsWrapper, PluginCard } from './';
    const components = { SettingsWrapper, PluginCard };

    /*Variables*/
    let dummyPlugins = [
        { "id": 0, "name": "Dummy Plugin 1", "authors": ["Jiiks"], "version": "1.0", "description": "Dummy Plugin 1 Description" },
        { "id": 0, "name": "Dummy Plugin 2", "authors": ["Jiiks", "SomeoneElse"], "version": "1.0", "description": "Dummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 DescriptionDummy Plugin 2 Description" }
    ];

    /*Methods*/

    function showLocal() {
        this.local = true;
    }

    function showOnline() {
        this.local = false;
    }

    const methods = { showLocal, showOnline };

    export default {
        components,
        data() {
            return {
                localPlugins: dummyPlugins,
                local: true
            }
        },
        methods
    }
</script>