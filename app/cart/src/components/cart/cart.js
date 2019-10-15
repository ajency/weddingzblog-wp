import React, { Component } from 'react';
import './cart.scss'
import Header from '../header/header.js';
import Item from '../item/item.js';
import CartSummary from '../cart-summary/cart-summary.js';
import DeliveryAddress from '../delivery-address/delevery-address.js';
import axios from 'axios';

class Cart extends Component {
	constructor(props){
		super(props);
		this.state = {
			cartData : {},
			fetchCartComplete : false,
			fetchCartFailed : false,
			fetchCartFailureMsg : '',
			apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			// apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
		}
		this.fetchCart();
	}

	componentDidMount(){
		window.onhashchange = this.locationHashChanged();
	}

	locationHashChanged() {
		if (window.location.hash === '#/cart') { 
			this.fetchCart();
		} 
	}

	getItems(){
		let items = this.state.cartData.cart.items.map((item)=>
			<Item key={item.variant_id} item={item}/>
		);
		return items;
	}
	
	render() {
		let cartContainer;
		if(!this.state.fetchCartComplete)
			cartContainer = <div className="text-center mt-5"> <h4> Loading... </h4>  </div>
		else {
			if(this.state.fetchCartFailed){
				cartContainer = <div className="text-center mt-5"> <h4> {this.state.fetchCartFailureMsg} </h4>  </div>
			}
			else {
				cartContainer = 
					<div>
						<div>
							{this.getItems()}
						</div>
						<div className="apply-coupon-bar">
							<div className="coupon-label">
								Apply Coupon   >
							</div>
						</div>

						<div>
							<label className="cart-summary-label">Bill Details</label>
							<CartSummary summary={this.state.cartData.cart.summary}/>
						</div>

						<div>
							<DeliveryAddress address={this.state.cartData.cart.formatted_address} delivery_time={this.state.cartData.approx_delivery_time}/>
						</div>

						<div>
							<div className="bottom-bar">
								<img alt="100% Secure Payments" title="100% Secure Payments" width="40" src="https://static.kidsuperstore.in/public/img/shield.png"/>
								<div className="genuinity">
									<p className="my-1">100% Secure payments.</p>
								</div>
							</div>
						</div>
						<div>
							<div className="secure-checkout">
								<button className="checkout-btn">Secure Checkout</button>
							</div>
						</div>
					</div>
			}
		}

		return (
			<div className="cart-container">
				<Header/>
				<div className="cart-heading">
					Cart
				</div>
				{cartContainer}
			</div>
		);
	}

	fetchCart() {
		console.log("inside fetch cart");
		let cart_id = this.getCookie('cart_id');
		if(cart_id){
			// let url = "https://demo8558685.mockable.io/get-cart";
			let url = this.state.apiEndPoint + "/anonymous/cart/fetch";
			let body = {
				cart_id : cart_id
			}
			axios.get(url, {params : body})
				.then((res) => {
					console.log("fetch cart response ==>", res);
					this.setState({cartData : res.data, fetchCartComplete : true});
				})
				.catch((error)=>{
					this.setState({fetchCartFailureMsg : error.message,  fetchCartComplete : true})
					console.log("error in fetch cart ==>", error);
				})
		}
	}

	getCookie(cname){
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
}

export default Cart;