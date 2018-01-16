/**
 * BetterDiscord Client Utils Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const { Module } = require('./modulebase');
const moment = require('moment');

const logs = [];

class Logger {

    static log(module, message, level = 'log') {
        level = this.parseLevel(level);
        console[level]('[%cBetter%cDiscord:%s] %s', 'color: #3E82E5', '', `${module}${level === 'debug' ? '|DBG' : ''}`, message);
        logs.push(`[${moment().format('DD/MM/YY hh:mm:ss')}|${module}|${level}] ${message}`);
        window.bdlogs = logs;
    }

    static get levels() {
        return {
            'log': 'log',
            'warn': 'warn',
            'err': 'error',
            'error': 'error',
            'debug': 'debug',
            'dbg': 'debug',
            'info': 'info'
        };
    }

    static parseLevel(level) {
        return this.levels.hasOwnProperty(level) ? this.levels[level] : 'log';
    }
}

class Utils {

    static overload(fn, cb) {
        const orig = fn;
        return function(...args) {
            orig(...args);
            cb(...args);
        }
    }

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


module.exports = { Logger, Utils, FileUtils }