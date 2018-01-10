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