import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from './components/cart/cart.js';

const App = (props) => (
  <Router>
      <Route exact path="/cart" component={Cart} />
  </Router>
)

export default App;
