import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<div className="app-name">
					<label className="app-title">Green Grain Bowl</label>
				</div>
				<div>
					Secure Checkout
				</div>
			</div>
		);
	}
}

export default Header;