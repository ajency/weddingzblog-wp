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
			<div class="slide-in flex-slide-in" id="otp">
			  <div class="slide-in-header header-container d-flex align-items-center">
			      <div class="app-name d-flex align-items-center">					
			          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/Newlogo.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
			      </div>
			      <div class="app-chekout text-green">
			          <img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/checkout.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl"/>
			          Secure <br/>Checkout
			      </div>
			      <h3 class="app-close bg-primary m-0 text-white btn-pay m-0" onClick={() => this.hideVerifyOtpSlider()}>
			          <span aria-hidden="true"><img src="http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/remove.png" className="app-log" alt="Green Grain Bowl" title="Green Grain Bowl" /></span>
			      </h3>
			  </div>
			  <div class="slide-in-content">
			      <div class="spacer-210"></div>
			      <h3 class="h1 ft6">Verify Mobile</h3>
			      <h4 class="font-weight-light mt-4 pb-4">
			        Enter the 6 digit code sent to the number 
			      </h4>
			      {this.state.phoneNumber}

			      <div class="mb-1 pt-4">
			       		<input className="w-100 p-3 border-green h5 ft6 rounded-0" type="number" placeholder="Enter OTP" onChange={e => {this.setOtp(e.target.value)}} />
			      </div>
			      <h6 class="mb-4 pb-3">Didn't receive the code? <a href="javascript:void(0)" onClick={()=>{this.resendOtpCode()}}>RESEND</a></h6>
			      <div class="btn-wrapper pt-4">
			        {this.getOtpButtons()}
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
		// return (<div> 
		// 			<button onClick={()=>{this.skipOtp()}}>SKIP OTP</button>
		// 			<button onClick={()=>{this.verifyOtp()}} disabled={this.state.otp.length < 6}>VERIFY OTP</button>
		// 		</div>
		// 	);

		return (
			 <div class="btn-inner-wrap">
	        	<button type="button" class="btn-reset text-white border-green bg-primary p-3 text-left h5 ft6 mb-0 rounded-0 w-100" onClick={()=>{this.verifyOtp()}} disabled={this.state.otp.length < 6}>Verify OTP</button>
	          	<i class="text-white fa fa-arrow-right" aria-hidden="true"></i>
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
		document.querySelector('#otp').classList.remove('visible');
	}

	resendOtpCode(){
		console.log("inside verify otp code");
	}

	skipOtp(){

	}

	showGpsSlider(){
		window.showGpsModalPrompt(true);
	}

}

let domContainer = document.querySelector('#react-verify-otp-container');
const otpModalComponent = ReactDOM.render(e(verifyOtp), domContainer);


window.showVerifyOtpSlider = (data) => {
	console.log("check show otp modal==>")
	otpModalComponent.setState({phoneNumber : '', otp : '', confirmationResult : '', disableButtons : false,  errorMessage : '', showOtpLoader : false, otpErrorMsg : ''})
	document.querySelector('#otp').classList.add('visible');
}

window.updateOtpSLider = (confirmationResult, phone_number) => {
	otpModalComponent.setState({phoneNumber : phone_number,  confirmationResult : confirmationResult})
}
