'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var verifyOtp = function (_React$Component) {
	_inherits(verifyOtp, _React$Component);

	function verifyOtp(props) {
		_classCallCheck(this, verifyOtp);

		var _this = _possibleConstructorReturn(this, (verifyOtp.__proto__ || Object.getPrototypeOf(verifyOtp)).call(this, props));

		_this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			phoneNumber: '',
			otp: '',
			confirmationResult: '',
			disableButtons: false,
			errorMessage: '',
			showOtpLoader: false,
			otpErrorMsg: '',
			showCapta: true
		};
		return _this;
	}

	_createClass(verifyOtp, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ className: 'slide-in flex-slide-in', id: 'otp' },
				React.createElement(
					'div',
					{ className: 'slide-in-header header-container d-flex align-items-center' },
					React.createElement(
						'div',
						{ className: 'app-name d-flex align-items-center' },
						React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/Newlogo.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' })
					),
					React.createElement(
						'div',
						{ className: 'app-chekout text-green' },
						React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/checkout.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' }),
						'Secure ',
						React.createElement('br', null),
						'Checkout'
					),
					React.createElement(
						'h3',
						{ className: 'app-close bg-primary m-0 text-white btn-pay m-0', onClick: function onClick() {
								return _this2.hideVerifyOtpSlider();
							} },
						React.createElement(
							'span',
							{ 'aria-hidden': 'true' },
							React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/remove.png', className: 'app-log', alt: 'Green Grain Bowl', title: 'Green Grain Bowl' })
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'slide-in-content' },
					React.createElement('div', { className: 'spacer-210' }),
					React.createElement(
						'h3',
						{ className: 'h1 ft6' },
						'Verify Mobile'
					),
					React.createElement(
						'h4',
						{ className: 'font-weight-light mt-4 pb-4' },
						'Enter the 6 digit code sent to the number'
					),
					this.state.phoneNumber,
					React.createElement(
						'div',
						{ className: 'mb-1 pt-4' },
						React.createElement('input', { className: 'w-100 p-3 border-green h5 ft6 rounded-0', type: 'tel', placeholder: 'Enter OTP', onChange: function onChange(e) {
								_this2.setOtp(e.target.value);
							}, value: this.state.otp })
					),
					React.createElement(
						'h6',
						{ className: 'mb-4 pb-3' },
						'Didn\'t receive the code? ',
						React.createElement(
							'a',
							{ href: 'javascript:void(0)', onClick: function onClick() {
									_this2.resendOtpCode();
								} },
							'RESEND'
						)
					),
					React.createElement(
						'div',
						{ className: 'btn-wrapper pt-4' },
						this.getOtpButtons()
					),
					this.displayOtpErrorMsg()
				),
				this.getCaptaContainer()
			);
		}
	}, {
		key: 'getCaptaContainer',
		value: function getCaptaContainer() {
			if (this.state.showCapta) {
				return React.createElement('div', { className: 'd-none', id: 'sign-in-button-capta' });
			} else {
				return null;
			}
		}
	}, {
		key: 'getOtpButtons',
		value: function getOtpButtons() {
			var _this3 = this;

			if (this.state.showOtpLoader) {
				return React.createElement(
					'div',
					{ className: 'btn-icon' },
					React.createElement('i', { className: 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			// return (<div> 
			// 			<button onClick={()=>{this.skipOtp()}}>SKIP OTP</button>
			// 			<button onClick={()=>{this.verifyOtp()}} disabled={this.state.otp.length < 6}>VERIFY OTP</button>
			// 		</div>
			// 	);

			return React.createElement(
				'div',
				{ className: 'btn-inner-wrap' },
				React.createElement(
					'button',
					{ type: 'button', className: 'btn-reset text-white border-green bg-primary p-3 text-left h5 ft6 mb-0 rounded-0 w-100', onClick: function onClick() {
							_this3.verifyOtp();
						}, disabled: this.state.otp.length < 6 },
					'Verify OTP'
				),
				React.createElement('i', { className: 'text-white fa fa-arrow-right', 'aria-hidden': 'true' })
			);
		}
	}, {
		key: 'displayOtpErrorMsg',
		value: function displayOtpErrorMsg() {
			if (this.state.otpErrorMsg) {
				return React.createElement(
					'div',
					{ className: 'alert-danger' },
					this.state.otpErrorMsg
				);
			}
		}
	}, {
		key: 'setOtp',
		value: function setOtp(value) {
			this.setState({ otp: value });
		}
	}, {
		key: 'updateUserDetails',
		value: function updateUserDetails(idToken) {
			var body = {
				phone: this.state.phoneNumber
			};
			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/update-user-details";
			axios.post(url, body, { headers: headers }).then(function (res) {
				console.log("update user details response ==>", res);
			}).catch(function (error) {
				console.log("error in update user details ==>", error);
			});
		}
	}, {
		key: 'verifyOtp',
		value: function verifyOtp() {
			var _this4 = this;

			window.addCartLoader();
			this.setState({ showOtpLoader: true, disableButtons: true, otpErrorMsg: '' });
			this.state.confirmationResult.confirm(this.state.otp).then(function (res) {
				res.user.getIdToken().then(function (idToken) {
					_this4.fetchAddresses(idToken);
				});
			}).catch(function (error) {
				window.removeCartLoader();
				var msg = error.message ? error.message : error;
				_this4.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
				console.log("error in otp verification ==>", error);
			});
		}
	}, {
		key: 'fetchAddresses',
		value: function fetchAddresses(idToken) {
			var _this5 = this;

			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/get-addresses";
			axios.get(url, { headers: headers }).then(function (res) {
				_this5.closeSignInSlider();
				_this5.hideVerifyOtpSlider();
				// this.showGpsSlider();
				window.updateAddresses(res.data.addresses);
				window.removeCartLoader();
			}).catch(function (error) {
				window.removeCartLoader();
				console.log("error in fetch addresses ==>", error);
				var msg = error.message ? error.message : error;
				_this5.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
			});
		}
	}, {
		key: 'hideVerifyOtpSlider',
		value: function hideVerifyOtpSlider() {
			document.querySelector('#otp').classList.remove('visible');
		}
	}, {
		key: 'closeSignInSlider',
		value: function closeSignInSlider() {
			document.querySelector('#phone_number').classList.remove('visible');
		}
	}, {
		key: 'resendOtpCode',
		value: function resendOtpCode() {
			var _this6 = this;

			this.setState({ showCapta: true }, function () {
				console.log("inside verify otp code");
				window.addCartLoader();
				var phone_number = "+91" + _this6.state.phoneNumber;
				if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button-capta', {
					'size': 'invisible',
					'callback': function callback(response) {
						// reCAPTCHA solved, allow signInWithPhoneNumber.
					}
				});

				firebase.auth().signInWithPhoneNumber(phone_number, window.recaptchaVerifier).then(function (confirmationResult) {
					window.removeCartLoader();
					console.log("SMS sent.");
					_this6.setState({ confirmationResult: confirmationResult, showCapta: false });
				}).catch(function (error) {
					window.removeCartLoader();
					var msg = error.message ? error.message : error;
					_this6.setState({ disableButtons: false, otpErrorMsg: msg, showCapta: false });
				});
			});
		}
	}, {
		key: 'skipOtp',
		value: function skipOtp() {}
	}, {
		key: 'showGpsSlider',
		value: function showGpsSlider() {
			window.showGpsModalPrompt(true);
		}
	}]);

	return verifyOtp;
}(React.Component);

var otpContainer = document.querySelector('#react-verify-otp-container');
var otpModalComponent = ReactDOM.render(e(verifyOtp), otpContainer);

window.showOTPSlider = function (data) {
	console.log("check show otp modal==>");
	otpModalComponent.setState({ phoneNumber: '', otp: '', confirmationResult: '', disableButtons: false, errorMessage: '', showOtpLoader: false, otpErrorMsg: '' });
	document.querySelector('#otp').classList.add('visible');
};

window.updateOtpSLider = function (confirmationResult, phone_number) {
	otpModalComponent.setState({ phoneNumber: phone_number, confirmationResult: confirmationResult });
};