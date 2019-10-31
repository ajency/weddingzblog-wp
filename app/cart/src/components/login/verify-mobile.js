import React, { Component } from 'react';
import Header from '../header/header.js';
import './verify-mobile.scss'

class VerifyMobile extends Component {
    constructor(props) {
        super(props);       
    }

    render() {
        return (
            <div className="address-container visible">
                <Header/>
               <h2>VERIFY MOBILE </h2>
            </div>
        );
    }

}

export default VerifyMobile;