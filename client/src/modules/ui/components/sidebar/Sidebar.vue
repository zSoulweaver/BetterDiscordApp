<template>
    <div class='bd-sidebar'>
        <slot />
    </div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
    .bd-sidebar {
        padding: 0;
    }

    .logo {
        height: 30px;
        margin-top: 10px;
        margin-left: 10px;
    }

    h1 {
        font-size: 16px;
        font-weight: 500;
        color: #4D7DEC;
        margin-left: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding-bottom: 13px;
        text-transform: uppercase;
    }
</style>