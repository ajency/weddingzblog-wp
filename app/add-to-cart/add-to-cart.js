'use strict';

const e = React.createElement;

class addToCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			addToCartInProgress : false
		};
	}

	render() {
		return (
			<button className="btn-primary" style={btnStyle} onClick={() => this.addToCart()} disabled={this.state.addToCartInProgress}>
				{this.getButtonContent()}
			</button>
		);
	}

	getButtonContent(){
		if(this.state.addToCartInProgress){
			return (<div class="btn-icon">
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
					</div>);

		}
		return (<span>
					ADD	
				</span>)
	}

	addToCart() {
		this.setState({addToCartInProgress : true});
		let cart_id = this.getCookie('cart_id');
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
				this.setState({addToCartInProgress : false});
				console.log("error ==>", error);
				this.displayError(error);
			});
		}
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
				window.updateViewCartCompoent(res.data);
				if(!cart_id && res.data.cart_id)
					document.cookie = "cart_id=" + res.data.cart_id + ";path=/";
			}
			else{
				this.displayError(res.data.message);
			}
			this.setState({addToCartInProgress : false});
		})
		.catch((error)=>{
			console.log("error in add to cart ==>", error);
			this.setState({addToCartInProgress : false});
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
document.querySelectorAll('.react-add-to-cart-container')
	.forEach(domContainer => {
		const variant_id = domContainer.dataset.variant_id;
		ReactDOM.render(
			e(addToCart, { variant_id: variant_id }),
			domContainer
		);
	});
