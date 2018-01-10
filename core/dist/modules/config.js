'use strict';

class Config {

    constructor(args) {
        this.args = args;
    }

    get version() {
        return this.args.version;
    }

    get paths() {
        return this.args.paths;
    }

    get config() {
        return {
            'version': this.version,
            'paths': this.paths
        };
    }

}

module.exports = { Config };