<template src="./templates/BdSettingsWrapper.html"></template>
<script>
    /*Imports*/
    import BdSettings from './BdSettings.vue';
    const components = { BdSettings };

    /*Methods*/
    function showSettings() { this.active = true; }
    function hideSettings() { this.active = false; }

    const methods = { showSettings, hideSettings };

    export default {
        components,
        methods,
        data() {
            return { active: false }
        },
        created: function() {
            window.addEventListener('keyup', e => {
                if (e.which !== 27) return;
                this.hideSettings();
            });
        }
    }
</script>