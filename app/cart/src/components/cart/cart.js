import React, { Component } from 'react';
import './cart.scss'
import Header from '../header/header.js';
import Item from '../item/item.js';
import CartSummary from '../cart-summary/cart-summary.js';
import DeliveryAddress from '../delivery-address/delevery-address.js';
import axios from 'axios';
 declare var $: any;

class Cart extends Component {
	constructor(props){
		super(props);
		this.state = {
			cartData : {},
			fetchCartComplete : false,
			fetchCartFailed : false,
			fetchCartFailureMsg : '',
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			cartEmpty : false
		}
		this.fetchCart();
	}

	// componentDidMount(){
	// 	// let el = document.querySelector('#view-cart-btn');
	// 	// console.log("component did mount", el);
	// 	// if(el)
	// 	// 	el.addEventListener("click", ()=>{
	// 	// 		console.log("click event fired");
	// 	// 		this.setState({cartData : {}, fetchCartComplete : false, cartEmpty : false})
	// 	// 		this.fetchCart();
	// 	// 	});
	// 	$('#view-cart-btn').on('click', ()=>{
	// 		console.log("click event fired");
	// 		this.setState({cartData : {}, fetchCartComplete : false, cartEmpty : false})
	// 		this.fetchCart();
	//     });
	// }

	getItems(){
		let items = this.state.cartData.cart.items.map((item)=>
			<Item key={item.variant_id} item={item} removeItem={(variant_id) => this.removeItem(variant_id)} updateSummary={(summary) => this.updateSummary(summary)}/>
		);
		return items;
	}
	
	render() {
		let cartContainer;
		if(!this.state.fetchCartComplete)
			cartContainer = <div className="text-center mt-5"> <h4> Loading... </h4>  </div>
		else {
			if(this.state.cartEmpty){
				cartContainer = <div className="text-center mt-5"> <h4> Your cart is Empty. Add something from the menu </h4>  </div>
			}
			else if (this.state.fetchCartFailed){
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
		let cart_id = window.getCookie('cart_id');
		if(true){
			let url = "https://demo8558685.mockable.io/get-cart";
			// let url = this.state.apiEndPoint + "/anonymous/cart/fetch";
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
		else{
			console.log("inside else")
			setTimeout(()=>{
				this.setState({cartEmpty : true, fetchCartComplete : true});
			},100)
		}
	}

	removeItem(variant_id){
		console.log("remove item ==>", variant_id);
		let cart_data = this.state.cartData;
		cart_data.cart.items = cart_data.cart.items.filter(item => item.variant_id != variant_id);
		if(!cart_data.cart.items.length)
			this.setState({cartEmpty : true});
		this.setState({cartData : cart_data});
	}

	updateSummary(summary){
		let cart_data = this.state.cartData;
		cart_data.cart.summary = summary;
		this.setState({cartData : cart_data});
	}
}

export default Cart;