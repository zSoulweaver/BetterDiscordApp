/**
 * BetterDiscord Discord Socket Proxy
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Events } = require('./events');
const { Module } = require('./modulebase');
const { Global } = require('./global');
const { Utils } = require('./utils');

class SocketProxy extends Module {

    events() {
        Events.on('socket-created', this.socketCreated);
    }

    bindings() {
        this.socketCreated = this.socketCreated.bind(this);
        this.onmessage = this.onmessage.bind(this);
    }

    socketCreated() {
        const wsHook = Global.getObject('wsHook');

        //TODO make this better and bind other events
        const onMessageHook = setInterval(() => {
            if (wsHook.onmessage !== null) {
                clearInterval(onMessageHook);
                //Discord sets onmessage twice so a timeout for now
                setTimeout(() => {
                    wsHook.onmessage = Utils.overload(wsHook.onmessage, this.onmessage);
                }, 2000);
            }
        }, 100);
    }

    onmessage(e) {
        console.log(e);
        //TODO fix unpacking
        const unpacked = this.erlpack.unpack(e.data);
        console.log(unpacked);
    }

    get erlpack() {
        if (this._erlpack) return this._erlpack;

        try {
            this._erlpack = window.require('erlpack');
        } catch (err) {
            console.log(err);
            try {
                this._erlpack = window.require('discord_erlpack');
            } catch (err) {
                console.log(err);
            }
        }

        return this._erlpack;
    }

}

const _instance = new SocketProxy();
module.exports = { 'SocketProxy': _instance }