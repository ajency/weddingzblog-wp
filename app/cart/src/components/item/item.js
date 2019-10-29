import React, { Component } from 'react';
import './item.scss';
// import addToCart from '../../../add-to-cart/add-to-cart.js';
import Quantity from './components/cart_quantity.js';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiErrorMsg : ''
		}
	}
	render() {
		return (
			<div className="item-container flex-column mb-2">
				<div className="d-flex">
					<div className="product-cartimage d-inline-block">
						<img class="border-radius-rounded" alt="" title="" height="50" width="50" src={this.props.item.attributes.images['1x']}/>
					</div>
					<div className="product-details d-inline-block">
						<div className="product-title font-weight-light">
							{this.props.item.attributes.title}
						</div>	
						<div className="product-size text-green">
							{this.props.item.attributes.size}
						</div>				
					</div>			
					<div className="product-quantity d-inline-block">
						<Quantity quantity={this.props.item.quantity} variant_id={this.props.item.variant_id} product_id={this.props.item.product_id} removeItem={()=>{this.removeItem()}} updateSummary={(summary) => this.updateSummary(summary)} showApiErrorMsg={(msg) => this.setApiErrorMsg(msg)}/>
						<div className="product-price text-grey font-weight-light">
							₹ {this.props.item.attributes.price_final}
							{this.checkItemDiscount()}
						</div>
					</div>
				</div>
				<div>
					{this.checkServiceability()}
					{this.displayApiErrorMsg()}
				</div>
			</div>
		);
	}

	checkItemDiscount(){
		if(this.props.item.attributes.price_final < this.props.item.attributes.price_mrp){
			return <div><span class="gbb-original-price text-muted">₹{this.props.item.attributes.price_mrp}</span> <span class="gbb-discount text-danger">{this.getOffPercentage()}% OFF</span></div>
		}
	}

	getOffPercentage(){
		return Math.round(((this.props.item.attributes.price_mrp - this.props.item.attributes.price_final) / (this.props.item.attributes.price_mrp )) * 100)
	}

	checkServiceability(){
		if(!this.props.item.deliverable)
			return <div className="alert-danger">Cannot be delivred at your location</div>
		if(!this.props.item.availability)
			return <div className="alert-danger">Quantity not available</div>
	}

	displayApiErrorMsg(){
		if(this.state.apiErrorMsg){
			return <div className="alert-danger">{this.state.apiErrorMsg}</div>
		}
	}

	removeItem(){
		this.props.removeItem(this.props.item.variant_id);
	}

	setApiErrorMsg(msg){
		this.setState({apiErrorMsg : msg});
		setTimeout(()=>{
			this.setState({apiErrorMsg : ''});
		},3000)
	}

	updateSummary(summary){
		this.props.updateSummary(summary);
	}
}

export default Item;