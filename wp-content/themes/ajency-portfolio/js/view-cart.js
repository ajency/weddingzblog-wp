'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var divStyle = {
	display: 'flex',
	'justify-content': 'space-between',
	'background': '#A3DE9A'
};

var btnStyle = {
	cursor: 'pointer'
};

var viewCart = function (_React$Component) {
	_inherits(viewCart, _React$Component);

	function viewCart(props) {
		_classCallCheck(this, viewCart);

		var _this = _possibleConstructorReturn(this, (viewCart.__proto__ || Object.getPrototypeOf(viewCart)).call(this, props));

		_this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			cart: null
		};
		return _this;
	}

	_createClass(viewCart, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.fetchCart();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ style: divStyle, className: !this.state.cart || !this.state.cart.cart_count ? 'd-none' : '' },
				this.getItemsCount(),
				this.getCartTotal(),
				React.createElement(
					'div',
					{ id: 'view-cart-btn', style: btnStyle, onClick: function onClick() {
							return _this2.loadCart();
						} },
					'VIEW CART'
				)
			);
		}
	}, {
		key: 'getItemsCount',
		value: function getItemsCount() {
			if (this.state.cart && this.state.cart.cart_count) {
				return React.createElement(
					'div',
					null,
					this.state.cart.cart_count,
					' Item(s)'
				);
			}
		}
	}, {
		key: 'getCartTotal',
		value: function getCartTotal() {
			if (this.state.cart && this.state.cart.cart_count) {
				return React.createElement(
					'div',
					null,
					'\u20B9 ',
					this.state.cart.summary.sale_price_total
				);
			}
		}
	}, {
		key: 'loadCart',
		value: function loadCart() {
			var url = window.location.href.split("#")[0] + '#/cart';
			window.location = url;
		}
	}, {
		key: 'fetchCart',
		value: function fetchCart() {
			var _this3 = this;

			var cart_id = window.getCookie('cart_id');
			if (cart_id) {
				var url = this.state.apiEndPoint + "/anonymous/cart/fetch";
				var body = {
					cart_id: cart_id
				};
				axios.get(url, { params: body }).then(function (res) {
					_this3.setState({ cart: res.data.cart });
					res.data.cart.items.forEach(function (item) {
						window.updateaddToCartComponent(item);
					});
				}).catch(function (error) {
					console.log("error in fetch cart ==>", error);
				});
			}
		}
	}]);

	return viewCart;
}(React.Component);

var domContainer = document.querySelector('#react-view-cart-container');
var ViewCartComponent = ReactDOM.render(e(viewCart), domContainer);

window.updateViewCartCompoent = function (cartValue) {
	console.log("inside updateViewCartCompoent", cartValue);
	ViewCartComponent.setState({ cart: cartValue });
};