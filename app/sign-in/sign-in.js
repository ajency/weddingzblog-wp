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
			errorMessage : ''
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

								<button onClick={()=> this.showGpsSlider()} disabled={this.state.disableButtons} >Set Location</button>
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

	displaySignInErrorMsg(){
		if(this.state.errorMessage){
			return  <div className="alert-danger">{this.state.errorMessage}</div>
		}
	}

	setUserMobile(value){
		this.setState({phoneNumber : value});
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
		let url = this.state.apiEndPoint + "/check-user-exist";
			let body = {
				phone_number : this.state.phoneNumber
			}
			axios.get(url, {params : body})
				.then((res) => {
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
		      	this.hideSignInPopUp() // TODO : function to hide this popup 
		      	this.showOtpSlider()   // TODO : Show the otp in slider // pass confirmation-result and mobile number to otp component
		    }).catch(function (error) {
		      	console.log("Error :  SMS not sent", error);
		      	this.setState({errorMessage : error, disableButtons : false, showSignInLoader : false});
		    });
	}

	signInAnonymously(){
		firebase.auth().signInAnonymously()
			.then((res)=>{
				res.user.getIdToken().then((idToken) => {
		           this.updateUserDetails(idToken);
		        });
				this.showGpsSlider();
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

	showGpsSlider(){
		// $('#signInModalPrompt').modal('hide');
		window.showGpsModalPrompt(true);
	}

	hideSignInPopUp(){

	}

	showOtpSlider(){

	}

}

let domContainer = document.querySelector('#react-sign-in-container');
const signInModalComponent = ReactDOM.render(e(signInModal), domContainer);


window.showSignInModal = (data) => {
	signInModalComponent.setState({phoneNumber : '', otp : '', confirmationResult : '', disableButtons : false, showSignInLoader : false, errorMessage : '', showOtpLoader : false, otpErrorMsg : ''})
	$('#signInModalPrompt').modal('show');
}
