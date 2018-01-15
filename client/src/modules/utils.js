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
    
}

module.exports = { Logger, Utils }