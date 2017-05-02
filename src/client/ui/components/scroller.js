/**
 * BetterDiscord Scroller Component
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
 */

'use strict';

const { React } = require('../../vendor');
import { Component } from 'React';

class CScroller extends Component {

    constructor(props) {
        super(props);
    }

    render() {
		let wrapperClass = `scroller-wrap${this.props.fade ? ' fade' : ''} ${this.props.dark ? ' dark' : ''}`;
		let { children } = this.props;
		return (
			<div className={wrapperClass}>
				<div ref="scroller" className="scroller">
					{children}
				</div>
			</div>
		);
    }

}

export default CScroller;