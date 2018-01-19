/**
 * BetterDiscord Client UI Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

const $ = require('jquery');
const Vue = require('vue');

const BdButton = (require('./components/bdbutton.vue')).default;
class UI {

    constructor() {
        $('body').append($('<div/>', {
            class: 'bd-settingsbutton',
            id: 'bd-settingsbutton'
        }));

         this.vueInstance = new Vue.default({
             el: '#bd-settingsbutton',
             template: '<BdButton/>',
             components: { BdButton }
         });
    }

}


module.exports = { UI }