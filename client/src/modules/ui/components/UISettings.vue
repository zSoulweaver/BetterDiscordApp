<template>
    <div class="bd-settingsWrap">
        <div class="bd-scroller">
            <ContentHeader text="UI Settings" />
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
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"},
  {id: 0, title: "Dummy Setting", hint: "Dummy Setting Hint"}
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