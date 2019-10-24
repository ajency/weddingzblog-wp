import React, { Component } from 'react';
import './cart.scss'
import Header from '../header/header.js';
import Item from '../item/item.js';
import CartSummary from '../cart-summary/cart-summary.js';
import DeliveryAddress from '../delivery-address/delevery-address.js';
import add from '../../assets/images/add.png';
import genuinityLogo from '../../assets/images/Genuien.png';
import clockLogo from '../../assets/images/Time.png';
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

	componentDidMount(){
		// let el = document.querySelector('#view-cart-btn');
		// console.log("component did mount", el);
		// if(el)
		// 	el.addEventListener("click", ()=>{
		// 		console.log("click event fired");
		// 		this.setState({cartData : {}, fetchCartComplete : false, cartEmpty : false})
		// 		this.fetchCart();
		// 	});
		$('#view-cart-btn').on('click', ()=>{
			console.log("click event fired");
			this.setState({cartData : {}, fetchCartComplete : false, cartEmpty : false})
			this.fetchCart();
	    });
	}

	getItems(){
		let items = this.state.cartData.cart.items.map((item)=>
			<Item key={item.variant_id} item={item} removeItem={(variant_id) => this.removeItem(variant_id)} updateSummary={(summary) => this.updateSummary(summary)}/>
		);
		return items;
	}
	
	render() {
		let cartContainer;
		if(!this.state.fetchCartComplete)
			cartContainer = <div className="text-center mt-5 p-15"> <h4 className="font-weight-meidum m-0"> Loading... </h4>  </div>
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
							<DeliveryAddress address={this.state.cartData.cart.formatted_address} delivery_time={this.state.cartData.approx_delivery_time}/>
						</div>

						<div className="p-15 pt-0">
							<h4 className="mt-0 text-grey font-weight-medium">Order</h4>
							{this.getItems()}
						</div>

						<div className="p-15 pt-0 d-flex">
							<div className="w-50 font-weight-medium">
								Estimated Time:
							</div>
							<div className="w-50 text-align-right font-weight-medium">
								<img src={clockLogo} alt="Estimated time" title="Estimated time" className="d-inline-block vertical-align-middle mr-1"/> 
								<span className="d-inline-block vertical-align-middle">30 mins</span>
							</div>
						</div>

						{/* <div className="apply-coupon-bar">
							<div className="coupon-label">
								Apply Coupon   >
							</div>
						</div> */}

						<div className="p-15 pt-0 ">
							<label className="cart-summary-label font-weight-medium">Bill Details</label>
							<CartSummary summary={this.state.cartData.cart.summary}/>
						</div>						

						<div className="p-15 pt-0 ">
							<div className="bottom-bar">								
								<div className="genuinity text-align-center">
									<img src={genuinityLogo} className="mr-1" alt="100% Secure Payments" title="100% Secure Payments" className="d-inline-block vertical-align-middle" width="20"/>
									<span className="d-inline-block vertical-align-middle ml-1 text-grey">Genuine products. 100% Secure payments.</span>
								</div>
							</div>
						</div>

						<div className="p-15 pt-0 pb-0">
							<div className="secure-checkout fixed-bottom visible">
								<button className="btn btn-primary btn-checkout font-weight-medium w-100">Proceed to Checkout</button>
							</div>
						</div>
					</div>
			}
		}

		return (
			<div className="cart-container visible">
				<Header/>
				<div className="cart-heading d-flex">
					<span className="cart-title w-50">Cart</span>
					<span className="add-to-cart w-50 text-align-right text-green" onClick={()=> this.closeCart()}>
						<img src={add} className="app-log" alt="Add item" title="Add item" />Add item
					</span>
				</div>
				{cartContainer}
			</div>
		);
	}

	closeCart(){
		document.querySelector(".cart-wrapper").classList.remove('active');
		let url = window.location.href.split("#")[0];
		window.history.replaceState({cart : false}, 'cart', url);
	}

	fetchCart() {
		console.log("inside fetch cart");
		let cart_id = window.getCookie('cart_id');
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