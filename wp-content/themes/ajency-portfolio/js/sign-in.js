'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var signInModal = function (_React$Component) {
	_inherits(signInModal, _React$Component);

	function signInModal(props) {
		_classCallCheck(this, signInModal);

		var _this = _possibleConstructorReturn(this, (signInModal.__proto__ || Object.getPrototypeOf(signInModal)).call(this, props));

		_this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			phoneNumber: '',
			otp: '',
			confirmationResult: '',
			disableButtons: false,
			showSignInLoader: false,
			errorMessage: ''
		};
		return _this;
	}

	_createClass(signInModal, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ 'class': 'slide-in flex-slide-in', id: 'phone_number' },
				React.createElement(
					'div',
					{ 'class': 'slide-in-header header-container d-flex align-items-center' },
					React.createElement(
						'div',
						{ 'class': 'app-name d-flex align-items-center' },
						React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/Newlogo.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' })
					),
					React.createElement(
						'div',
						{ 'class': 'app-chekout text-green' },
						React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/checkout.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' }),
						'Secure ',
						React.createElement('br', null),
						'Checkout'
					),
					React.createElement(
						'h3',
						{ 'class': 'app-close bg-primary m-0 text-white btn-pay m-0', onClick: function onClick() {
								return _this2.closeSignInSlider();
							}, disabled: this.state.disableButtons },
						React.createElement(
							'span',
							{ 'aria-hidden': 'true' },
							React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/remove.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' })
						)
					)
				),
				React.createElement(
					'div',
					{ 'class': 'slide-in-content' },
					React.createElement('div', { 'class': 'spacer-210' }),
					React.createElement(
						'h3',
						{ 'class': 'h1 ft6' },
						'Login'
					),
					React.createElement(
						'h4',
						{ 'class': 'font-weight-light mt-4 pb-4' },
						'Having an account with GGB makes it dead simple to place orders'
					),
					React.createElement(
						'div',
						{ 'class': 'mb-3 pt-4 pb-2' },
						React.createElement('input', { className: 'w-100 p-3 border-green h5 ft6 rounded-0', placeholder: '10 digit mobile number', type: 'text', onKeyDown: function onKeyDown(e) {
								_this2.validateMobile(e);
							}, onChange: function onChange(e) {
								_this2.setUserMobile(e.target.value);
							}, value: this.state.phoneNumber }),
						' ',
						React.createElement('br', null),
						React.createElement('div', { className: 'd-none', id: 'sign-in-button' })
					),
					React.createElement(
						'div',
						{ 'class': 'btn-wrapper pt-4' },
						this.getSignInButtons()
					),
					this.displaySignInErrorMsg()
				)
			);
		}
	}, {
		key: 'getSignInButtons',
		value: function getSignInButtons() {
			var _this3 = this;

			if (this.state.showSignInLoader) {
				return React.createElement(
					'div',
					{ 'class': 'btn-icon' },
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			return React.createElement(
				'div',
				{ 'class': 'btn-inner-wrap' },
				React.createElement(
					'button',
					{ type: 'button', 'class': 'btn-reset text-white border-green bg-primary p-3 text-left h5 ft6 mb-0 rounded-0 w-100', onClick: function onClick() {
							return _this3.signInWithPhoneNumber();
						}, disabled: this.state.phoneNumber.length < 10 },
					'Submit'
				),
				React.createElement('i', { 'class': 'text-white fa fa-arrow-right', 'aria-hidden': 'true' })
			);
		}
	}, {
		key: 'displaySignInErrorMsg',
		value: function displaySignInErrorMsg() {
			if (this.state.errorMessage) {
				return React.createElement(
					'div',
					{ className: 'alert-danger' },
					this.state.errorMessage
				);
			}
		}
	}, {
		key: 'setUserMobile',
		value: function setUserMobile(value) {
			this.setState({ phoneNumber: value });
		}
	}, {
		key: 'validateMobile',
		value: function validateMobile(e) {
			var key = e.keyCode || e.which;
			if ((key < 48 || key > 57 || e.target.value.length > 9) && key !== 8 && key !== 13) {
				if (e.preventDefault) e.preventDefault(); //normal browsers
				e.returnValue = false; //IE
			}
		}
	}, {
		key: 'modalClosed',
		value: function modalClosed() {
			window.modal_closed = true;
		}

		// checkUserExist(){
		// 	this.setState({disableButtons : true, showSignInLoader : true});
		// 	let url = this.state.apiEndPoint + "/check-user-exist";
		// 		let body = {
		// 			phone_number : this.state.phoneNumber
		// 		}
		// 		axios.get(url, {params : body})
		// 			.then((res) => {
		// 				this.signInWithPhoneNumber();
		// 			})
		// 			.catch((error)=>{
		// 				console.log("error in check user exist ==>", error);
		// 				this.signInAnonymously();
		// 			})
		// }

	}, {
		key: 'signInWithPhoneNumber',
		value: function signInWithPhoneNumber() {
			var _this4 = this;

			this.setState({ disableButtons: true, showSignInLoader: true });
			var phone_number = "+91" + this.state.phoneNumber;
			var recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
				'size': 'invisible',
				'callback': function callback(response) {
					onSignInSubmit();
				}
			});

			firebase.auth().signInWithPhoneNumber(phone_number, recaptchaVerifier).then(function (confirmationResult) {
				console.log("SMS sent.");
				_this4.setState({ confirmationResult: confirmationResult });
				_this4.closeSignInSlider(); // TODO : function to hide this popup 
				_this4.showOtpSlider(confirmationResult, _this4.state.phoneNumber); // TODO : Show the otp in slider // pass confirmation-result and mobile number to otp component
			}).catch(function (error) {
				console.log("Error :  SMS not sent", error);
				_this4.setState({ errorMessage: error.message, disableButtons: false, showSignInLoader: false });
			});
		}

		// signInAnonymously(){
		// 	firebase.auth().signInAnonymously()
		// 		.then((res)=>{
		// 			res.user.getIdToken().then((idToken) => {
		// 	           this.updateUserDetails(idToken);
		// 	        });
		// 			this.showGpsSlider();
		// 		})
		// 		.catch((error) => {
		// 		  	console.log("error in anonymouse sign in", error);
		// 		  	this.setState({errorMessage : error, disableButtons : false, showSignInLoader : false});
		// 		});
		// }

		// updateUserDetails(idToken){
		// 	let body = {
		// 		phone : this.state.phoneNumber
		// 	}
		// 	let headers = {
		// 		Authorization : 'Bearer '+ idToken
		// 	}
		// 	let url = this.state.apiEndPoint + "/user/update-user-details";
		// 	axios.post(url, body, {headers :  headers })
		// 		.then((res) => {
		// 			console.log("update user details response ==>", res);
		// 		})
		// 		.catch((error)=>{
		// 			console.log("error in update user details ==>", error);
		// 		})
		// }

		// showGpsSlider(){
		// 	// $('#signInModalPrompt').modal('hide');
		// 	window.showGpsModalPrompt(true);
		// }

	}, {
		key: 'closeSignInSlider',
		value: function closeSignInSlider() {
			document.querySelector('#phone_number').classList.remove('visible');
		}
	}, {
		key: 'showOtpSlider',
		value: function showOtpSlider(confirmationResult, phone_number) {
			window.showVerifyOtpSlider(true);
			window.updateOtpSLider(confirmationResult, phone_number);
		}
	}]);

	return signInModal;
}(React.Component);

var domContainer = document.querySelector('#react-sign-in-container');
var signInModalComponent = ReactDOM.render(e(signInModal), domContainer);

window.showSignInModal = function (data) {
	signInModalComponent.setState({ phoneNumber: '', otp: '', confirmationResult: '', disableButtons: false, showSignInLoader: false, errorMessage: '', showOtpLoader: false, otpErrorMsg: '' });
	document.querySelector('#phone_number').classList.add('visible');
};