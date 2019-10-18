import React, { Component } from 'react';
import './item.scss';
// import addToCart from '../../../add-to-cart/add-to-cart.js';
import Quantity from './components/cart_quantity.js';

class Item extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="item-container flex-column mb-2">
				<div className="d-flex">
					<div className="product-image d-inline-block">
						<img alt="french fries" title="french fries" height="50" width="50" src={this.props.item.attributes.images['1x']}/>
					</div>
					<div className="product-details d-inline-block">
						<div className="product-title">
							{this.props.item.attributes.title}
						</div>						
					</div>			
					<div className="price d-inline-block">
						<Quantity quantity={this.props.item.quantity} variant_id={this.props.item.variant_id} removeItem={()=>{this.removeItem()}} updateSummary={(summary) => this.updateSummary(summary)}/>
						₹ {this.props.item.attributes.price_final}
						{this.checkItemDiscount()}
					</div>
				</div>
				<div>
					{this.checkStock()}
				</div>
				<div>
					{this.checkServiceability()}
				</div>
			</div>
		);
	}

	checkItemDiscount(){
		if(this.props.item.attributes.price_final < this.props.item.attributes.price_mrp){
			return <div><small class="gbb-original-price text-muted">₹{this.props.item.attributes.price_mrp}</small> <span class="gbb-discount text-danger">{this.getOffPercentage()}% OFF</span></div>
		}
	}

	getOffPercentage(){
		return Math.round(((this.props.item.attributes.price_mrp - this.props.item.attributes.price_final) / (this.props.item.attributes.price_mrp )) * 100)
	}

	checkStock(){
		if(!this.props.item.availability)
			return <div className="alert-danger">Out of Stock</div>
	}

	checkServiceability(){
		if(!this.props.item.deliverable)
			return <div className="alert-danger">Cannot be delivred at your location</div>
	}

	removeItem(){
		this.props.removeItem(this.props.item.variant_id);
	}

	updateSummary(summary){
		this.props.updateSummary(summary);
	}
}

export default Item;