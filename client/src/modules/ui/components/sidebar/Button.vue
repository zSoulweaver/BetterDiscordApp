<template>
    <div class="bd-item" :class="{active: item.active}" @click="onClick(item.id)">{{item.text}}</div>
</template>
<script>
    export default {
        props: ['item', 'onClick']
    }
</script>