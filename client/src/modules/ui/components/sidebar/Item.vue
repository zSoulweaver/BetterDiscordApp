<template>
    <SidebarButton v-if="item.t == 'button'" :item="item" :onClick="onClick" />
    <SidebarHeader v-else-if="item.t == 'header'" :item="item" />
</template>
<script>

import { SidebarHeader, SidebarButton } from './';

export default {
	components: {
        SidebarHeader,
        SidebarButton
	},
    props: ['item', 'onClick']
}

</script>