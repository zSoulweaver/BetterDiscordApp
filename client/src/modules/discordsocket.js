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

class SocketProxy extends Module {

    events() {
        Events.on('socket-created', this.socketCreated);
    }

    bindings() {
        this.socketCreated = this.socketCreated.bind(this);
        window.test = this;
    }

    socketCreated() {
        console.log('SOCKET CREATED!');
        console.log(Global.getObject('wsHook'));
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