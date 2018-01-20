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
const { Events } = require('./events');
const { BDIpc } = require('./bdipc');
const { WebpackModules } = require('./webpackmodules');

class Global extends Module {

    constructor(args) {
        super(args);
        this.first();
        window.gl = this;
    }

    bindings() {
        this.first = this.first.bind(this);
        this.setWS = this.setWS.bind(this);
        this.getObject = this.getObject.bind(this);
    }

    first() {
        (async () => {
            const config = await BDIpc.send('getConfig');
            this.setState(config);
           /* const getReact = await WebpackModules.getModuleByProps(('createElement', 'cloneElement'));
            this.React = getReact[0].exports;
            window.React = this.React;
            const getReactDom = await WebpackModules.getModuleByProps(('render', 'findDOMNode'));
            this.reactDOM = getReactDom[0].exports;*/
           // this.setState(Object.assign(config, { React, reactDOM }));
            Events.emit('global-ready');
        })();

        if (window.__bd) {
            this.setState(window.__bd);
            window.__bd = {
                setWS: this.setWS
            }
            Events.emit('socket-created');
        }
    }

    setWS(wSocket) {
        const state = this.state;
        state.wsHook = wSocket;
        this.setState(state);
        Events.emit('socket-created');
    }

    getObject(name) {
        return this.state[name];
    }

    getLoadedModule(name) {
        return this[name];
    }

}

const _instance = new Global();
module.exports = { 'Global': _instance }