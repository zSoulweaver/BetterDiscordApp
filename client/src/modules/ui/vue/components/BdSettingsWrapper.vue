<template src="./templates/BdSettingsWrapper.html"></template>
<script>
    /*Imports*/
    import BdSettings from './BdSettings.vue';
    const components = { BdSettings };

    /*Methods*/
    function showSettings() { this.active = true; }
    function hideSettings() { this.active = false; }

    const methods = { showSettings, hideSettings };

    let keydownEvent;

    export default {
        components,
        methods,
        data() {
            return {
                active: false,
                platform: global.process.platform
            }
        },
        created: function() {
            window.addEventListener('keydown', keydownEvent = e => {
                if (this.active) {
                    if (e.which === 27)
                        this.hideSettings();
                } else {
                    if (global.process.platform == 'darwin' && e.metaKey && e.key == 'b')
                        this.showSettings();
                    else if (global.process.platform != 'darwin' && e.ctrlKey && e.key == 'b')
                        this.showSettings();
                    else return;
                }

                e.stopImmediatePropagation();
            });
        },
        destroyed: function() {
            window.removeEventListener('keydown', keydownEvent);
        }
    }
</script>
