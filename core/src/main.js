/**
 * BetterDiscord Core Entry
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/


/**
 * DEVELOPMENT VARIABLES
 */
const __DEV = {
    TESTING: false,
    clientScriptPath: 'G:/Github/JsSucks/BetterDiscordApp/client/dist/betterdiscord.client.js'
}

const path = require('path');

const __pluginPath = path.resolve(__dirname, '..', '..', 'tests', 'plugins');
const __themePath = path.resolve(__dirname, '..', '..', 'tests', 'themes');

const { Utils, FileUtils, BDIpc, Config, WindowUtils } = require('./modules');
const { BrowserWindow } = require('electron');

const Common = {};

const dummyArgs = {
    'version': '0.3.1',
    'paths': [
        { 'base': 'basePath' },
        { 'plugins': __pluginPath },
        { 'themes': __themePath }
    ]
};

console.log(dummyArgs);


class Comms {

    constructor() {
        this.initListeners();
    }

    initListeners() {
        BDIpc.on('bd-getConfig', o => {
            o.reply(Common.Config.config);
        });

        BDIpc.on('bd-readFile', this.readFile);
        BDIpc.on('bd-readJson', o => this.readFile(o, true));
    }

    async readFile(o, json) {
        const { path } = o.args;
        try {
            const readFile = json ? await FileUtils.readJsonFromFile(path) : await FileUtils.readFile(path);
            o.reply(readFile);
        } catch (err) {
            o.reply(err);
        }
    }

}

class BetterDiscord {

    constructor(args) {
        this.injectScripts = this.injectScripts.bind(this);
        Common.Config = new Config(args || dummyArgs);
        this.comms = new Comms();
        this.init();
        console.log("PLUGINS PATH:");
        console.log(dummyArgs.paths.plugins);
    }

    async init() {
        const window = await this.waitForWindow();
        this.windowUtils = new WindowUtils({ window });

        this.windowUtils.webContents.on('did-finish-load', e => this.injectScripts(true));

        setTimeout(() => {
            if (__DEV) {
                this.injectScripts();
            }
        }, 500);
    }

    async waitForWindow() {
        return new Promise((resolve, reject) => {
            const defer = setInterval(() => {
                const windows = BrowserWindow.getAllWindows();
                if (__DEV && __DEV.TESTING && windows.length > 0) {
                    resolve(windows[0]);
                    clearInterval(defer);
                    return;
                }

                if (windows.length === 1 && windows[0].webContents.getURL().includes("discordapp.com")) {
                    resolve(windows[0]);
                    clearInterval(defer);
                }
            }, 100);
        });
    }

    injectScripts(reload = false) {
        if (__DEV) {
            this.windowUtils.injectScript(__DEV.clientScriptPath);
        }
    }

    get fileUtils() { return FileUtils; }

}

module.exports = {
    BetterDiscord
}