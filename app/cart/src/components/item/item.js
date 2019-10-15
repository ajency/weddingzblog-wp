import React, { Component } from 'react';
import './item.scss';

class Item extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="item-container flex-column">
				<div className="d-flex">
					<div className="product-image">
						<img alt="french fries" title="french fries" height="70" width="50" src={this.props.item.attributes.images['1x']}/>
					</div>
					<div className="flex-fill">
						<div className="product-title">
							{this.props.item.attributes.title}
						</div>
						<div>
							<div className="quantity">
								<button>-</button>
									{this.props.item.quantity}
								<button>+</button>
							</div>
							<div className="price">
								₹ {this.props.item.attributes.price_final}
							</div>
						</div>
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

	checkStock(){
		if(!this.props.item.availability)
			return <div className="alert-danger">Out of Stock</div>
	}

	checkServiceability(){
		if(!this.props.item.deliverable)
			return <div className="alert-danger">Cannot be delivred at your location</div>
	}
}

export default Item;