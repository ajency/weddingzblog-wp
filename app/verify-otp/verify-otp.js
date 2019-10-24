'use strict';
const e = React.createElement;


class verifyOtp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			phoneNumber : '',
			otp : '',
			confirmationResult : '',
			disableButtons : false,
			errorMessage : '',
			showOtpLoader : false,
			otpErrorMsg : ''
		}
	}

	render() {
		return (
			<div>
				<div className="modal-content">
					<div className="p-5">
						<h2>Verify Mobile</h2>
					</div>
					<div className="p-3">
						<p> Enter the 6 digit code sent to the below number </p>
					</div>
					
					<div className="p-3">
						{this.state.phoneNumber}
						<input className="mobile-input" type="tel" onChange={e => {this.setOtp(e.target.value)}} />
					</div>

					<div>
						{this.getOtpButtons()}
					</div>

					<div>
						<p>Didn't receive the code ? <a onClick={()=>{this.resendOtpCode()}}>RESEND CODE</a></p>
					</div>

					{this.displayOtpErrorMsg()}
				</div>
			</div>
		);
	}

	getOtpButtons(){
		if(this.state.showOtpLoader){
			return (<div class="btn-icon">
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
					</div>
			);
		}
		return (<div> 
					<button onClick={()=>{this.skipOtp()}}>SKIP OTP</button>
					<button onClick={()=>{this.verifyOtp()}} disabled={this.state.otp.length < 6}>VERIFY OTP</button>
				</div>
			);
	}

	displayOtpErrorMsg(){
		if(this.state.otpErrorMsg){
			return  <div className="alert-danger">{this.state.otpErrorMsg}</div>
		}
	}

	setOtp(value){
		this.setState({otp : value});
	}


	signInAnonymously(){
		firebase.auth().signInAnonymously()
			.then((res)=>{
				res.user.getIdToken().then((idToken) => {
		           this.updateUserDetails(idToken);
		        });
				this.showGpsModal();
			})
			.catch((error) => {
			  	console.log("error in anonymouse sign in", error);
			  	this.setState({errorMessage : error, disableButtons : false, showSignInLoader : false});
			});
	}

	updateUserDetails(idToken){
		let body = {
			phone : this.state.phoneNumber
		}
		let headers = {
			Authorization : 'Bearer '+ idToken
		}
		let url = this.state.apiEndPoint + "/user/update-user-details";
		axios.post(url, body, {headers :  headers })
			.then((res) => {
				console.log("update user details response ==>", res);
			})
			.catch((error)=>{
				console.log("error in update user details ==>", error);
			})
	}

	verifyOtp(){
		this.setState({showOtpLoader : true , disableButtons : true, otpErrorMsg : ''});
		this.state.confirmationResult.confirm(this.state.otp)
			.then((res) =>{
				res.user.getIdToken().then((idToken) => {
		           this.fetchAddresses(idToken);
		        });
			})
			.catch((error)=>{
				let msg = error.message ? error.message : error;
				this.setState({showOtpLoader : false, disableButtons : false, otpErrorMsg : msg});
				console.log("error in otp verification ==>", error);
			})
	}

	fetchAddresses(idToken){
		let headers = {
			Authorization : 'Bearer '+ idToken
		}
		let url = this.state.apiEndPoint + "/user/get-addresses";
		axios.get(url, {headers :  headers })
			.then((res) => {
				this.hideVerifyOtpSlider();
		      	this.showGpsSlider();
		      	window.updateAddresses(res.data.addresses);
			})
			.catch((error)=>{
				console.log("error in fetch addresses ==>", error);
				let msg = error.message ? error.message : error;
				this.setState({showOtpLoader : false, disableButtons : false, otpErrorMsg : msg});
			})
	}

	hideVerifyOtpSlider(){

	}

	resendOtpCode(){
		console.log("inside verify otp code");
	}

	skipOtp(){

	}

	showGpsSlider(){
		// $('#signInModalPrompt').modal('hide');
		window.showGpsModalPrompt(true);
	}

}

let domContainer = document.querySelector('#react-sign-in-container');
const signInModalComponent = ReactDOM.render(e(verifyOtp), domContainer);


window.showSignInModal = (data) => {
	signInModalComponent.setState({phoneNumber : '', otp : '', confirmationResult : '', disableButtons : false, showSignInLoader : false, errorMessage : '', showOtpLoader : false, otpErrorMsg : ''})
	$('#signInModalPrompt').modal('show');
}
