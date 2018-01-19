/**
 * BetterDiscord Client UI Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const $ = require('jquery');
const { Sidebar, SidebarHeader, SidebarItem } = require('./components/sidebar.jsx');
const SidebarView = require('./components/sidebarview.jsx');

const { WebpackModules } = require('../');
const React = WebpackModules.getModuleByNameSync('React', true);

const { Renderer } = require('./renderer.jsx');
class UI {

    constructor() {
        window.jQuery = $;
        this.visible = false;
        this.injectButton();
    }

    async injectButton() {
        const defer = setInterval(() => {
            if (!this.titleWrapper.length) return;
            clearInterval(defer);
            this.injectCss();
            this.titleWrapper.append(this.settingsButton = this.createSettingsButton);

            $('body').append($('<div/>', {
                class: 'bd-settingspanel',
                id: 'okaythen'
            }));
            $('body').append($('<div/>',{
                class: 'bd-settingspanel-dimmer',
                id: 'bd-dimmer',
                click: this.toggleSettings.bind(this)
            }));

            const items = [
                <SidebarHeader text="BetterDiscord" />,
                <SidebarItem text="Core" />,
                <SidebarItem text="UI"/>
            ];

            Renderer.render(<SidebarView sidebar={<Sidebar>{items}</Sidebar>}/>, document.getElementById('okaythen'));
        }, 100);
    }

    toggleSettings() {
        $('.bd-settingsbutton').toggleClass('active');
        $('#okaythen').toggleClass('active');
        $('#bd-dimmer').toggleClass('active');
    }

    //TODO This is temporary
    injectCss() {
        $('head').append($('<style/>', {
            text: tempcss
        }));
    }

    get createSettingsButton() {
        return $('<div/>', {
            class: 'bd-settingsbutton',
            click: this.toggleSettings.bind(this)
        }).append($('<div/>', {
            class: 'bd-wordmark'
        }));
    }

    get titleWrapper() {
        return $('body');
    }

}

module.exports = { UI }


var tempcss = `

.bd-settingspanel-dimmer {
    background: rgba(0,0,0,.6);
    opacity: 0;
    position: absolute;
    top: 22px;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .5s ease-in-out;
    z-index: 90000;
    pointer-events: none;
}

.bd-settingspanel-dimmer.active {
    pointer-events: all;
    opacity: 1;
}

.bd-settings-button {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 24px;
    height: 24px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FscXVlXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAwIDIwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGZpbGw9IiMzRTgyRTUiIGQ9Ik0xNDAyLjIsNjMxLjdjLTkuNy0zNTMuNC0yODYuMi00OTYtNjQyLjYtNDk2SDY4LjR2NzE0LjFsNDQyLDM5OFY0OTAuN2gyNTdjMjc0LjUsMCwyNzQuNSwzNDQuOSwwLDM0NC45SDU5Ny42djMyOS41aDE2OS44YzI3NC41LDAsMjc0LjUsMzQ0LjgsMCwzNDQuOGgtNjk5djM1NC45aDY5MS4yYzM1Ni4zLDAsNjMyLjgtMTQyLjYsNjQyLjYtNDk2YzAtMTYyLjYtNDQuNS0yODQuMS0xMjIuOS0zNjguNkMxMzU3LjcsOTE1LjgsMTQwMi4yLDc5NC4zLDE0MDIuMiw2MzEuN3oiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTI2Mi41LDEzNS4yTDEyNjIuNSwxMzUuMmwtNzYuOCwwYzI2LjYsMTMuMyw1MS43LDI4LjEsNzUsNDQuM2M3MC43LDQ5LjEsMTI2LjEsMTExLjUsMTY0LjYsMTg1LjNjMzkuOSw3Ni42LDYxLjUsMTY1LjYsNjQuMywyNjQuNmwwLDEuMnYxLjJjMCwxNDEuMSwwLDU5Ni4xLDAsNzM3LjF2MS4ybDAsMS4yYy0yLjcsOTktMjQuMywxODgtNjQuMywyNjQuNmMtMzguNSw3My44LTkzLjgsMTM2LjItMTY0LjYsMTg1LjNjLTIyLjYsMTUuNy00Ni45LDMwLjEtNzIuNiw0My4xaDcyLjVjMzQ2LjIsMS45LDY3MS0xNzEuMiw2NzEtNTY3LjlWNzE2LjdDMTkzMy41LDMxMi4yLDE2MDguNywxMzUuMiwxMjYyLjUsMTM1LjJ6Ii8+PC9nPjwvc3ZnPg==);
    background-size: 100% 100%;
    cursor: pointer;
    filter: grayscale(100%);
    opacity: .5;
    transition: all .4s ease-in-out;
}

.bd-settings-button.active,
.bd-settings-button:hover {
    opacity: 1;
    filter: none;
    transform: scale(1.2);
}

.bd-settingspanel {
    position: absolute;
    height: 100%;
    width: 50%;
    background: #2f3136;
    z-index: 90001;
    left: 0;
    top: 22px;
    bottom: 0;
    transform: translateX(-100%);
}

.bd-settingspanel.active {
    animation: slideanim 1s forwards;
}

.bd-settingsbutton {
    z-index: 10000;
    width: 114px;
    height: 15px;
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.bd-wordmark {
    width: 52px;
    height: 16px;
    background-size: 100% 10px;
    position: absolute;
    left: 4px;
    background-repeat: no-repeat;
    background-position: center;
	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTQwIiBoZWlnaHQ9IjE4OC4wMDAwMDAwMDAwMDAwMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8ZyBpZD0ic3ZnXzEiPiAgIDxwYXRoIGlkPSJzdmdfMiIgZD0ibTc1LjI3Mjk4NywwLjQ0MjQ3MWwtNzQuNzAwMDA4LDBsMCw3Ny4xMDAwMDJsNDcuNzAwMDA0LDQyLjk5OTk5MmwwLC04MS43MDAwMDFsMjcuNzk5OTk5LDBjMjkuNTk5OTk4LDAgMjkuNTk5OTk4LDM3LjIwMDAwOCAwLDM3LjIwMDAwOGwtMTguMjk5OTk5LDBsMCwzNS41OTk5OThsMTguMjk5OTk5LDBjMjkuNTk5OTk4LDAgMjkuNTk5OTk4LDM3LjE5OTk5NyAwLDM3LjE5OTk5N2wtNzUuNTAwMDAzLDBsMCwzOC4yOTk5ODhsNzQuNjAwMDAyLDBjMzguNSwwIDY4LjI5OTk5NSwtMTUuMzk5OTk0IDY5LjQwMDAwMiwtNTMuNTk5OTc2YzAsLTE3LjYwMDAwNiAtNC44MDAwMDMsLTMwLjcwMDAxMiAtMTMuMzAwMDAzLC0zOS44MDAwMDNjOC41LC05LjEwMDAwNiAxMy4zMDAwMDMsLTIyLjIwMDAwNSAxMy4zMDAwMDMsLTM5LjgwMDAwN2MtMSwtMzguMDk5OTk4IC0zMC43OTk5OTUsLTUzLjQ5OTk5OSAtNjkuMjk5OTk1LC01My40OTk5OTl6IiBmaWxsPSIjM0U4MkU1Ii8+ICAgPHBvbHlnb24gaWQ9InN2Z18zIiBwb2ludHM9IjMzMC42NzI5NjkxMDI4NTk1LDAuNDQyNDcxMjY1NzkyODQ2NyAzMzAuNjcyOTY5MTAyODU5NSwzOC44NDI0NjQ0NDcwMjE0ODQgMzc4Ljc3Mjk0NDY4ODc5NywzOC44NDI0NjQ0NDcwMjE0ODQgMzc4Ljc3Mjk0NDY4ODc5NywxODcuMTQyNDU2MDU0Njg3NSA0MjYuNDcyOTU2ODk1ODI4MjUsMTg3LjE0MjQ1NjA1NDY4NzUgNDI2LjQ3Mjk1Njg5NTgyODI1LDM4Ljg0MjQ2NDQ0NzAyMTQ4NCA1MDEuNzcyOTQ0Njg4Nzk3LDM4Ljg0MjQ2NDQ0NzAyMTQ4NCA1MDEuNzcyOTQ0Njg4Nzk3LDE4Ny4xNDI0NTYwNTQ2ODc1IDU0OS41NzI5MzI0ODE3NjU3LDE4Ny4xNDI0NTYwNTQ2ODc1IDU0OS41NzI5MzI0ODE3NjU3LDM4Ljg0MjQ2NDQ0NzAyMTQ4NCA1OTcuNjcyOTY5MTAyODU5NSwzOC44NDI0NjQ0NDcwMjE0ODQgNTk3LjY3Mjk2OTEwMjg1OTUsMC40NDI0NzEyNjU3OTI4NDY3ICIgZmlsbD0iIzNFODJFNSIvPiAgIDxwb2x5Z29uIGlkPSJzdmdfNCIgcG9pbnRzPSIxNjkuNTcyOTc4MjU4MTMyOTMsMC40NDI0NzEyNjU3OTI4NDY3IDE2OS41NzI5NzgyNTgxMzI5MywxODcuMTQyNDU2MDU0Njg3NSAzMTMuNjcyOTY5MTAyODU5NSwxODcuMTQyNDU2MDU0Njg3NSAzMTMuNjcyOTY5MTAyODU5NSwxNDguODQyNDY4MjYxNzE4NzUgMjE3LjM3Mjk4MTMwOTg5MDc1LDE0OC44NDI0NjgyNjE3MTg3NSAyMTcuMzcyOTgxMzA5ODkwNzUsMTE3LjY0MjQ3MTMxMzQ3NjU2IDI2OC40NzI5NTY4OTU4MjgyNSwxMTcuNjQyNDcxMzEzNDc2NTYgMjY4LjQ3Mjk1Njg5NTgyODI1LDY5Ljk0MjQ3NDM2NTIzNDM4IDIxNy4zNzI5ODEzMDk4OTA3NSw2OS45NDI0NzQzNjUyMzQzOCAyMTcuMzcyOTgxMzA5ODkwNzUsMzguODQyNDY0NDQ3MDIxNDg0IDMxMy42NzI5NjkxMDI4NTk1LDM4Ljg0MjQ2NDQ0NzAyMTQ4NCAzMTMuNjcyOTY5MTAyODU5NSwwLjQ0MjQ3MTI2NTc5Mjg0NjcgIiBmaWxsPSIjM0U4MkU1Ii8+ICAgPHBvbHlnb24gaWQ9InN2Z181IiBwb2ludHM9IjYxNC4zNzI5ODEzMDk4OTA3LDAuNDQyNDcxMjY1NzkyODQ2NyA2MTQuMzcyOTgxMzA5ODkwNywxODcuMTQyNDU2MDU0Njg3NSA3NTguMzcyOTgxMzA5ODkwNywxODcuMTQyNDU2MDU0Njg3NSA3NTguMzcyOTgxMzA5ODkwNywxNDguODQyNDY4MjYxNzE4NzUgNjYyLjA3MjkzMjQ4MTc2NTcsMTQ4Ljg0MjQ2ODI2MTcxODc1IDY2Mi4wNzI5MzI0ODE3NjU3LDExNy42NDI0NzEzMTM0NzY1NiA3MTMuMjcyOTQ0Njg4Nzk3LDExNy42NDI0NzEzMTM0NzY1NiA3MTMuMjcyOTQ0Njg4Nzk3LDY5Ljk0MjQ3NDM2NTIzNDM4IDY2Mi4wNzI5MzI0ODE3NjU3LDY5Ljk0MjQ3NDM2NTIzNDM4IDY2Mi4wNzI5MzI0ODE3NjU3LDM4Ljg0MjQ2NDQ0NzAyMTQ4NCA3NTguMzcyOTgxMzA5ODkwNywzOC44NDI0NjQ0NDcwMjE0ODQgNzU4LjM3Mjk4MTMwOTg5MDcsMC40NDI0NzEyNjU3OTI4NDY3ICIgZmlsbD0iIzNFODJFNSIvPiAgIDxwYXRoIGlkPSJzdmdfNiIgZD0ibTg5MC41NzI5MzcsMTIzLjE0MjQ3MWMyMi41LC03LjEwMDAwNiAzNi41LC0yNi42MDAwMDYgMzYuNSwtNjEuMTAwMDAyYy0xLC00My41OTk5OTUgLTMwLjc5OTk4OCwtNjEuNjk5OTk2IC02OS4yMDAwMTIsLTYxLjY5OTk5NmwtNzQuNSwwbDAsMTg2Ljc5OTk4M2w0Ny42MDAwMzcsMGwwLC01OS4xOTk5NzRsOC40MDAwMjQsMGw0My4xOTk5NTEsNTkuMTk5OTc0bDU4LjcwMDAxMiwwbC01MC43MDAwMTIsLTYzLjk5OTk4NXptLTMxLjg5OTk2MywtMzUuODAwMDAzbC0yNy43MDAwMTIsMGwwLC00OC41MDAwMDRsMjcuNzAwMDEyLDBjMjkuNTk5OTc2LDAgMjkuNTk5OTc2LDQ4LjUwMDAwNCAwLDQ4LjUwMDAwNHoiIGZpbGw9IiMzRTgyRTUiLz4gIDwvZz4gPC9nPjwvc3ZnPg==);
    filter: grayscale(100%);
    opacity: .5;
    transition: all .4s ease-in-out;
}

.bd-settingsbutton.active .bd-wordmark,
.bd-settingsbutton:hover .bd-wordmark {
    filter: none;
    opacity: 1;
}

[class^="wordmark"] svg {
    margin-left: 52px;
}

@keyframes slideanim {
    50% {
        transform:translateX(0);
    }
    100% {
        transform: translateX(-5%);
    }
}
            `;
