'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * BetterDiscord Utils Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const path = require('path'),
      fs = require('fs');

const { Module } = require('./modulebase');

class Utils {

    static tryParseJson(jsonString) {
        return _asyncToGenerator(function* () {
            try {
                return JSON.parse(jsonString);
            } catch (err) {
                throw {
                    'message': 'Failed to parse json',
                    err
                };
            }
        })();
    }

    static get timestamp() {
        return 'Timestamp';
    }

}

class FileUtils {

    static fileExists(path) {
        return _asyncToGenerator(function* () {
            return new Promise(function (resolve, reject) {
                fs.stat(path, function (err, stats) {
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
        })();
    }

    static directoryExists(path) {
        return _asyncToGenerator(function* () {
            return new Promise(function (resolve) {
                fs.stat(path, function (err, stats) {
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
        })();
    }

    static readFile(path) {
        var _this = this;

        return _asyncToGenerator(function* () {
            try {
                yield _this.fileExists(path);
            } catch (err) {
                throw err;
            }

            return new Promise(function (resolve) {
                fs.readFile(path, 'utf-8', function (err, data) {
                    if (err) reject({
                        'message': `Could not read file: ${path}`,
                        err
                    });

                    resolve(data);
                });
            });
        })();
    }

    static readJsonFromFile(path) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            let readFile;
            try {
                readFile = yield _this2.readFile(path);
            } catch (err) {
                throw err;
            }

            try {
                const parsed = yield Utils.tryParseJson(readFile);
                return parsed;
            } catch (err) {
                throw Object.assign(err, { path });
            }
        })();
    }
}

class WindowUtils extends Module {

    bindings() {
        this.openDevTools = this.openDevTools.bind(this);
        this.executeJavascript = this.executeJavascript.bind(this);
        this.injectScript = this.injectScript.bind(this);
    }

    get window() {
        return this.state.window;
    }

    get webContents() {
        return this.window.webContents;
    }

    openDevTools() {
        this.webContents.openDevTools();
    }

    executeJavascript(script) {
        this.webContents.executeJavaScript(script);
    }

    injectScript(fpath, variable) {
        console.log(`Injecting: ${fpath}`);
        if (variable) this.executeJavascript(`${variable} = require("${fpath}");`);else this.executeJavascript(`require("${fpath}");`);
    }

    events(event, callback) {
        this.webContents.on(event, callback);
    }

    send(channel, message) {
        channel = channel.startsWith('bd-') ? channel : `bd-${channel}`;
        this.webContents.send(channel, message);
    }

}

module.exports = {
    Utils,
    FileUtils,
    WindowUtils
};