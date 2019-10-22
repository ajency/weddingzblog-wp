import React, { Component } from 'react';
import axios from 'axios';
import './add-new-address.scss'
import GoogleMap from '../google-map/google-map.js';
class AddNewAddress extends Component {
    constructor(props) {
        super(props);
        this.handleCenter = this.handleCenter.bind(this);
        this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			locError : '',
			gpsError : '',
            showLoader : false,
            address: this.props.address,
            landmark:"",
            building:"",
            latlng: {
                lat:this.props.latlng.lat,
                lng:this.props.latlng.lng
            }
		};
    }

   
    
    render() {
        return (
            <div className="container">
                <div style={{width:"inherit", height:"auto"}}>
                    <div className="map-container">
                        <GoogleMap handleCenter={this.handleCenter} latlng={this.props.latlng}/>
                        <div id="marker"></div>
                    </div>
                    {this.state.showLoader?<div>Address is loading...</div>:null}
                    <h3>Set a delivery address</h3>
                    <form>
                        <p>{this.state.address}</p>

                        <label>
                           House/Flat/Block no:
                            <input type="text" value={this.state.building} onChange={this.handleBuildingChange}/>
                        </label>
                        <label>
                            Landmark:
                            <input type="text" value={this.state.landmark}  onChange={this.handleLandmarkChange}/>
                        </label> <br/>
                        <button onClick={this.handleSubmit}>Add Address</button>
                    </form>
                </div>
            </div>
        );
    }

    
    handleCenter = (mapProps,map) => {
        this.setState({'landmark':''});
        this.setState({'latlng':{lat:map.getCenter().lat(), lng: map.getCenter().lng()}});
        this.reverseGeocode(map.getCenter().lat(), map.getCenter().lng());
    }

    handleLandmarkChange = (e) => {
        this.setState({'landmark':e.target.value});
    }

    handleBuildingChange = (e) => {
        this.setState({'building':e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            address: this.state.address,
            latlng: this.state.latlng,
            building:this.state.building,
            landmark:this.state.landmark
        }
        console.log(data)
    }
   
    reverseGeocode = (lat = null, lng = null) => {
		this.setState({locError : ''});
		this.setState({showLoader : true})
		let url = this.state.apiEndPoint + "/reverse-geocode";
		let body = {};
	    if(lat && lng) {
            body.latlng = lat + ',' +lng;
        }
        
		axios.get(url, {params : body})
        .then((res) => {
            if(res.data.status === "OK"){
                this.setState({"address":res.data.results[0].formatted_address})
                this.setState({showLoader : false})
            }
            else{
                this.setState({locError : res.data.error_message})
                this.setState({showLoader : false});
            }
        })
        .catch((error)=>{
            this.setState({showLoader : false});
            console.log("error in autoCompleteLocation ==>", error);
            let msg = error.message ? error.message : error;
            this.setState({locError : msg})
        })
    }
}

export default AddNewAddress;