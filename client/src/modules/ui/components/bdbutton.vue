<template>
    <div class="bd-settings-wrapper">
        <div class="bd-settings-button" :class="{active: this.isActive}" @click="showSettings">
            <div class="bd-settings-button-btn"></div>
        </div>
        <BdSettings :isActive="this.isActive" :close="hideSettings" />
    </div>
</template>
<script>
    import BdSettings from './bdsettings.vue';
    export default {
        components: {
            BdSettings
        },
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            toggleSettings() {
                this.isActive = !this.isActive;
            },
            hideSettings() {
                this.isActive = false;
            },
            showSettings() {
                this.isActive = true;
            }
        }
    }
</script>