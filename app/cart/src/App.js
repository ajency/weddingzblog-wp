import React, { Component } from 'react';
import './App.css';
import './assets/scss/main.scss';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from './components/cart/cart.js';
import AddNewAddress from './components/add-new-addess/add-new-address';
import AddressList from './components/address-list/address-list';

class App extends Component {
  render() {
    return (
      <div>
         <Cart/>
        {/*  <AddNewAddress latlng={{lat:15.487590683051524,lng:73.83213189817026}} address={"Panjim Convention Centre, Panjim goa"}/> /*}
        {/* <AddressList/> */}
      </div>
    );
  }
}

export default App;
