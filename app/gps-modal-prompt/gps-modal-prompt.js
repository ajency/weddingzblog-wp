'use strict';
const e = React.createElement;
window.lat_lng = null;
window.formatted_address = null;
const CancelToken = axios.CancelToken;
let cancel;
let debounceTimer;

const locationStyle = {
	'list-style' : 'none'
}

class gpsModalPrompt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display : false,
			apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			// apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			locations : [],
			locError : '',
			gpsError : ''

		}
	}

	render() {
		// if(this.state.display){
		// 	$('#gpsModal').modal('show');
		// }

		return (
			<div className="modal fade" id="gpsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
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
							<div className="gps-error-msg">
								{this.checkGpsErrorMsg()}
							</div>
							<div className="p-4">
								<input type="search" className="w-75" placeholder="search for area, street name" onChange={e => {this.autoCompleteLocation(e.target.value)}}/>
							</div>
							<div className="gps-error-msg">
								{this.checkLocationErrorMsg()}
							</div>
							<ul style={locationStyle}>
								{this.getAutoCompleteLocations()}
							</ul>
						</div>
					</div>
			  	</div>
		    </div>
		);
	}

	autoCompleteLocation(value) {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(()=>{
			console.log("autoCompleteLocation =>", value);
			this.setState({locError : ''});
			if(value.length > 2 ) {
				let url = this.state.apiEndPoint + "/places-autocomplete";
				let body = {
					input : value
				}
				this.setState({showLoader : true, locations : []})
				cancel && cancel();
				console.log("cancel ==>", cancel);
				axios.get(url, {params : body,
						cancelToken : new CancelToken((c) => {
							cancel = c;
						})
					})
					.then((res) => {
						this.setState({showLoader : false})
						if(res.data.status === "OK")
							this.setState({locations : res.data.predictions})
						else{
							//display error
							this.setState({locError : res.data.error_message})
						}
					})
					.catch((error)=>{
						// this.setState({showLoader : false})
						console.log("error in autoCompleteLocation ==>", error);
						// let msg = error.message ? error.message : error;
						// this.setState({locError : msg})
					})
			}
			else{
				this.setState({locations : []})
			}
		},500);
	}

	getAutoCompleteLocations(){
		if(this.state.locations.length){
			let locs =  this.state.locations.map((loc)=>
				<li key={loc.id} className="btn p-1" onClick={() => {this.reverseGeocode(loc)}}>
					{loc.description}
				</li>
			);
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

	reverseGeocode(loc = null, latlng=null) {
		console.log("reverse geocode ==>", loc);
		this.setState({locError : ''});
		this.setState({showLoader : true, locations : []})
		let url = this.state.apiEndPoint + "/reverse-geocode";
		let body = {};
		if(loc)
			body.place_id = loc.place_id;
		else if(latlng)
			body.latlng = latlng[0] + ',' +latlng[1];

		axios.get(url, {params : body})
			.then((res) => {
				this.setState({showLoader : false})
				if(res.data.status === "OK" || res.data.statusMessage === "OK"){
					if(loc)
						this.setUserLocations([res.data.result.geometry.location.lat,res.data.result.geometry.location.lng], res.data.result.formatted_address) 
					else if(latlng)
						this.setUserLocations(latlng, res.data.data[0].formatted_address);
					$('#gpsModal').modal('hide');
					this.setState({gpsError : ''})
				}
				else{
					this.setState({locError : res.data.error_message})
				}
			})
			.catch((error)=>{
				this.setState({showLoader : false})
				console.log("error in autoCompleteLocation ==>", error);
				let msg = error.message ? error.message : error;
				this.setState({locError : msg})
			})
	}

	setUserLocations(lat_lng, formatted_address){
		console.log("setUser locations ==>", lat_lng, formatted_address)
		document.cookie = "lat_lng=" + lat_lng[0] + ',' +lat_lng[1] + ";path=/";
		document.cookie = "formatted_address=" + formatted_address + ";path=/";
		window.lat_lng = lat_lng;
		window.formatted_address = formatted_address;
		document.querySelector("#selected-location-address").innerHTML = formatted_address;
	}


	checkLocationErrorMsg(){
		if(this.state.locError){
			return <div className="alert-danger">{this.state.locError}</div>
		}
	}

	getLocation(){
		let geoOptions = {
			maximumAge: 30 * 60 * 1000,
			timeout: 10 * 1000
		}
		navigator.geolocation.getCurrentPosition((position) => {
			console.log("position ==>", position.coords);
			this.setState({ display : false });
			this.reverseGeocode(null, [position.coords.latitude, position.coords.longitude]);
		},
		(geoError) =>{
			console.log("error in getting geolocation", geoError);
			if(geoError.code === 1){
				// permission denied
				this.setState({gpsError : 'Permission blocked. Please allow location permission for delivery'})
			}
			else{
				// other errors
				this.setState({gpsError : 'Error in getting current location using GPS'});
			}
		},geoOptions);
	}

	checkGpsErrorMsg(){
		if(this.state.gpsError){
			return <div className="alert-danger">{this.state.gpsError}</div>
		}
	}
}

let domContainer = document.querySelector('#react-add-delivery-address-container');
const gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);


window.updategpsModalPromptComponent = (display) => {
	$('#gpsModal').modal('show');
	// gpsModalPromptComponent.setState({display : display})
}
