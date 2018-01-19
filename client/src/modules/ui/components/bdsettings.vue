<template>
    <div class="bd-settings" :class="{active: isActive}">
    </div>
</template>

<script>
    export default {
        props: ['isActive']
    }
</script>

<style>
    .bd-settings {
        position: absolute;
        top: 22px;
        left: 0;
        bottom: 0;
        z-index: 3000;
        width: 310px;
        background: #202225;
        transform: translateX(-100%) translateY(-100%);
        opacity: 0;
        transition: all .4s ease-in-out;
    }

        .bd-settings.active {
            transform: none;
            opacity: 1;
        }
</style>