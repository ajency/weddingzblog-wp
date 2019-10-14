'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var addToCart = function (_React$Component) {
	_inherits(addToCart, _React$Component);

	function addToCart(props) {
		_classCallCheck(this, addToCart);

		var _this = _possibleConstructorReturn(this, (addToCart.__proto__ || Object.getPrototypeOf(addToCart)).call(this, props));

		_this.state = {
			apiEndPoint: 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			// apiEndPoint : 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			addToCartInProgress: false
		};
		return _this;
	}

	_createClass(addToCart, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'button',
				{ className: 'btn-primary', style: btnStyle, onClick: function onClick() {
						return _this2.addToCart();
					}, disabled: this.state.addToCartInProgress },
				this.getButtonContent()
			);
		}
	}, {
		key: 'getButtonContent',
		value: function getButtonContent() {
			if (this.state.addToCartInProgress) {
				return React.createElement(
					'div',
					{ 'class': 'btn-icon' },
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			return React.createElement(
				'span',
				null,
				'ADD'
			);
		}
	}, {
		key: 'addToCart',
		value: function addToCart() {
			var _this3 = this;

			this.setState({ addToCartInProgress: true });
			var cart_id = this.getCookie('cart_id');
			if (cart_id) {
				this.addToCartApiCall(null, cart_id);
			} else {
				this.getGeolocation().then(function (res) {
					_this3.addToCartApiCall(res);
				}).catch(function (error) {
					_this3.setState({ addToCartInProgress: false });
					console.log("error ==>", error);
					_this3.displayError(error);
				});
			}
		}
	}, {
		key: 'addToCartApiCall',
		value: function addToCartApiCall() {
			var _this4 = this;

			var lat_long = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var cart_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			console.log("inside add to cart ", lat_long, cart_id);
			var url = this.state.apiEndPoint + "/anonymous/cart/insert";
			var body = {
				variant_id: this.props.variant_id,
				quantity: 1,
				lat_long: lat_long
			};
			if (cart_id) body.cart_id = cart_id;

			console.log("body ==>", body);

			axios.post(url, body).then(function (res) {
				console.log("add to cart response ==>", res);
				if (res.data.success) {
					window.updateViewCartCompoent(res.data);
					if (!cart_id && res.data.cart_id) document.cookie = "cart_id=" + res.data.cart_id + ";path=/";
				} else {
					_this4.displayError(res.data.message);
				}
				_this4.setState({ addToCartInProgress: false });
			}).catch(function (error) {
				console.log("error in add to cart ==>", error);
				_this4.setState({ addToCartInProgress: false });
				var msg = error && error.message ? error.message : error;
				_this4.displayError(msg);
			});
		}
	}, {
		key: 'displayError',
		value: function displayError(msg) {
			document.querySelector('#failure-toast').innerHTML = msg;
			document.querySelector('#failure-toast').classList.remove('d-none');
			setTimeout(function () {
				document.querySelector('#failure-toast').classList.add('d-none');
			}, 3000);
		}
	}, {
		key: 'getGeolocation',
		value: function getGeolocation() {
			return new Promise(function (resolve, reject) {
				var geoOptions = {
					maximumAge: 30 * 60 * 1000,
					timeout: 10 * 1000
				};
				if ("geolocation" in navigator) {
					navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
						if (result.state === 'granted') {
							console.log("granted");
							navigator.geolocation.getCurrentPosition(function (position) {
								console.log("position ==>", position.coords);
								resolve([position.coords.latitude, position.coords.longitude]);
							}, function (geoError) {
								console.log("error in getting geolocation", geoError);
								if (geoError.PositionError.code === 1) {
									// permission denied
									reject(new Error('Location permission denied'));
								} else {
									// other errors
									reject(new Error('Error while accessing location permission'));
								}
							}, geoOptions);
						} else {
							console.log("prompt");
							window.updategpsModalPromptComponent(true);
							var timer = setInterval(function () {
								if (window.lat_lng) {
									clearInterval(timer);
									resolve(window.lat_lng);
								}
							}, 500);
						}
					});
				} else {
					console.log("inside else");
					//Show the modal prompt to use gps for location
					reject(new Error('geolocation not available on your device'));
				}
			});
		}
	}, {
		key: 'getCookie',
		value: function getCookie(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}
	}]);

	return addToCart;
}(React.Component);

// Find all DOM containers, and render add-to-cart buttons into them.


document.querySelectorAll('.react-add-to-cart-container').forEach(function (domContainer) {
	var variant_id = domContainer.dataset.variant_id;
	ReactDOM.render(e(addToCart, { variant_id: variant_id }), domContainer);
});