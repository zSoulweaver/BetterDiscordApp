'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Utils, FileUtils, BDIpc, Config } = require('./modules');

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
    }

    get fileUtils() {
        return FileUtils;
    }

}

module.exports = {
    BetterDiscord
};