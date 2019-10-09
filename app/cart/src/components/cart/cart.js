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
			cart : {},
			cartLoaded : false
		}
		this.fetchCart();
	}

	componentDidMount(){

	}

	getItems(){
		let items = this.state.cart.items.map((item)=>
			<Item key={item.variant_id} item={item}/>
		);
		return items;
	}
	
	render() {
		let cartContainer;
		if(!this.state.cartLoaded)
			cartContainer = <div className="text-center mt-5"> <h4> Loading... </h4>  </div>
		else
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
						<CartSummary summary={this.state.cart.summary}/>
					</div>

					<div>
						<DeliveryAddress address={this.state.cart.delivery_address} delivery_time={this.state.cart.approx_delivery_time}/>
					</div>

					<div>
						<div className="bottom-bar">
							<img alt="100% Secure Payments" className="img-fluid" title="100% Secure Payments" width="40" src="https://static.kidsuperstore.in/public/img/shield.png"/>
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

	fetchCart(){
		console.log("inside fetch cart");
		let url = "https://demo8558685.mockable.io/get-cart";
		axios.get(url)
			.then((res) => {
				console.log("get items response ==>", res);
				this.setState({cart : res.data, cartLoaded : true});
			})
			.catch((error)=>{
				console.log("error in place order ==>", error);
			})
	}
}

export default Cart;