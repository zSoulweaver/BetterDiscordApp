<template>
    <div class='bd-header'>{{item.text}}</div>
</template>
<script>
    export default {
        props: ['item']
    }
</script>
<style>
.bd-header {
    padding: 6px 0;
    margin-left: 10px;
    margin-top: 15px;
    color: rgba(255,255,255,0.15);
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    font-weight: 600;
    flex-shrink: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;
}
</style>