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
const { BDIpc } = require('./bdipc');
const fs = window.require('fs');

//TODO add these to actual utils
class Utils {

    static async tryParseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (err) {
            throw ({
                'message': 'Failed to parse json',
                err
            });
        }
    }

    static get timestamp() {
        return 'Timestamp';
    }

}

class FileUtils {

    static async fileExists(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (err) return reject({
                    'message': `No such file or directory: ${err.path}`,
                    err
                });

                if (!stats.isFile()) return reject({
                    'message': `Not a file: ${path}`,
                    stats
                });

                resolve();
            });
        });
    }

    static async directoryExists(path) {
        return new Promise(resolve => {
            fs.stat(path, (err, stats) => {
                if (err) return reject({
                    'message': `Directory does not exist: ${path}`,
                    err
                });

                if (!stats.isDirectory()) return reject({
                    'message': `Not a directory: ${path}`,
                    stats
                });

                resolve();
            });
        });
    }

    static async readFile(path) {
        try {
            await this.fileExists(path);
        } catch (err) {
            throw (err);
        }

        return new Promise(resolve => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) reject({
                    'message': `Could not read file: ${path}`,
                    err
                });

                resolve(data);
            });
        });
    }

    static async readJsonFromFile(path) {
        let readFile;
        try {
            readFile = await this.readFile(path);
        } catch (err) {
            throw (err);
        }

        try {
            const parsed = await Utils.tryParseJson(readFile);
            return parsed;
        } catch (err) {
            throw (Object.assign(err, { path }));
        }
    }
}

class PluginManager extends Module {
    
    setInitialState() {
        this.setState({
            plugins: []
        });
        tests();
    }

    get plugins() {
        return this.state.plugins;
    }

    loadPlugin(plugin) {
        const { plugins } = this.state;
        plugins.push(plugin);
        this.setState({
            plugins
        });
    }

    getPluginByName(name) {
        return this.plugins.find(plugin => plugin.name === name);
    }

    getPluginById(id) {
        return this.plugins.find(plugin => plugin.id === id);
    }



    async readConfig(path) {
        path = `${path}/config.json`;
        return FileUtils.readJsonFromFile(path);
    }

}

const _instance = new PluginManager();

async function tests() {

    const config = await BDIpc.send('getConfig');
    const pluginPath = config.paths.find(path => 'plugins' in path).plugins;
    console.log(`Plugin Path: ${pluginPath}`);

    const examplePluginPath = `${pluginPath}/Example`;

    //Test read config
    try {
        const readConfig = await _instance.readConfig(examplePluginPath);
        console.log(readConfig);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { PluginManager: _instance }