/**
 * BetterDiscord Core Entry
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Utils, FileUtils, BDIpc, Config } = require('./modules');

const Common = {};

const dummyArgs = {
    'version': '0.3.1',
    'paths': [
        { 'base': 'basePath' },
        { 'plugins': 'pluginsPath' },
        { 'themes': 'themesPath' }
    ]
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
        Common.Config = new Config(args || dummyArgs);
        this.comms = new Comms();
    }

    get fileUtils() { return FileUtils; }

}

module.exports = {
    BetterDiscord
}