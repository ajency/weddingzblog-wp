'use strict';
const e = React.createElement;

const divStyle = {
	display : 'flex',
	'justify-content': 'space-between',
	'background' : '#A3DE9A'
}

const btnStyle = {
	cursor : 'pointer'
}

class viewCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			cart : null,
		};
	}

	componentDidMount(){
		this.fetchCart();
	}

	render() {
		if(this.state.cart){
			return (
				<div style={divStyle}>
					<div>
						{this.state.cart.cart_count} {this.state.cart.cart_count > 1 ? 'Items' : 'Item'}
					</div>
					<div>
						₹ {this.state.cart.summary.you_pay}
					</div>
					<div style={btnStyle} onClick={() => this.loadCart()}>
						VIEW CART
					</div>
				</div>
			);
		}
		else
			return (<div> </div>);
	}

	loadCart() {
		let url = window.location.href.split("#")[0] + '#/cart';
        window.location = url;
	}

	fetchCart() {
		console.log("inside fetch cart");
		let cart_id = this.getCookie('cart_id');
		if(cart_id){
			let url = this.state.apiEndPoint + "/anonymous/cart/fetch";
			let body = {
				cart_id : cart_id
			}
			axios.get(url, {params : body})
				.then((res) => {
					console.log("fetch cart response ==>", res);
					this.setState({cart : res.data.cart})
				})
				.catch((error)=>{
					console.log("error in fetch cart ==>", error);
				})
		}
	}

	getCookie(cname){
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
}

// Find all DOM containers, and render add-to-cart buttons into them.
let domContainer = document.querySelector('#react-view-cart-container');
const ViewCartComponent = ReactDOM.render(e(viewCart), domContainer);


window.updateViewCartCompoent = (cartValue) => {
	console.log("inside updateViewCartCompoent", cartValue);
	ViewCartComponent.setState({cart : cartValue})
}
