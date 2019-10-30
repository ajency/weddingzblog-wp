import React, { Component } from 'react';
import Header from '../header/header.js';
import './address-list.scss'

class AddressList extends Component {
    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <div className="address-container visible">
                <Header/>
                <div className="cart-heading p-15 pb-0">
                    <h3 className="mt-4 h1 ft6">Choose Delivery Address</h3>
                </div>
                <div className="address-list p-15 pt-0 mt-4">
                    <div className="items mb-5">
                        <div className="text-black text-link highlight">
                            <h1 className="ft6">Office</h1>
                            <h5 className="font-weight-light">
                                <span className="p-name d-inline-block">Dhiraj Dessai</span> <span className="p-phone-number d-inline-block">9823353495</span>
                            </h5>
                            <h5 className="font-weight-light">
                                Panjim Convention Center, Vistar Estates, Mala, Rua de Ourém, Neugi Nagar, Panaji, Goa 403001
                            </h5>
                        </div>
                    </div>
                    <div className="items mb-5">
                        <div className="text-black text-link highlight">
                            <h1 className="ft6">Home</h1>
                            <h5 className="font-weight-light">
                                <span className="p-name d-inline-block">Dhiraj Dessai</span> <span className="p-phone-number d-inline-block">9823353495</span>
                            </h5>
                            <h5 className="font-weight-light">
                                Roland Apartment, Cabesa Ward, St. Cruz, Panaji, Goa 403005
                            </h5>
                        </div>
                    </div>
                    <div className="items mb-5">
                        <div className="text-black text-link highlight">
                            <h1 className="ft6">Dad's office</h1>
                            <h5 className="font-weight-light">
                                <span className="p-name d-inline-block">Dhiraj Dessai</span> <span className="p-phone-number d-inline-block">9823353495</span>
                            </h5>
                            <h5 className="font-weight-light">
                                H. no. 1059/1, Bansai junction, Curchorem, Cacora, Goa 
                            </h5>
                        </div>
                    </div>                    
                    <div className="post-content pb-5"> 
                        <div className="next-title m-0">Add new address <i className="fas fa-arrow-right text-green"></i></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AddressList;