/**
 * BetterDiscord Client Globals
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Module } = require('./basemodule');

class Global extends Module {

    bindings() {
        this.first = this.first.bind(this);
        this.setWS = this.setWS.bind(this);
    }


    first() {
        if (window.__bd) {
            this.setState({
                globals: window.__bd
            });
            window.__bd = {
                setWS: this.setWS
            }
        }
    }

    setWS(wSocket) {
        const { globals } = this.state;
        globals.wSocket = wSocket;
        this.setState({globals});
    }

}

const _instance = new Global();

module.exports = { 'Global': _instance }