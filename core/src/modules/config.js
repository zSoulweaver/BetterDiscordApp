/**
 * BetterDiscord Config Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

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