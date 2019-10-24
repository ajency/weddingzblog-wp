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
			otpErrorMsg: ''
		};
		return _this;
	}

	_createClass(verifyOtp, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'modal-content' },
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
						this.getOtpButtons()
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
					this.displayOtpErrorMsg()
				)
			);
		}
	}, {
		key: 'getOtpButtons',
		value: function getOtpButtons() {
			var _this3 = this;

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
							_this3.skipOtp();
						} },
					'SKIP OTP'
				),
				React.createElement(
					'button',
					{ onClick: function onClick() {
							_this3.verifyOtp();
						}, disabled: this.state.otp.length < 6 },
					'VERIFY OTP'
				)
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
		key: 'signInAnonymously',
		value: function signInAnonymously() {
			var _this4 = this;

			firebase.auth().signInAnonymously().then(function (res) {
				res.user.getIdToken().then(function (idToken) {
					_this4.updateUserDetails(idToken);
				});
				_this4.showGpsModal();
			}).catch(function (error) {
				console.log("error in anonymouse sign in", error);
				_this4.setState({ errorMessage: error, disableButtons: false, showSignInLoader: false });
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
			var _this5 = this;

			this.setState({ showOtpLoader: true, disableButtons: true, otpErrorMsg: '' });
			this.state.confirmationResult.confirm(this.state.otp).then(function (res) {
				res.user.getIdToken().then(function (idToken) {
					_this5.fetchAddresses(idToken);
				});
			}).catch(function (error) {
				var msg = error.message ? error.message : error;
				_this5.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
				console.log("error in otp verification ==>", error);
			});
		}
	}, {
		key: 'fetchAddresses',
		value: function fetchAddresses(idToken) {
			var _this6 = this;

			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/get-addresses";
			axios.get(url, { headers: headers }).then(function (res) {
				_this6.hideVerifyOtpSlider();
				_this6.showGpsSlider();
				window.updateAddresses(res.data.addresses);
			}).catch(function (error) {
				console.log("error in fetch addresses ==>", error);
				var msg = error.message ? error.message : error;
				_this6.setState({ showOtpLoader: false, disableButtons: false, otpErrorMsg: msg });
			});
		}
	}, {
		key: 'hideVerifyOtpSlider',
		value: function hideVerifyOtpSlider() {}
	}, {
		key: 'resendOtpCode',
		value: function resendOtpCode() {
			console.log("inside verify otp code");
		}
	}, {
		key: 'skipOtp',
		value: function skipOtp() {}
	}, {
		key: 'showGpsSlider',
		value: function showGpsSlider() {
			// $('#signInModalPrompt').modal('hide');
			window.showGpsModalPrompt(true);
		}
	}]);

	return verifyOtp;
}(React.Component);

var domContainer = document.querySelector('#react-sign-in-container');
var signInModalComponent = ReactDOM.render(e(verifyOtp), domContainer);

window.showSignInModal = function (data) {
	signInModalComponent.setState({ phoneNumber: '', otp: '', confirmationResult: '', disableButtons: false, showSignInLoader: false, errorMessage: '', showOtpLoader: false, otpErrorMsg: '' });
	$('#signInModalPrompt').modal('show');
};