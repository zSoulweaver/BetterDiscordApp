/**
 * BetterDiscord Client Globals
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Module } = require('./modulebase');

class Global extends Module {

    bindings() {
        this.first = this.first.bind(this);
        this.setWS = this.setWS.bind(this);
        this.getObject = this.getObject.bind(this);
    }

    first() {
        if (window.__bd) {
            this.setState(window.__bd);
            window.__bd = {
                setWS: this.setWS
            }
        }
    }

    setWS(wSocket) {
        const state = this.state;
        state.wsHook = wSocket;
        this.setState(state);
    }

    getObject(name) {
        return this.state[name];
    }

}

const _instance = new Global();
module.exports = { 'Global': _instance }