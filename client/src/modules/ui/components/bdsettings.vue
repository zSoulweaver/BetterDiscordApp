<template>
    <div class="bd-settings" :class="{active: isActive}">
        <SidebarView :contentVisible="this.activeIndex >= 0" :animating="this.animating">
            <Sidebar slot="sidebar">
                <div class="bd-settings-x" @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg>
                </div>
                <SidebarItem v-for="item in sidebarItems" :item="item" :key="item.id" :onClick="itemOnClick" />
            </Sidebar>
            <SidebarViewContent slot="content">
                <div :class="{active: activeContent('core'), animating: animatingContent('core')}">
                    <CoreSettings />
                </div>
                <div :class="{active: activeContent('ui'), animating: animatingContent('ui')}">
                    <UISettings />
                </div>
            </SidebarViewContent>
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
        if (this.animating || id === this.activeIndex) return;
        if (this.activeIndex >= 0) this.sidebarItems.find(item => item.id === this.activeIndex).active = false;
        this.sidebarItems.find(item => item.id === id).active = true;
        this.animating = true;
        this.lastActiveIndex = this.activeIndex;
        this.activeIndex = id;

        if (this.first) {
            this.first = false;
        }

        setTimeout(() => {
            this.animating = false;
            this.lastActiveIndex = -1;
        }, 400);
    }

    function animatingContent(s) {
        const item = this.sidebarItems.find(item => item.contentid === s);
        if (!item) return false;
        return item.id === this.lastActiveIndex;
    }

    function activeContent(s) {
        const item = this.sidebarItems.find(item => item.contentid === s);
        if (!item) return false;
        return item.id === this.activeIndex;
    }


    import { SidebarItem, SidebarView, Sidebar, SidebarViewContent } from './sidebar/index.js';
    import CoreSettings from './CoreSettings.vue';
    import UISettings from './UISettings.vue';
    export default {
        props: ['isActive', 'close'],
        components: {
            SidebarItem,
            SidebarView,
            Sidebar,
            SidebarViewContent,
            CoreSettings,
            UISettings
        },
        data() {
            return {
                sidebarItems,
                activeIndex: -1,
                lastActiveIndex: -1,
                animating: false,
                first: true
            }
        },
        methods: {
            itemOnClick,
            activeContent,
            animatingContent
        },
        updated: function () {
            if (!this.isActive) {
                this.activeIndex = this.lastActiveIndex = -1;
                this.sidebarItems.forEach(sidebarItem => { sidebarItem.active = false; });
            }
        }
    }
</script>
<style>

</style>