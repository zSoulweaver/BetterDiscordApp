<template>
    <SettingsWrapper headertext="Core Settings">
        <div class="bd-form-item"  v-for="setting in settings" :key="setting.id">
            <SettingSwitch key="setting.id" :setting="setting" :onClick="settingOnClick"/>
            <div class="bd-form-divider"/>
         </div>
    </SettingsWrapper>
</template>

<script>
    /*Imports*/
    import { SettingsWrapper } from './';
    import { SettingSwitch } from '../generic';
    const components = { SettingsWrapper, SettingSwitch };

    /*Methods*/
    function settingOnClick() {

    }

    const methods = { settingOnClick };

    export default {
        components,
        methods,
        props: ['settings']
    }
</script>