/**
 * BetterDiscord CSS Editor
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Module } = require('./modulebase');
const { BDIpc } = require('./bdipc');

class CssEditor extends Module {

    setInitialState() {
        this.state = {
            css: ''
        }
        window.cssEditor = this;
    }

    show() {
        BDIpc.send('openCssEditor', {});
    }
}

const _instance = new CssEditor();
module.exports = { 'CssEditor': _instance }