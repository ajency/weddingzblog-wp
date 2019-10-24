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
											return _this2.showGpsSlider();
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
	}, {
		key: 'checkUserExist',
		value: function checkUserExist() {
			var _this4 = this;

			this.setState({ disableButtons: true, showSignInLoader: true });
			var url = this.state.apiEndPoint + "/check-user-exist";
			var body = {
				phone_number: this.state.phoneNumber
			};
			axios.get(url, { params: body }).then(function (res) {
				_this4.signInWithPhoneNumber();
			}).catch(function (error) {
				console.log("error in check user exist ==>", error);
				_this4.signInAnonymously();
			});
		}
	}, {
		key: 'signInWithPhoneNumber',
		value: function signInWithPhoneNumber() {
			var _this5 = this;

			var phone_number = "+91" + this.state.phoneNumber;
			var recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
				'size': 'invisible',
				'callback': function callback(response) {
					onSignInSubmit();
				}
			});

			firebase.auth().signInWithPhoneNumber(phone_number, recaptchaVerifier).then(function (confirmationResult) {
				console.log("SMS sent.");
				_this5.setState({ confirmationResult: confirmationResult });
				_this5.hideSignInPopUp(); // TODO : function to hide this popup 
				_this5.showOtpSlider(); // TODO : Show the otp in slider // pass confirmation-result and mobile number to otp component
			}).catch(function (error) {
				console.log("Error :  SMS not sent", error);
				this.setState({ errorMessage: error, disableButtons: false, showSignInLoader: false });
			});
		}
	}, {
		key: 'signInAnonymously',
		value: function signInAnonymously() {
			var _this6 = this;

			firebase.auth().signInAnonymously().then(function (res) {
				res.user.getIdToken().then(function (idToken) {
					_this6.updateUserDetails(idToken);
				});
				_this6.showGpsSlider();
			}).catch(function (error) {
				console.log("error in anonymouse sign in", error);
				_this6.setState({ errorMessage: error, disableButtons: false, showSignInLoader: false });
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
		key: 'showGpsSlider',
		value: function showGpsSlider() {
			// $('#signInModalPrompt').modal('hide');
			window.showGpsModalPrompt(true);
		}
	}, {
		key: 'hideSignInPopUp',
		value: function hideSignInPopUp() {}
	}, {
		key: 'showOtpSlider',
		value: function showOtpSlider() {}
	}]);

	return signInModal;
}(React.Component);

var domContainer = document.querySelector('#react-sign-in-container');
var signInModalComponent = ReactDOM.render(e(signInModal), domContainer);

window.showSignInModal = function (data) {
	signInModalComponent.setState({ phoneNumber: '', otp: '', confirmationResult: '', disableButtons: false, showSignInLoader: false, errorMessage: '', showOtpLoader: false, otpErrorMsg: '' });
	$('#signInModalPrompt').modal('show');
};