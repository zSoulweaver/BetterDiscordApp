'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    clietScriptPath: "G:/Github/JsSucks/BetterDiscordApp/client/dist/betterdiscord.client.js"
};

const { Utils, FileUtils, BDIpc, Config, WindowUtils } = require('./modules');
const { BrowserWindow } = require('electron');

const Common = {};

const dummyArgs = {
    'version': '0.3.1',
    'paths': [{ 'base': 'basePath' }, { 'plugins': 'pluginsPath' }, { 'themes': 'themesPath' }]
};

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

    readFile(o, json) {
        return _asyncToGenerator(function* () {
            const { path } = o.args;
            try {
                const readFile = json ? yield FileUtils.readJsonFromFile(path) : yield FileUtils.readFile(path);
                o.reply(readFile);
            } catch (err) {
                o.reply(err);
            }
        })();
    }

}

class BetterDiscord {

    constructor(args) {
        Common.Config = new Config(args || dummyArgs);
        this.comms = new Comms();
        this.init();
    }

    init() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const window = yield _this.waitForWindow();
            _this.windowUtils = new WindowUtils({ window });

            _this.windowUtils.webContents.on('did-finish-load', function (e) {
                if (__DEV) {
                    _this.windowUtils.injectScript(__DEV.clietScriptPath);
                }
            });

            setTimeout(function () {
                if (__DEV) {
                    _this.windowUtils.injectScript(__DEV.clietScriptPath);
                }
            }, 500);
        })();
    }

    waitForWindow() {
        return _asyncToGenerator(function* () {
            return new Promise(function (resolve, reject) {
                const defer = setInterval(function () {
                    const windows = BrowserWindow.getAllWindows();
                    if (__DEV && __DEV.TESTING && windows.length > 0) {
                        resolve(windows[0]);
                        clearInterval(defer);
                        return;
                    }
                    //TODO Check for Discord loading finished
                    if (windows.length === 1 && windows[0].webContents.getURL().includes("discordapp.com")) {
                        resolve(windows[0]);
                        clearInterval(defer);
                    }
                    //resolve(windows[0]);
                    //clearInterval(defer);
                }, 100);
            });
        })();
    }

    get fileUtils() {
        return FileUtils;
    }

}

module.exports = {
    BetterDiscord
};