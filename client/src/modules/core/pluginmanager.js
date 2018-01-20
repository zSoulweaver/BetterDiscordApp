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
const { FileUtils } = require('./utils');
const { Global } = require('./global');
const path = window.require('path');

class Plugin {

    constructor(pluginInternals) {
        this.__pluginInternals = pluginInternals;
    }

    get configs() { return this.__pluginInternals.configs }
    get info() { return this.__pluginInternals.info }
    get paths() { return this.__pluginInternals.paths }
    get main() { return this.__pluginInternals.main }
    get defaultConfig() { return this.configs.defaultConfig }
    get userConfig() { return this.configs.userConfig }
    get name() { return this.info.name }
    get authors() { return this.info.authors }
    get version() { return this.info.version }
    get pluginPath() { return this.paths.pluginPath }
    get dirName() { return this.paths.dirName }
    get enabled() { return this.userConfig.enabled }

    start() {
        if (this.onStart) return this.onStart();
        return true; //Assume plugin started since it doesn't have onStart
    }

    stop() {
        if (this.onStop) return this.onStop();
        return true; //Assume plugin stopped since it doesn't have onStop
    }

}

class PluginManager extends Module {
    
    setInitialState() {
        window.pm = this;
        this.setState({
            plugins: []
        });
    }

    get plugins() {
        return this.state.plugins;
    }

    pluginsPath() {
        return Global.getObject('paths').find(path => path.id === 'plugins').path;
    }

    async loadPlugin(pluginPath) {
        const { plugins } = this.state;
        const dirName = pluginPath;

        try {
            const pluginsPath = this.pluginsPath();
            pluginPath = path.join(pluginsPath, pluginPath);

            const loaded = plugins.find(plugin => plugin.pluginPath === pluginPath);
            if (loaded) {
                throw { 'message': 'Attempted to load an already loaded plugin' };
            }

            const readConfig = await this.readConfig(pluginPath);
            const mainPath = path.join(pluginPath, readConfig.main);
            const userConfigPath = path.join(pluginPath, 'user.config.json');

            let userConfig = readConfig.defaultConfig;
            try {
                const readUserConfig = await FileUtils.readJsonFromFile(userConfigPath);
                userConfig = Object.assign({}, userConfig, readUserConfig);
            } catch (err) {/*We don't care if this fails it either means that user config doesn't exist or there's something wrong with it so we revert to default config*/}

            const configs = {
                defaultConfig: readConfig.defaultConfig,
                userConfig
            };

            const plugin = window.require(mainPath)(Plugin, {}, {});
            const instance = new plugin({configs, info: readConfig.info, main: readConfig.main, paths: { pluginPath, dirName }});

            if (instance.enabled) instance.start();

            plugins.push(instance);

            this.setState(plugins);

            return instance;
        } catch (err) {
            throw err;
        }
    }

    async reloadPlugin(plugin) {
        const _plugin = this.findPlugin(plugin);
        if (!_plugin) throw { 'message': 'Attempted to reload a plugin that is not loaded?' };
        if (!_plugin.stop()) throw { 'message': 'Plugin failed to stop!' };
        const index = this.getPluginIndex(_plugin);
        const { pluginPath, dirName } = _plugin;
        delete window.require.cache[window.require.resolve(pluginPath)];

        this.plugins.splice(index, 1);

        return this.loadPlugin(dirName);
    }

    //TODO make this nicer
    findPlugin(wild) {
        let plugin = this.getPluginByName(wild);
        if (plugin) return plugin;
        plugin = this.getPluginById(wild);
        if (plugin) return plugin;
        plugin = this.getPluginByPath(wild);
        if (plugin) return plugin;
        return this.getPluginByDirName(wild);
    }

    getPluginIndex(plugin) { return this.plugins.findIndex(p => p === plugin) }
    getPluginByName(name) { return this.plugins.find(p => p.name === name) }
    getPluginById(id) { return this.plugins.find(p => p.id === id) }
    getPluginByPath(path) { return this.plugins.find(p => p.pluginPath === path) }
    getPluginByDirName(dirName) { return this.plugins.find(p => p.dirName === dirName) }

    stopPlugin(name) {
        const plugin = this.getPluginByName(name);
        if (plugin && plugin.instance) return plugin.instance.stop();
        return true; //Return true anyways since plugin doesn't exist
    }

    startPlugin(name) {
        const plugin = this.getPluginByName(name);
        if (plugin && plugin.instance) return plugin.instance.start();
        return true; //Return true anyways since plugin doesn't exist
    }

    async readConfig(path) {
        path = `${path}/config.json`;
        return FileUtils.readJsonFromFile(path);
    }

}

const _instance = new PluginManager();

async function pluginManager(pluginName) {

    try {
        //Load test plugin
        const plugin = await _instance.loadPlugin(pluginName);
        //Attempt to load the same plugin again
        const plugin2 = await _instance.loadPlugin(pluginName);

        return true;
    } catch (err) {
        console.log(`Failed to load plugin! ${err.message}`);
    }

    try {
        //Reload test plugin
        const reloadedPlugin = await _instance.reloadPlugin('Example Plugin');
    } catch (err) {
        console.log(`Failed to reload plugin! ${err.message}`);
    }
}

if (window.bdTests) window.bdTests.pluginManager = pluginManager;
else window.bdTests = { pluginManager };

module.exports = { PluginManager: _instance }