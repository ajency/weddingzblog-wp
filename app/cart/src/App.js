import React, { Component } from 'react';
import './App.css';
import './assets/scss/main.scss';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from './components/cart/cart.js';

class App extends Component {
  render() {
    return (
      <div>
          <Cart/> 
      </div>
    );
  }
}

export default App;
