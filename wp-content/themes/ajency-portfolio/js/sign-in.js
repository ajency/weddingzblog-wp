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
			errorMessage: '',
			showOtpLoader: false,
			otpErrorMsg: ''
		};
		return _this;
	}

	_createClass(signInModal, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'modal fade', id: 'signInModalPrompt', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true', 'data-backdrop': 'static' },
					React.createElement(
						'div',
						{ className: 'modal-dialog modal-dialog-centered', role: 'document' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'button',
								{ type: 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-label': 'Close', disabled: this.state.disableButtons, onClick: function onClick() {
										return _this2.modalClosed();
									} },
								React.createElement(
									'span',
									{ 'aria-hidden': 'true' },
									'\xD7'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-5' },
								React.createElement(
									'h2',
									null,
									'ADD DELIVERY ADDRESS'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-3' },
								React.createElement(
									'h3',
									null,
									' Add your delivery address to proceed '
								),
								React.createElement(
									'p',
									null,
									' To add this item to your cart, please set your delivery location '
								),
								React.createElement(
									'button',
									{ onClick: function onClick() {
											return _this2.showGpsModal();
										}, disabled: this.state.disableButtons },
									'Set Location'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-3' },
								React.createElement(
									'h3',
									null,
									'Or enter your Mobile Number to order again'
								),
								React.createElement(
									'p',
									null,
									' If you have already ordered with us, kindly add your phone number '
								),
								React.createElement('input', { className: 'mobile-input', type: 'text', onKeyDown: function onKeyDown(e) {
										_this2.validateMobile(e);
									}, onChange: function onChange(e) {
										_this2.setUserMobile(e.target.value);
									} }),
								' ',
								React.createElement('br', null),
								this.getSignInButtons(),
								React.createElement('div', { className: 'd-none', id: 'sign-in-button' })
							),
							this.displaySignInErrorMsg()
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'modal fade', id: 'verifyOtpPrompt', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true', 'data-backdrop': 'static' },
					React.createElement(
						'div',
						{ className: 'modal-dialog modal-dialog-centered', role: 'document' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'button',
								{ type: 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-label': 'Close', onClick: function onClick() {
										return _this2.modalClosed();
									} },
								React.createElement(
									'span',
									{ 'aria-hidden': 'true' },
									'\xD7'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-5' },
								React.createElement(
									'h2',
									null,
									'Verify Mobile'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-3' },
								React.createElement(
									'p',
									null,
									' Enter the 6 digit code sent to the below number '
								)
							),
							React.createElement(
								'div',
								{ className: 'p-3' },
								this.state.phoneNumber,
								React.createElement('input', { className: 'mobile-input', type: 'tel', onChange: function onChange(e) {
										_this2.setOtp(e.target.value);
									} })
							),
							React.createElement(
								'div',
								null,
								React.createElement(
									'p',
									null,
									'Didn\'t receive the code ? ',
									React.createElement(
										'a',
										{ onClick: function onClick() {
												_this2.resendOtpCode();
											} },
										'RESEND CODE'
									)
								)
							),
							React.createElement(
								'div',
								null,
								this.getOtpButtons()
							),
							this.displayOtpErrorMsg()
						)
					)
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
				null,
				React.createElement(
					'button',
					null,
					'Skip Sign In'
				),
				React.createElement(
					'button',
					{ onClick: function onClick() {
							return _this3.checkUserExist();
						}, disabled: this.state.phoneNumber.length < 10 },
					'Proceed To Sign In'
				)
			);
		}
	}, {
		key: 'getOtpButtons',
		value: function getOtpButtons() {
			var _this4 = this;

			if (this.state.showOtpLoader) {
				return React.createElement(
					'div',
					{ 'class': 'btn-icon' },
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ onClick: function onClick() {
							_this4.skipOtp();
						} },
					'SKIP OTP'
				),
				React.createElement(
					'button',
					{ onClick: function onClick() {
							_this4.verifyOtp();
						}, disabled: this.state.otp.length < 6 },
					'VERIFY OTP'
				)
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
		key: 'setUserMobile',
		value: function setUserMobile(value) {
			this.setState({ phoneNumber: value });
		}
	}, {
		key: 'setOtp',
		value: function setOtp(value) {
			this.setState({ otp: value });
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
	}, {
		key: 'checkUserExist',
		value: function checkUserExist() {
			var _this5 = this;

			this.setState({ disableButtons: true, showSignInLoader: true });
			console.log("mobile number ==>", this.state.phoneNumber);
			var url = this.state.apiEndPoint + "/check-user-exist";
			var body = {
				phone_number: this.state.phoneNumber
			};
			axios.get(url, { params: body }).then(function (res) {
				console.log("check user exist response ==>", res);
				_this5.signInWithPhoneNumber();
			}).catch(function (error) {
				console.log("error in check user exist ==>", error);
				_this5.signInAnonymously();
			});
		}
	}, {
		key: 'signInWithPhoneNumber',
		value: function signInWithPhoneNumber() {
			var _this6 = this;

			var phone_number = "+91" + this.state.phoneNumber;
			var recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
				'size': 'invisible',
				'callback': function callback(response) {
					onSignInSubmit();
				}
			});

			firebase.auth().signInWithPhoneNumber(phone_number, recaptchaVerifier).then(function (confirmationResult) {
				console.log("SMS sent.");
				_this6.setState({ confirmationResult: confirmationResult });
				$('#signInModalPrompt').modal('hide');
				$('#verifyOtpPrompt').modal('show');
			}).catch(function (error) {
				console.log("Error :  SMS not sent", error);
				this.setState({ errorMessage: error, disableButtons: false, showSignInLoader: false });
			});
		}
	}, {
		key: 'signInAnonymously',
		value: function signInAnonymously() {
			var _this7 = this;

			console.log("inside signInAnonymously", firebase);

			firebase.auth().signInAnonymously().then(function (res) {
				console.log("anonymouse sign in success ==>", res);
				res.user.getIdToken().then(function (idToken) {
					// console.log("idtoken ==>",idToken);
					_this7.updateUserDetails(idToken);
				});
				_this7.showGpsModal();
			}).catch(function (error) {
				console.log("error in anonymouse sign in", error);
				_this7.setState({ errorMessage: error, disableButtons: false, showSignInLoader: false });
			});
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
			var _this8 = this;

			console.log("inside verify otp");
			this.setState({ showOtpLoader: true, disableButtons: true, otpErrorMsg: '' });
			this.state.confirmationResult.confirm(this.state.otp).then(function (res) {
				console.log("otp verification res ==>", res);
				res.user.getIdToken().then(function (idToken) {
					// console.log("idtoken ==>",idToken);
					_this8.fetchAddresses(idToken);
				});
			}).catch(function (error) {
				var msg = error.message ? error.message : error;
				_this8.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
				console.log("error in otp verification ==>", error);
			});
		}
	}, {
		key: 'fetchAddresses',
		value: function fetchAddresses(idToken) {
			var _this9 = this;

			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/get-addresses";
			axios.get(url, { headers: headers }).then(function (res) {
				console.log("fetch addresses response ==>", res);
				$('#verifyOtpPrompt').modal('hide');
				_this9.showGpsModal(res.data.addresses);
			}).catch(function (error) {
				console.log("error in fetch addresses ==>", error);
				var msg = error.message ? error.message : error;
				_this9.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
			});
		}
	}, {
		key: 'resendOtpCode',
		value: function resendOtpCode() {
			console.log("inside verify otp code");
		}
	}, {
		key: 'skipOtp',
		value: function skipOtp() {}
	}, {
		key: 'showGpsModal',
		value: function showGpsModal() {
			var addresses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			$('#signInModalPrompt').modal('hide');
			window.showGpsModalPrompt(true, addresses);
		}
	}]);

	return signInModal;
}(React.Component);

var domContainer = document.querySelector('#react-sign-in-container');
var signInModalComponent = ReactDOM.render(e(signInModal), domContainer);

window.showSignInModal = function (data) {
	signInModalComponent.setState({ phoneNumber: '', otp: '', confirmationResult: '', disableButtons: false, showSignInLoader: false, errorMessage: '', showOtpLoader: false, otpErrorMsg: '' });
	$('#signInModalPrompt').modal('show');
};