<template>
    <h2 class="bd-content-title">{{text}}</h2>
</template>
<script>
export default {
  props: {
    text: {}
  }
}
</script>
<style>
    .bd-content-title {
        color: #4D7DEC;
        text-transform: uppercase;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 100%;
        outline: 0;
        padding: 0;
        vertical-align: baseline;
    }
</style>
