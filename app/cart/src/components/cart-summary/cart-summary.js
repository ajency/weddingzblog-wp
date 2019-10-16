import React, { Component } from 'react';
import './cart-summary.scss';

class CartSummary extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="cart-summary-container">
				<div className="summary-item">
					<div><label className="text-muted f-w-4 m-0">Total Item Price</label></div>
					<div> ₹ {this.props.summary.sale_price_total} </div>
				</div>

				{this.getCouponDiscount()}

				{this.getShippingFee()}
				
				<div className="summary-item">
					<div><label className="text-muted f-w-4 m-0">To Pay</label></div>
					<div> ₹ {this.props.summary.you_pay}</div>
				</div>	
			</div>
		);
	}

	getCouponDiscount(){
		if(this.props.summary.cart_discount)
			return <div className="summary-item">
						<div><label className="text-muted f-w-4 m-0">Coupon Discount</label></div>
						<div className="text-success">-₹ {this.props.summary.cart_discount}</div>
					</div>
	}

	getShippingFee(){
		if(this.props.summary.shipping_fee)
			return <div className="summary-item">
						<div><label className="text-muted f-w-4 m-0">Delivery fee</label></div>
						<div> ₹ {this.props.summary.shipping_fee}</div>
					</div>	
	}
}

export default CartSummary;