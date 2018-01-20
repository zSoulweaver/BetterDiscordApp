<template>
    <div class='bd-sidebar-view' :class="{active: contentVisible, animating: animating}">
        <div class='bd-sidebar-region'>
            <div class='bd-settingsWrap'>
                <div class='bd-scroller'>
                    <slot name="sidebar" />
                </div>
            </div>
        </div>
        <div class='bd-content-region'>
            <slot name="content" />
            <div class='bd-content-tools' />
        </div>
    </div>
</template>
<script>
export default {
  props: {
    contentVisible: {
      default: false
    },
    animating: {
      default: false
    }
  }
}
</script>