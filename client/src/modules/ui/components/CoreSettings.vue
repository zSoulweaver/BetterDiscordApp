<template>
    <div class="bd-settingsWrap">
        <div class="bd-scroller">
            <ContentHeader text="Core Settings" />
            <div>
                <SettingSwitch v-for="setting in settings" :setting="setting" :key="setting.id" />
            </div>
        </div>
    </div>
</template>
<script>
import ContentHeader from './ContentHeader.vue';
import SettingSwitch from './SettingSwitch.vue';

const settings = [
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"},
  {id: 0, title: "Public Servers", hint: "Display public servers button"},
  {id: 1, title: "Minimal Mode", hint: "Hide elements and reduce the size of elements"},
  {id: 2, title: "Voice Mode", hint: "Only show voice chat"}
];

export default {
  components: {
    ContentHeader,
    SettingSwitch
  },
  data() {
    return {
      settings
    }
  }
}
</script>
<style>

</style>