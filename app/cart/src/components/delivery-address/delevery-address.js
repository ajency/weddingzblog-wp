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
					<div>
						Change
					</div>
				</div>
				<div className="address-details">
					<label>
						{this.props.address.address}
					</label>
					<label className="delivery-time">
						{this.props.delivery_time}
					</label>
				</div>
			</div>
		);
	}
}

export default DeliveryAddress;