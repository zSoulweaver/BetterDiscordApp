<template src="./templates/PluginsView.html"></template>
<script>
    const { PluginManager } = require('../../../../'); //#1 require of 2018~ :3

    /*Imports*/
    import { SettingsWrapper } from './';
    import PluginCard from './PluginCard.vue';
    const components = { SettingsWrapper, PluginCard };

    /*Variables*/

     /*Methods*/
    async function refreshLocalPlugins() {
        try {
            await PluginManager.refreshPlugins();
        } catch (err) {
            
        }
        this.localPlugins = PluginManager.plugins;
    }

    function showLocal() {
        this.local = true;
    }

    function showOnline() {
        this.local = false;
    }

    const methods = { showLocal, showOnline, refreshLocalPlugins };

    export default {
        components,
        data() {
            return {
                localPlugins: [],
                local: true
            }
        },
        methods,
        created: function () {
            this.refreshLocalPlugins();
        }
    }
</script>

<style>
    .bd-spinner-container {
        display: flex;
        flex-grow: 1;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

        .bd-spinner-container .bd-spinner-2 {
            width: 200px;
            height: 200px;
        }
</style>