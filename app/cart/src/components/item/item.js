import React, { Component } from 'react';
import './item.scss';

class Item extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="item-container">
				<div className="product-image">
					<img alt="french fries" title="french fries" height="70" width="50" src={this.props.item.attributes.images['1x']}/>
				</div>
				<div className="">
					<div className="product-title">
						{this.props.item.attributes.title}
					</div>
					<div className="quantity">
						<button>-</button>
							{this.props.item.quantity}
						<button>+</button>
					</div>
					<div className="price">
						₹ {this.props.item.attributes.price_final}
					</div>
				</div>
				<div>
					<i className="material-icons">delete</i>
				</div>
			</div>
		);
	}
}

export default Item;