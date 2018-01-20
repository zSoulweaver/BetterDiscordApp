/**
 * BetterDiscord Client Renderer
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { WebpackModules } = require('../');

class Renderer {

    static async render(component, root) {
        if (!this.React) this.React = await this.getReact();
        if (!this.reactDom) this.reactDom = await this.getReactDom();
        const React = this.React;
        window.React = React;
        this.reactDom.render(component, root);
    }

    static async getReact() {
        const getReact = await WebpackModules.getModuleByProps(('createElement', 'cloneElement'));
        return getReact[0].exports;
    }

    static async getReactDom() {
        const getReactDom = await WebpackModules.getModuleByProps(('render', 'findDOMNode'));
        return getReactDom[0].exports;
    }

}

module.exports = { Renderer };