/**
 * BetterDiscord Client WebpackModules Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const KnownModules = {
    'React': ('createElement', 'cloneElement'),
    'react-dom': ('render', 'findDOMNode')
};

const Cache = {};

class WebpackModules {

    static getModuleByNameSync(name, first, fallback) {
        //TODO return not first from cache?
        if (Cache.hasOwnProperty(name)) return Cache[name];
        if (KnownModules.hasOwnProperty(name)) fallback = KnownModules[name];
        if (!fallback) return null;
        return Cache[name] = this.getModuleByPropsSync(fallback, first);
    }

    static getModuleByPropsSync(props, first) {
        const modules = this.getAllModulesSync();
        const rm = [];
        for (let index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const { exports } = module;

            if (!exports || typeof exports !== 'object') continue;
            if (!(props in exports)) continue;
            rm.push(module);
        }
        return first ? rm[0].exports : rm;
    }

    static async getModuleByName(name, first, fallback) {
        if (Cache.hasOwnProperty(name)) return Cache[name];
        if (KnownModules.hasOwnProperty(name)) fallback = KnownModules[name];
        if (!fallback) return null;
        return Cache[name] = await this.getModuleByProps(fallback, first);
    }

    static async getModuleByProps(props, first) {
        const modules = await this.getAllModules();

        const rm = [];
        for (let index in modules) {
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const { exports } = module;

            if (!exports || typeof exports !== 'object') continue;
            if (!(props in exports)) continue;
            rm.push(module);
        }
        return first ? rm[0].exports : rm;
    }

    /*This will most likely not work for most modules*/
   /* static async getModuleByName(name) {
        const modules = await this.getAllModules();
        return new Promise((resolve, reject) => {
            for (let index in modules) {
                if (!modules.hasOwnProperty(index)) continue;
                const module = modules[index];
                const { exports } = module;
                if (!exports) continue;

                if (typeof exports === 'object' && (name in exports || exports.name === name)) {
                    resolve(module.exports);
                    break;
                } else if (typeof exports === 'function' && exports.name === name) {
                    resolve(module.exports);
                    break;
                }
            }

            reject(null);
        });
    }*/

    static getAllModulesSync() {
        const id = 'bd-webpackmodulessync';
        const __webpack_require__ = window['webpackJsonp'](
            [],
            {
                [id]: (module, exports, __webpack_require__) => exports.default = __webpack_require__
            },
            [id]).default;
        delete __webpack_require__.m[id];
        delete __webpack_require__.c[id];
        return __webpack_require__.c;
    }

    static async getAllModules() {
        return new Promise(resolve => {
            const id = 'bd-webpackmodules';
            window['webpackJsonp'](
                [],
                {
                    [id]: (module, exports, __webpack_require__) => {
                        delete __webpack_require__.c[id];
                        delete __webpack_require__.m[id];
                        resolve(__webpack_require__.c);
                    }
                },
                [id]
            );
        });
    }

}

module.exports = { WebpackModules };