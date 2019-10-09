'use strict';

const e = React.createElement;

class addToCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			added: false,
			apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1'
		};
	}

	render() {
		if (this.state.added) {
			return 'Remove';
		}

		return (
			<button style={btnStyle} onClick={() => this.addToCart()}>
				ADD
			</button>
		);
	}

	addToCart() {
		this.getGeolocation().then((res)=>{
			console.log("inside add to cart ", res);
			let url = this.state.apiEndPoint + "/anonymous/cart/insert";
			let body = {
				variant_id : this.props.variant_id,
				quantity : 1,
				lat_long : res
			}

			let cart_id = this.getCookie('cart_id');
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
					//display error message toast
				}
			})
			.catch((error)=>{
				console.log("error in add to cart ==>", error);
			})
		})
		.catch((error) => {
			console.log("error ==>", error);
		});
	}

	getGeolocation(){
		return new Promise((resolve, reject) => {
			let geoOptions = {
				maximumAge: 30 * 60 * 1000,
				timeout: 10 * 1000
			}
			if ("geolocation" in navigator){
				navigator.permissions.query({name:'geolocation'}).then(function(result) {
				  	if (result.state === 'granted') {
				  		console.log("granted");
					    navigator.geolocation.getCurrentPosition((position) => {
							console.log("position ==>", position.coords);
							resolve([position.coords.latitude, position.coords.longitude]);
						},
						(geoError) =>{
							console.log("error in getting geolocation", geoError);
							if(geoError.code === 1){
								// permission denied
								// show a toast with proper message 
							}
							else{
								// other errors
								// show a toast with proper message
							}
						},geoOptions);
					}
					else if (result.state === 'prompt') {
					    console.log("prompt");
					    window.updategpsModalPromptComponent(true);
					    let timer = setInterval(()=>{
					    	if(window.lat_long){
					    		clearInterval(timer);
					    		resolve(window.lat_long);
					    	}
					    },500)
					}
				});
			}
			else {
				console.log("inside else");
				//Show the modal prompt to use gps for location
				reject(new Error('geolocation not enabled'));
			}
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
