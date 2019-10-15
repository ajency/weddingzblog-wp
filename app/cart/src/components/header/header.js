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
				<div class="ml-auto align-self-center">
					<h3 class="m-0 text-white btn-pay" onClick={() => this.closeCart()}><span aria-hidden="true">&times;</span></h3>
				</div>
			</div>
		);
	}

	closeCart(){
		document.querySelector(".cart-wrapper").classList.remove('active');
		let url = window.location.href.split("#")[0];
		window.history.replaceState({cart : false}, 'cart', url);
	}
}

export default Header;