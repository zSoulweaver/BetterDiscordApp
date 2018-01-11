/**
 * BetterDiscord Plugin Manager
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Module } = require('./modulebase');

class PluginManager extends Module {
    
    setInitialState() {
        this.setState({
            plugins: {}
        });
    }

    get plugins() {
        return this.state.plugins;
    }

}

module.exports = { PluginManager }