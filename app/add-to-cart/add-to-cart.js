'use strict';

const e = React.createElement;

class addToCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			apiCallInProgress : false,
			quantity : 0
		};
	}

	render() {
		return (
			<div>
				{this.getButtonContent()}
			</div>
		);
	}

	getButtonContent(){
		if(this.state.apiCallInProgress){
			return (<div class="btn-icon">
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
					</div>);

		}
		if(this.state.quantity == 0)
			return (<button className="btn-primary" style={btnStyle} onClick={() => this.addToCart()} disabled={this.state.apiCallInProgress}>ADD</button>)

		return (
			<div>
				<button className="btn-primary" style={btnStyle} onClick={() => this.removeFromCart()} disabled={this.state.apiCallInProgress}>-</button>
				<span className="m-1">	{this.state.quantity} </span>
				<button className="btn-primary" style={btnStyle} onClick={() => this.addToCart()} disabled={this.state.apiCallInProgress}>+</button>
			</div>
		)		
	}

	addToCart() {
		this.setState({apiCallInProgress : true});
		let cart_id = window.getCookie('cart_id');
		if(cart_id){
			this.addToCartApiCall(null, cart_id);
		}
		else if(window.lat_lng){
			this.addToCartApiCall(window.lat_lng, null, window.formatted_address);
		}
		else{
			this.getGeolocation().then((res)=>{
				this.addToCartApiCall(window.lat_lng, null, window.formatted_address);
			})
			.catch((error) => {
				this.setState({apiCallInProgress : false});
				console.log("error ==>", error);
				this.displayError(error);
			});
		}
	}

	removeFromCart(){
		this.setState({apiCallInProgress : true});
		let url = this.state.apiEndPoint + "/anonymous/cart/delete";
		// let url = "https://demo8558685.mockable.io/remove-from-cart";
		let body = {
			variant_id 	: this.props.variant_id,
			quantity 	: 1,
			cart_id 	: window.getCookie('cart_id')
		}

		axios.post(url, body)
		.then((res) => {
			console.log("add to cart response ==>", res);
			if(res.data.success){
				let quantity = this.state.quantity - 1;
				this.setState({quantity : quantity})
				window.updateViewCartCompoent(res.data);
			}
			else{
				this.displayError(res.data.message);
			}
			this.setState({apiCallInProgress : false});
		})
		.catch((error)=>{
			console.log("error in add to cart ==>", error);
			this.setState({apiCallInProgress : false});
			let msg = error && error.message ? error.message : error;
			this.displayError(msg);
		})
	}

	addToCartApiCall(lat_long = null, cart_id = null, formatted_address = null){
		console.log("inside add to cart ", lat_long, cart_id);
		let url = this.state.apiEndPoint + "/anonymous/cart/insert";
		let body = {
			variant_id : this.props.variant_id,
			quantity : 1,
			lat_long : lat_long,
			formatted_address : formatted_address
		}
		if(cart_id)
			body.cart_id = cart_id;

		console.log("body ==>", body);

		axios.post(url, body)
		.then((res) => {
			console.log("add to cart response ==>", res);
			if(res.data.success){
				let quantity = this.state.quantity + res.data.item.quantity;
				this.setState({quantity : quantity})
				window.updateViewCartCompoent(res.data);
				if(!cart_id && res.data.cart_id)
					document.cookie = "cart_id=" + res.data.cart_id + ";path=/";
			}
			else{
				this.displayError(res.data.message);
			}
			this.setState({apiCallInProgress : false});
		})
		.catch((error)=>{
			console.log("error in add to cart ==>", error);
			this.setState({apiCallInProgress : false});
			let msg = error && error.message ? error.message : error;
			this.displayError(msg);
		})
	}

	displayError(msg){
		document.querySelector('#failure-toast').innerHTML = msg;
		document.querySelector('#failure-toast').classList.remove('d-none');
		setTimeout(()=>{
			document.querySelector('#failure-toast').classList.add('d-none');
		},3000)
	}

	getGeolocation(){
		return new Promise((resolve, reject) => {
		    window.updategpsModalPromptComponent(true);
		    let timer = setInterval(()=>{
		    	if(window.lat_lng){
		    		clearInterval(timer);
		    		resolve();
		    	}
		    	if(window.modal_closed){
		    		clearInterval(timer);
		    		window.modal_closed = false;
		    		reject("Please select location to add to cart");
		    	}
		    },500)
		});
	}
}

let addToCartComponents = []
// Find all DOM containers, and render add-to-cart buttons into them.
document.querySelectorAll('.react-add-to-cart-container')
	.forEach((domContainer, index) => {
		console.log(index);
		const variant_id = domContainer.dataset.variant_id;
		addToCartComponents[index] =  ReactDOM.render(e(addToCart, { variant_id: variant_id }),domContainer);
	});

window.updateaddToCartComponent = (item) => {
	addToCartComponents.forEach((component) =>{
		if(component.props.variant_id == item.variant_id){
			component.setState({quantity : item.quantity})
		}
	})
}

window.updateItemQuantity = (item) => {
	addToCartComponents.forEach((component) =>{
		if(component.props.variant_id == item.variant_id){
			const updated_quantity = component.state.quantity + item.quantity
			console.log("updated quantity =>", updated_quantity,item, component.state.quantity);
			component.setState({quantity : updated_quantity})
		}
	})
}
