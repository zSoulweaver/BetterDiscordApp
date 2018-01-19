<template>
    <div class="bd-settings" :class="{active: isActive}">
        <SidebarView>
            <Sidebar slot="sidebar">
                <SidebarItem v-for="item in sidebarItems" :item="item" :key="item.id" :onClick="itemOnClick" />
            </Sidebar>
        </SidebarView>
        
    </div>
</template>

<script>

    const sidebarItems = [
        { text: 'Internal', t: 'header' },
        { id: 0, contentid: "core", text: 'Core', active: false, t: 'button' },
        { id: 1, contentid: "ui", text: 'UI', active: false, t: 'button' },
        { id: 2, contentid: "emotes", text: 'Emotes', active: false, t: 'button' },
        { id: 3, contentid: "css", text: 'CSS Editor', active: false, t: 'button' },
        { text: 'External', t: 'header' },
        { id: 4, contentid: "plugins", text: 'Plugins', active: false, t: 'button' },
        { id: 5, contentid: "themes", text: 'Themes', active: false, t: 'button' }
    ];

    function itemOnClick(id) {
        console.log(`Item Clicked! ${id}`);
    }


    import { SidebarItem, SidebarView, Sidebar } from './sidebar/index.js';
    export default {
        props: ['isActive'],
        components: {
            SidebarItem,
            SidebarView,
            Sidebar
        },
        data() {
            return {
                sidebarItems
            }
        },
        methods: {
            itemOnClick
        }
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