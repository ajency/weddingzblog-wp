import React, { Component } from 'react';
import './delivery-address.scss';
import editImage from '../../assets/images/Edit.png';

class DeliveryAddress extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="delivery-address-container">
				<div className="address-details border-green-2 border-radius-0 position-relative p-2">
					<div className="address-details-inner font-weight-light">
						<span className="text-green font-weight-semibold">Deliver to</span> 
						<span id="cart-delivery-address"> {this.props.address} </span>
					</div>
					<div className="btn-edit" onClick={() => this.openChangeLocationModal()}>
						<img src={editImage} className="app-log" alt="Edit address" title="Edit address"/>
					</div>
				</div>
			</div>
		);
	}

	openChangeLocationModal(){
		console.log("openChangeLocationModal");
		 window.showGpsModalPrompt(true);
	}
}

export default DeliveryAddress;