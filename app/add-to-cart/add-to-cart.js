'use strict';

const e = React.createElement;

class addToCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			apiCallInProgress : false,
			quantity : 0,
			lastSelected : '',
			items : [],
			selectedVariant : ''
		};
	}

	componentDidMount(){
		this.setState({selectedVariant : this.props.product_data.default })
	}

	render() {
		return (
			<div>
				{this.getButtonContent()}
				<div className="modal fade" id={'variantSelectionModal-' + this.props.product_data.product_id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
				  	<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
							<div className="p-5">
								<h2>CHOOSE YOUR BOWL</h2>
							</div>
							<div className="p-3">
								<h3>{this.props.product_data.title}</h3>
							</div>

							<div>
								{this.getVariants()}
							</div>

							<button className="btn btn-primary" onClick={()=>this.addToCart(this.state.selectedVariant)}> CONTINUE </button>
						</div>
				  	</div>
			    </div>
			    <div className="modal fade" id={'repeatLast-' + this.props.product_data.product_id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
				  	<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
							<div className="p-5">
								<h2>Repeat last used customization?</h2>
							</div>
							<div className="p-3">
								<h3>{this.getLastSelected()}</h3>
							</div>

							<div className="d-flex justify-content-between">
								<button className="btn btn-primary" onClick={()=>this.showVariantModal()}> I'll Choose </button>
								<button className="btn btn-primary" onClick={()=>this.addToCart(this.state.lastSelected)}> Repeat Last </button>
							</div>
						</div>
				  	</div>
			    </div>
			</div>
		);
	}

	getVariants(){
		let variants = this.props.product_data.variants.map((variant)=>{
			return (<div key={variant.id} className="d-flex justify-content-between p-3 ml-5 mr-5">
				<label>
					<input type="radio" name={"variant-" + this.props.product_data.product_id} value={variant.id} checked={this.state.selectedVariant == variant.id} onChange={(event) => this.handleOptionChange(event)}/> 
					<span>{variant.size}</span> <span className="ml-5">{variant.sale_price}</span>
				</label>
			</div>)
		})
		return variants;
	}

	showVariantModal(){
		$('#repeatLast-' + this.props.product_data.product_id).modal('hide');
		$('#variantSelectionModal-' + this.props.product_data.product_id).modal('show');
	}

	getLastSelected(){
		let last_selected = this.props.product_data.variants.find((variant) => {return variant.id == this.state.lastSelected})
		if(last_selected)
			return ( <div> Size : {last_selected.size} </div>
				)
	}

	handleOptionChange(event){
		this.setState({selectedVariant : event.target.value });
	}

	getButtonContent(){
		if(this.state.apiCallInProgress){
			return (<div class="btn-icon">
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
					</div>);

		}
		if(this.state.quantity == 0)
			return (<button className="btn-primary" style={btnStyle} onClick={() => this.checkVariant('add')} disabled={this.state.apiCallInProgress}>ADD</button>)

		return (
			<div>
				<button className="btn-primary" style={btnStyle} onClick={() => this.checkVariant('remove')} disabled={this.state.apiCallInProgress}>-</button>
				<span className="m-1">	{this.state.quantity} </span>
				<button className="btn-primary" style={btnStyle} onClick={() => this.checkVariant('add')} disabled={this.state.apiCallInProgress}>+</button>
			</div>
		)		
	}

	
	checkVariant(action){
		if(this.props.product_data.variants.length == 1){
			action == 'add' ? this.addToCart(this.props.product_data.variants[0].id) : this.removeFromCart(this.props.product_data.variants[0].id)
		}
		else{
			if(action == 'add'){
				if(this.state.items.length){
					$('#repeatLast-' + this.props.product_data.product_id).modal('show');
				}
				else{
					$('#variantSelectionModal-' + this.props.product_data.product_id).modal('show');
				}
			}
			else{
				if(this.state.items.length > 1){
					let msg = "Item has multiple variants added. Remove correct item from cart";
					this.displayError(msg);
				}
				else{
					this.removeFromCart(this.state.items[0].variant_id);
				}
			}
		}
	}

	addToCart(variant_id = null) {
		$('#repeatLast-' + this.props.product_data.product_id).modal('hide');
		$('#variantSelectionModal-' + this.props.product_data.product_id).modal('hide');
		this.setState({apiCallInProgress : true});
		let cart_id = window.getCookie('cart_id');
		if(cart_id){
			this.addToCartApiCall(variant_id, null, cart_id);
		}
		else if(window.lat_lng){
			this.addToCartApiCall(variant_id, window.lat_lng, null, window.formatted_address);
		}
		else{
			this.getGeolocation().then((res)=>{
				this.addToCartApiCall(variant_id, window.lat_lng, null, window.formatted_address);
			})
			.catch((error) => {
				this.setState({apiCallInProgress : false});
				console.log("error ==>", error);
				this.displayError(error);
			});
		}
	}

	removeFromCart(variant_id = null){
		this.setState({apiCallInProgress : true});
		let url = this.state.apiEndPoint + "/anonymous/cart/delete";
		// let url = "https://demo8558685.mockable.io/remove-from-cart";
		let body = {
			variant_id 	: variant_id,
			quantity 	: 1,
			cart_id 	: window.getCookie('cart_id')
		}

		axios.post(url, body)
		.then((res) => {
			if(res.data.success){
				this.displaySuccess("Successfully removed from cart");
				let item = {
					variant_id : variant_id,
					quantity : 1
				}
				this.removeItems(item);
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

	addToCartApiCall(variant_id = null, lat_long = null, cart_id = null, formatted_address = null){
		let url = this.state.apiEndPoint + "/anonymous/cart/insert";
		let body = {
			variant_id : variant_id,
			quantity : 1,
			lat_long : lat_long,
			formatted_address : formatted_address
		}
		if(cart_id)
			body.cart_id = cart_id;

		axios.post(url, body)
		.then((res) => {
			if(res.data.success){
				this.addItems(res.data.item);
				window.updateViewCartCompoent(res.data);
				this.displaySuccess("Successfully added to cart")
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

	addItems(item){
		let items = this.state.items;
		let updated_item_index = items.findIndex((i) => { return i.variant_id == item.variant_id});
		if(updated_item_index !== -1){
			items[updated_item_index].quantity += item.quantity;
		}
		else{
			items.push(item);
		}
		let quantity = this.state.quantity + item.quantity;
		this.setState({quantity : quantity, items : items, lastSelected : item.variant_id});
	}

	removeItems(item){
		let items = this.state.items;
		let updated_item_index = items.findIndex((i) => { return i.variant_id == item.variant_id});
		let last_selected = '', quantity = this.state.quantity - item.quantity;
		if(updated_item_index !== -1){
			items[updated_item_index].quantity -= item.quantity;
		}
		if(items[updated_item_index].quantity == 0){
			items.splice(updated_item_index, 1);
		}
		if(items.length == 1){
			last_selected = items[0].variant_id;
		}
		this.setState({quantity : quantity, items : items, lastSelected : last_selected});
	}

	displayError(msg){
		document.querySelector('#failure-toast').innerHTML = msg;
		document.querySelector('#failure-toast').classList.remove('d-none');
		setTimeout(()=>{
			document.querySelector('#failure-toast').classList.add('d-none');
		},3000)
	}

	displaySuccess(msg){
		document.querySelector('#success-toast').innerHTML = msg;
		document.querySelector('#success-toast').classList.remove('d-none');
		setTimeout(()=>{
			document.querySelector('#success-toast').classList.add('d-none');
		},3000)
	}

	getGeolocation(){
		return new Promise((resolve, reject) => {
		    window.showSignInModal(true);
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
		const variant_id = domContainer.dataset.variant_id;
		const product_data = JSON.parse(domContainer.dataset.product_data);
		addToCartComponents[index] =  ReactDOM.render(e(addToCart, { product_data : product_data }),domContainer);
	});

window.updateaddToCartComponent = (item) => {
	addToCartComponents.forEach((component) =>{
		if(component.props.product_data.product_id == item.product_id){
			let items = component.state.items;
			items.push(item)
			items.sort((a,b)=>{
	  			return b.timestamp._seconds - a.timestamp._seconds;
	  		})
			let last_added = items[0].variant_id;
			let qty = 0;
			items.forEach((item) => {
				qty += item.quantity;
			})
			component.setState({items : items, lastSelected : last_added, quantity : qty})
		}
	})
}

window.updateItemQuantity = (item, action) => {
	console.log("updateItemQuantity ==>", item, action);
	addToCartComponents.forEach((component) =>{
		if(component.props.product_data.product_id == item.product_id){
			if(action == 'add')
				component.addItems(item)
			else
				component.removeItems(item)
		}
	})
}
