<template>
    <div class="bd-item" :class="{active: item.active}" @click="onClick(item.id)">{{item.text}}</div>
</template>
<script>
    export default {
        props: ['item', 'onClick']
    }
</script>
<style lang="scss">
    .bd-item {
        border-radius: 3px;
        margin-bottom: 2px;
        padding-bottom: 6px;
        padding-top: 6px;
        padding: 6px 10px;
        color: #b9bbbe;
        cursor: pointer;
        font-size: 17px;
        line-height: 20px;
        position: relative;
        flex-shrink: 0;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;
        &:hover

    {
        background: rgba(0,0,0,0.4);
    }

    &.active {
        color: #FFF;
        background: rgba(0,0,0,0.4);
    }

    }
</style>