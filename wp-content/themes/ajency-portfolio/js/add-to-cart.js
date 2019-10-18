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
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			apiCallInProgress: false,
			quantity: 0
		};
		return _this;
	}

	_createClass(addToCart, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.getButtonContent()
			);
		}
	}, {
		key: 'getButtonContent',
		value: function getButtonContent() {
			var _this2 = this;

			if (this.state.apiCallInProgress) {
				return React.createElement(
					'div',
					{ 'class': 'btn-icon' },
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			if (this.state.quantity == 0) return React.createElement(
				'button',
				{ className: 'btn-primary', style: btnStyle, onClick: function onClick() {
						return _this2.addToCart();
					}, disabled: this.state.apiCallInProgress },
				'ADD'
			);

			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ className: 'btn-primary', style: btnStyle, onClick: function onClick() {
							return _this2.removeFromCart();
						}, disabled: this.state.apiCallInProgress },
					'-'
				),
				React.createElement(
					'span',
					{ className: 'm-1' },
					' ',
					this.state.quantity,
					' '
				),
				React.createElement(
					'button',
					{ className: 'btn-primary', style: btnStyle, onClick: function onClick() {
							return _this2.addToCart();
						}, disabled: this.state.apiCallInProgress },
					'+'
				)
			);
		}
	}, {
		key: 'addToCart',
		value: function addToCart() {
			var _this3 = this;

			this.setState({ apiCallInProgress: true });
			var cart_id = window.getCookie('cart_id');
			if (cart_id) {
				this.addToCartApiCall(null, cart_id);
			} else if (window.lat_lng) {
				this.addToCartApiCall(window.lat_lng, null, window.formatted_address);
			} else {
				this.getGeolocation().then(function (res) {
					_this3.addToCartApiCall(window.lat_lng, null, window.formatted_address);
				}).catch(function (error) {
					_this3.setState({ apiCallInProgress: false });
					console.log("error ==>", error);
					_this3.displayError(error);
				});
			}
		}
	}, {
		key: 'removeFromCart',
		value: function removeFromCart() {
			var _this4 = this;

			this.setState({ apiCallInProgress: true });
			var url = this.state.apiEndPoint + "/anonymous/cart/delete";
			// let url = "https://demo8558685.mockable.io/remove-from-cart";
			var body = {
				variant_id: this.props.variant_id,
				quantity: 1,
				cart_id: window.getCookie('cart_id')
			};

			axios.post(url, body).then(function (res) {
				console.log("add to cart response ==>", res);
				if (res.data.success) {
					var quantity = _this4.state.quantity - 1;
					_this4.setState({ quantity: quantity });
					window.updateViewCartCompoent(res.data);
				} else {
					_this4.displayError(res.data.message);
				}
				_this4.setState({ apiCallInProgress: false });
			}).catch(function (error) {
				console.log("error in add to cart ==>", error);
				_this4.setState({ apiCallInProgress: false });
				var msg = error && error.message ? error.message : error;
				_this4.displayError(msg);
			});
		}
	}, {
		key: 'addToCartApiCall',
		value: function addToCartApiCall() {
			var lat_long = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var _this5 = this;

			var cart_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var formatted_address = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			console.log("inside add to cart ", lat_long, cart_id);
			var url = this.state.apiEndPoint + "/anonymous/cart/insert";
			var body = {
				variant_id: this.props.variant_id,
				quantity: 1,
				lat_long: lat_long,
				formatted_address: formatted_address
			};
			if (cart_id) body.cart_id = cart_id;

			console.log("body ==>", body);

			axios.post(url, body).then(function (res) {
				console.log("add to cart response ==>", res);
				if (res.data.success) {
					var quantity = _this5.state.quantity + res.data.item.quantity;
					_this5.setState({ quantity: quantity });
					window.updateViewCartCompoent(res.data);
					if (!cart_id && res.data.cart_id) document.cookie = "cart_id=" + res.data.cart_id + ";path=/";
				} else {
					_this5.displayError(res.data.message);
				}
				_this5.setState({ apiCallInProgress: false });
			}).catch(function (error) {
				console.log("error in add to cart ==>", error);
				_this5.setState({ apiCallInProgress: false });
				var msg = error && error.message ? error.message : error;
				_this5.displayError(msg);
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
				window.updategpsModalPromptComponent(true);
				var timer = setInterval(function () {
					if (window.lat_lng) {
						clearInterval(timer);
						resolve();
					}
					if (window.modal_closed) {
						clearInterval(timer);
						window.modal_closed = false;
						reject("Please select location to add to cart");
					}
				}, 500);
			});
		}
	}]);

	return addToCart;
}(React.Component);

var addToCartComponents = [];
// Find all DOM containers, and render add-to-cart buttons into them.
document.querySelectorAll('.react-add-to-cart-container').forEach(function (domContainer, index) {
	console.log(index);
	var variant_id = domContainer.dataset.variant_id;
	addToCartComponents[index] = ReactDOM.render(e(addToCart, { variant_id: variant_id }), domContainer);
});

window.updateaddToCartComponent = function (item) {
	addToCartComponents.forEach(function (component) {
		if (component.props.variant_id == item.variant_id) {
			component.setState({ quantity: item.quantity });
		}
	});
};

window.updateItemQuantity = function (item) {
	addToCartComponents.forEach(function (component) {
		if (component.props.variant_id == item.variant_id) {
			var updated_quantity = component.state.quantity + item.quantity;
			console.log("updated quantity =>", updated_quantity, item, component.state.quantity);
			component.setState({ quantity: updated_quantity });
		}
	});
};