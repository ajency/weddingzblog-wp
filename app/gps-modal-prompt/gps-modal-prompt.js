'use strict';
const e = React.createElement;
window.lat_long = null;
class gpsModalPrompt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display : false,
			apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			locations : []
		}
		this.autoCompleteLocation = this.autoCompleteLocation.bind(this);
	}

	render() {
		if(this.state.display){
			$('#exampleModal').modal('show');
		}

		return (
			<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
			  	<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
						<div className="p-5">
							<h2>ADD DELIVERY ADDRESS</h2>
						</div>
						<div className="p-3">
							<h3> Add your delivery address to proceed </h3>
							<p> To add this item to your cart, please set your delivery location </p>
						</div>
						<div className="d-flex justify-content-center flex-column p-4">
							<div className="btn-dark" style={btnStyle} onClick={() => this.getLocation()}>
								Get Current Location
							</div>
							<div className="p-4">
								<input type="search" className="w-75" placeholder="search for area, street name" onChange={this.autoCompleteLocation}/>
							</div>
							<div>
								{this.getAutoCompleteLocations()}
							</div>
						</div>
					</div>
			  	</div>
		    </div>
		);
	}

	autoCompleteLocation(event) {
		console.log("autoCompleteLocation =>", event.target.value, event.target.value.length);
		if(event.target.value.length > 2 ) {
			let url = this.state.apiEndPoint + "/places-autocomplete";
			let body = {
				input : event.target.value
			}
			this.setState({showLoader : true, locations : []})
			axios.get(url, {params : body})
				.then((res) => {
					this.setState({showLoader : false})
					if(res.data.status === "OK")
						this.setState({locations : res.data.predictions})
					else{
						//display error
					}
				})
				.catch((error)=>{
					this.setState({showLoader : false})
					console.log("error in autoCompleteLocation ==>", error);
				})
		}
		else{
			this.setState({locations : []})
		}
	}

	getAutoCompleteLocations(){
		console.log("inside getAutoCompleteLocations", this.state.locations);
		if(this.state.locations.length){
			let locs =  this.state.locations.map((loc)=>
				<div key={loc.id} className="btn p-1" onClick={() => {this.reverseGeocode(loc)}}>
					{loc.description}
				</div>
			);
			console.log("locs ==>", locs);
			return locs;
		}
		if(this.state.showLoader && !this.state.locations.length){
			return (
					<div>
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
					</div>
				)
		}
	}

	reverseGeocode(loc) {
		console.log("reverse geocode ==>", loc);
	}

	getLocation(){
		let geoOptions = {
			maximumAge: 30 * 60 * 1000,
			timeout: 10 * 1000
		}
		navigator.geolocation.getCurrentPosition((position) => {
			console.log("position ==>", position.coords);
			this.setState({ display : false });
			window.lat_long = [position.coords.latitude, position.coords.longitude];
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
}

// Find all DOM containers, and render add-to-cart buttons into them.
let domContainer = document.querySelector('#react-add-delivery-address-container');
const gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);


window.updategpsModalPromptComponent = (display) => {
	gpsModalPromptComponent.setState({display : display})
}
