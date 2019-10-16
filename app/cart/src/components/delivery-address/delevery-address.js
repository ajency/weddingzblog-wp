import React, { Component } from 'react';
import './delivery-address.scss';

class DeliveryAddress extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="delivery-address-container">
				<div className="address-heading">
					<div>
						Deliver To Address
					</div>
					<div className="btn btn-dark" onClick={() => this.openChangeLocationModal()}>
						Change
					</div>
				</div>
				<div className="address-details pt-3">
					<label id="cart-delivery-address">
						{this.props.address}
					</label>
					<label className="delivery-time">
						{this.props.delivery_time}
					</label>
				</div>
			</div>
		);
	}

	openChangeLocationModal(){
		console.log("openChangeLocationModal");
		 window.updategpsModalPromptComponent(true);
	}
}

export default DeliveryAddress;