'use strict';
const e = React.createElement;
window.lat_long = null;
class gpsModalPrompt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display : false
		}
	}

	render() {
		if(this.state.display){
			return (
				<div>
					<div>
						<h2>ADD DELIVERY ADDRESS</h2>
					</div>
					<div>
						<h3> Add your delivery address to proceed </h3>
						<p> To add this item to your cart, please set your delivery location </p>
					</div>
					<div style={btnStyle} onClick={() => this.getLocation()}>
						Get Current Location
					</div>
				</div>
			);
		}
		else
			return (<div> </div>);
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
