'use strict';
const e = React.createElement;


class signInModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			phoneNumber : '',
			otp : '',
			confirmationResult : '',
			disableButtons : false,
			showSignInLoader : false,
			errorMessage : '',
			showOtpLoader : false,
			otpErrorMsg : ''
		}
	}

	render() {
		return (
			<div>
				<div className="modal fade" id="signInModalPrompt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
				  	<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" disabled={this.state.disableButtons} onClick={()=> this.modalClosed()}>
				          <span aria-hidden="true">&times;</span>
				        </button>
							<div className="p-5">
								<h2>ADD DELIVERY ADDRESS</h2>
							</div>
							<div className="p-3">
								<h3> Add your delivery address to proceed </h3>
								<p> To add this item to your cart, please set your delivery location </p>

								<button onClick={()=> this.showGpsModal()} disabled={this.state.disableButtons} >Set Location</button>
							</div>

							<div className="p-3">
								<h3>Or enter your Mobile Number to order again</h3>
								<p> If you have already ordered with us, kindly add your phone number </p>

								<input className="mobile-input" type="text" onKeyDown={e => {this.validateMobile(e)}} onChange={e => {this.setUserMobile(e.target.value)}} /> <br/>
								{this.getSignInButtons()}

								<div className="d-none" id='sign-in-button'></div>
							</div>
							
							{this.displaySignInErrorMsg()}

						</div>
				  	</div>
			    </div>

			    <div className="modal fade" id="verifyOtpPrompt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
				  	<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.modalClosed()}>
				          <span aria-hidden="true">&times;</span>
				        </button>
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
								<p>Didn't receive the code ? <a onClick={()=>{this.resendOtpCode()}}>RESEND CODE</a></p>
							</div>

							<div>
								{this.getOtpButtons()}
							</div>

							{this.displayOtpErrorMsg()}
						</div>
				  	</div>
			    </div>
			</div>
		);
	}

	getSignInButtons(){
		if(this.state.showSignInLoader){
			return (
				<div class="btn-icon">
						<i class="fas fa-circle-notch fa-spin fa-lg"></i>
				</div>
			);
		}
		return (<div>
					<button >Skip Sign In</button>
					<button onClick={()=> this.checkUserExist()} disabled={this.state.phoneNumber.length < 10} >Proceed To Sign In</button>
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

	displaySignInErrorMsg(){
		if(this.state.errorMessage){
			return  <div className="alert-danger">{this.state.errorMessage}</div>
		}
	}

	displayOtpErrorMsg(){
		if(this.state.otpErrorMsg){
			return  <div className="alert-danger">{this.state.otpErrorMsg}</div>
		}
	}

	setUserMobile(value){
		this.setState({phoneNumber : value});
	}

	setOtp(value){
		this.setState({otp : value});
	}

	validateMobile(e){
	    let key = e.keyCode || e.which;
	    if ((key < 48 || key > 57 || e.target.value.length >9 ) && key !== 8 && key !== 13) {
	        if (e.preventDefault) 
	        	e.preventDefault(); //normal browsers
	        e.returnValue = false; //IE
	    }
	}

	modalClosed(){
		window.modal_closed = true;
	}

	checkUserExist(){
		this.setState({disableButtons : true, showSignInLoader : true});
		console.log("mobile number ==>", this.state.phoneNumber);
		let url = this.state.apiEndPoint + "/check-user-exist";
			let body = {
				phone_number : this.state.phoneNumber
			}
			axios.get(url, {params : body})
				.then((res) => {
					console.log("check user exist response ==>", res);
					this.signInWithPhoneNumber();
				})
				.catch((error)=>{
					console.log("error in check user exist ==>", error);
					this.signInAnonymously();
				})
	}

	signInWithPhoneNumber(){
		let phone_number = "+91" + this.state.phoneNumber;
		let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
		  'size': 'invisible',
		  'callback': function(response) {
		    onSignInSubmit();
		  }
		});

		firebase.auth().signInWithPhoneNumber(phone_number, recaptchaVerifier)
		    .then( (confirmationResult) => {
		    	console.log("SMS sent.");
		      	this.setState({confirmationResult : confirmationResult});
		      	$('#signInModalPrompt').modal('hide');
		      	$('#verifyOtpPrompt').modal('show');
		    }).catch(function (error) {
		      	console.log("Error :  SMS not sent", error);
		      	this.setState({errorMessage : error, disableButtons : false, showSignInLoader : false});
		    });
	}

	signInAnonymously(){
		console.log("inside signInAnonymously", firebase);

		firebase.auth().signInAnonymously()
			.then((res)=>{
				console.log("anonymouse sign in success ==>", res);
				res.user.getIdToken().then((idToken) => {
		           // console.log("idtoken ==>",idToken);
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
		console.log("inside verify otp");
		this.setState({showOtpLoader : true , disableButtons : true, otpErrorMsg : ''});
		this.state.confirmationResult.confirm(this.state.otp)
			.then((res) =>{
				console.log("otp verification res ==>", res);
				res.user.getIdToken().then((idToken) => {
		           // console.log("idtoken ==>",idToken);
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
				console.log("fetch addresses response ==>", res);
				$('#verifyOtpPrompt').modal('hide');
		      	this.showGpsModal(res.data.addresses);
			})
			.catch((error)=>{
				console.log("error in fetch addresses ==>", error);
				let msg = error.message ? error.message : error;
				this.setState({showOtpLoader : false, disableButtons : false, otpErrorMsg : msg});
			})
	}

	resendOtpCode(){
		console.log("inside verify otp code");
	}

	skipOtp(){

	}

	showGpsModal(addresses = null){
		$('#signInModalPrompt').modal('hide');
		window.showGpsModalPrompt(true, addresses);
	}

}

let domContainer = document.querySelector('#react-sign-in-container');
const signInModalComponent = ReactDOM.render(e(signInModal), domContainer);


window.showSignInModal = (data) => {
	signInModalComponent.setState({phoneNumber : '', otp : '', confirmationResult : '', disableButtons : false, showSignInLoader : false, errorMessage : '', showOtpLoader : false, otpErrorMsg : ''})
	$('#signInModalPrompt').modal('show');
}
