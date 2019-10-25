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
			quantity: 0,
			lastSelected: '',
			items: [],
			selectedVariant: ''
		};
		return _this;
	}

	_createClass(addToCart, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({ selectedVariant: this.props.product_data.default.id });
			variantModals[this.props.product_data.product_id] = document.querySelector('#variantSelectionModal-' + this.props.product_data.product_id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				this.getButtonContent(),
				React.createElement(
					'div',
					{ className: 'custom-modal', id: 'variantSelectionModal-' + this.props.product_data.product_id },
					React.createElement(
						'div',
						{ className: 'custom-modal-content p-4' },
						React.createElement(
							'div',
							{ className: 'product-variant text-left' },
							React.createElement(
								'div',
								{ className: 'product-variant-title text-grey font-size-18 letter-spacing-5 mb-3', title: 'Noodle Salad Bowl' },
								React.createElement('img', { src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/products/bowl-icon.png', className: 'mr-3', alt: 'Bowl icon' }),
								this.props.product_data.title
							),
							React.createElement(
								'div',
								{ className: 'font-size-15 text-black mb-3 ft6' },
								'Choose your Bowl'
							),
							React.createElement(
								'div',
								{ className: 'variant-list' },
								this.getVariants()
							)
						),
						React.createElement(
							'div',
							{ className: 'custom-modal-footer text-right' },
							React.createElement(
								'button',
								{ type: 'button', className: 'btn-reset btn-back font-size-15 text-grey text-uppercase mr-5', onClick: function onClick() {
										return _this2.hideVariantModal();
									} },
								'Back'
							),
							React.createElement(
								'button',
								{ type: 'button', className: 'btn-reset btn-continue font-size-15 text-uppercase', onClick: function onClick() {
										return _this2.addToCart(_this2.state.selectedVariant);
									} },
								'Continue'
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'modal fade', id: 'repeatLast-' + this.props.product_data.product_id, tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true', 'data-backdrop': 'static' },
					React.createElement(
						'div',
						{ className: 'modal-dialog modal-dialog-centered', role: 'document' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'button',
								{ type: 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
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
									'Repeat last used customization?'
								)
							),
							React.createElement(
								'div',
								{ className: 'p-3' },
								React.createElement(
									'h3',
									null,
									this.getLastSelected()
								)
							),
							React.createElement(
								'div',
								{ className: 'd-flex justify-content-between' },
								React.createElement(
									'button',
									{ className: 'btn btn-primary', onClick: function onClick() {
											return _this2.showVariantModal();
										} },
									' I\'ll Choose '
								),
								React.createElement(
									'button',
									{ className: 'btn btn-primary', onClick: function onClick() {
											return _this2.addToCart(_this2.state.lastSelected);
										} },
									' Repeat Last '
								)
							)
						)
					)
				)
			);
		}
	}, {
		key: 'getVariants',
		value: function getVariants() {
			var _this3 = this;

			var variants = this.props.product_data.variants.map(function (variant) {
				return React.createElement(
					'div',
					{ key: variant.id, className: 'list-item' },
					React.createElement(
						'label',
						{ className: 'custom-radio-btn font-size-15 text-grey mb-4' },
						React.createElement(
							'span',
							{ className: "mw-70 " + (_this3.state.selectedVariant == variant.id ? 'text-primary' : '') },
							variant.size
						),
						' ',
						variant.sale_price,
						React.createElement('input', { type: 'radio', name: "variant-" + _this3.props.product_data.product_id, value: variant.id, checked: _this3.state.selectedVariant == variant.id, onChange: function onChange(event) {
								return _this3.handleOptionChange(event);
							} }),
						React.createElement('span', { className: 'checkmark' })
					)
				);
			});
			return variants;
		}
	}, {
		key: 'showVariantModal',
		value: function showVariantModal() {
			// $('#repeatLast-' + this.props.product_data.product_id).modal('hide');
			this.setState({ selectedVariant: this.props.product_data.default.id });
			document.querySelector('#variantSelectionModal-' + this.props.product_data.product_id).classList.add('show-modal');
		}
	}, {
		key: 'hideVariantModal',
		value: function hideVariantModal() {
			document.querySelector('#variantSelectionModal-' + this.props.product_data.product_id).classList.remove('show-modal');
		}
	}, {
		key: 'getLastSelected',
		value: function getLastSelected() {
			var _this4 = this;

			var last_selected = this.props.product_data.variants.find(function (variant) {
				return variant.id == _this4.state.lastSelected;
			});
			if (last_selected) return React.createElement(
				'div',
				null,
				' Size : ',
				last_selected.size,
				' '
			);
		}
	}, {
		key: 'handleOptionChange',
		value: function handleOptionChange(event) {
			this.setState({ selectedVariant: event.target.value });
		}
	}, {
		key: 'getButtonContent',
		value: function getButtonContent() {
			var _this5 = this;

			if (this.state.apiCallInProgress) {
				return React.createElement(
					'div',
					{ 'class': 'btn-icon' },
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}
			if (this.state.quantity == 0) return React.createElement(
				'a',
				{ className: 'btn-add-to-cart btn-add-to-cart-desktop text-primary border-radius-4 border-white text-decoration-none m-0 font-size-25 ft6 cursor-pointer', onClick: function onClick() {
						return _this5.checkVariant('add');
					}, disabled: this.state.apiCallInProgress },
				'Add to cart'
			);

			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ className: 'btn-primary', style: btnStyle, onClick: function onClick() {
							return _this5.checkVariant('remove');
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
							return _this5.checkVariant('add');
						}, disabled: this.state.apiCallInProgress },
					'+'
				)
			);
		}
	}, {
		key: 'checkVariant',
		value: function checkVariant(action) {
			if (this.props.product_data.variants.length == 1) {
				action == 'add' ? this.addToCart(this.props.product_data.variants[0].id) : this.removeFromCart(this.props.product_data.variants[0].id);
			} else {
				if (action == 'add') {
					// if(this.state.items.length){
					// 	$('#repeatLast-' + this.props.product_data.product_id).modal('show');
					// }
					// else{
					this.showVariantModal();
					// }
				} else {
					if (this.state.items.length > 1) {
						var msg = "Item has multiple variants added. Remove correct item from cart";
						this.displayError(msg);
					} else {
						this.removeFromCart(this.state.items[0].variant_id);
					}
				}
			}
		}
	}, {
		key: 'addToCart',
		value: function addToCart() {
			var _this6 = this;

			var variant_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			// $('#repeatLast-' + this.props.product_data.product_id).modal('hide');
			this.hideVariantModal();
			this.setState({ apiCallInProgress: true });
			var cart_id = window.getCookie('cart_id');
			if (cart_id) {
				this.addToCartApiCall(variant_id, null, cart_id);
			} else if (window.lat_lng) {
				this.addToCartApiCall(variant_id, window.lat_lng, null, window.formatted_address);
			} else {
				this.getGeolocation().then(function (res) {
					_this6.addToCartApiCall(variant_id, window.lat_lng, null, window.formatted_address);
				}).catch(function (error) {
					_this6.setState({ apiCallInProgress: false });
					console.log("error ==>", error);
					_this6.displayError(error);
				});
			}
		}
	}, {
		key: 'removeFromCart',
		value: function removeFromCart() {
			var _this7 = this;

			var variant_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			this.setState({ apiCallInProgress: true });
			var url = this.state.apiEndPoint + "/anonymous/cart/delete";
			// let url = "https://demo8558685.mockable.io/remove-from-cart";
			var body = {
				variant_id: variant_id,
				quantity: 1,
				cart_id: window.getCookie('cart_id')
			};

			axios.post(url, body).then(function (res) {
				if (res.data.success) {
					_this7.displaySuccess("Successfully removed from cart");
					var item = {
						variant_id: variant_id,
						quantity: 1
					};
					_this7.removeItems(item);
					window.updateViewCartCompoent(res.data);
				} else {
					_this7.displayError(res.data.message);
				}
				_this7.setState({ apiCallInProgress: false });
			}).catch(function (error) {
				console.log("error in add to cart ==>", error);
				_this7.setState({ apiCallInProgress: false });
				var msg = error && error.message ? error.message : error;
				_this7.displayError(msg);
			});
		}
	}, {
		key: 'addToCartApiCall',
		value: function addToCartApiCall() {
			var variant_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var lat_long = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var _this8 = this;

			var cart_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var formatted_address = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

			var url = this.state.apiEndPoint + "/anonymous/cart/insert";
			var body = {
				variant_id: variant_id,
				quantity: 1,
				lat_long: lat_long,
				formatted_address: formatted_address
			};
			if (cart_id) body.cart_id = cart_id;

			axios.post(url, body).then(function (res) {
				if (res.data.success) {
					_this8.addItems(res.data.item);
					window.updateViewCartCompoent(res.data);
					_this8.displaySuccess("Successfully added to cart");
					if (!cart_id && res.data.cart_id) document.cookie = "cart_id=" + res.data.cart_id + ";path=/";
				} else {
					_this8.displayError(res.data.message);
				}
				_this8.setState({ apiCallInProgress: false });
			}).catch(function (error) {
				console.log("error in add to cart ==>", error);
				_this8.setState({ apiCallInProgress: false });
				var msg = error && error.message ? error.message : error;
				_this8.displayError(msg);
			});
		}
	}, {
		key: 'addItems',
		value: function addItems(item) {
			var items = this.state.items;
			var updated_item_index = items.findIndex(function (i) {
				return i.variant_id == item.variant_id;
			});
			if (updated_item_index !== -1) {
				items[updated_item_index].quantity += item.quantity;
			} else {
				items.push(item);
			}
			var quantity = this.state.quantity + item.quantity;
			this.setState({ quantity: quantity, items: items, lastSelected: item.variant_id });
		}
	}, {
		key: 'removeItems',
		value: function removeItems(item) {
			var items = this.state.items;
			var updated_item_index = items.findIndex(function (i) {
				return i.variant_id == item.variant_id;
			});
			var last_selected = '',
			    quantity = this.state.quantity - item.quantity;
			if (updated_item_index !== -1) {
				items[updated_item_index].quantity -= item.quantity;
			}
			if (items[updated_item_index].quantity == 0) {
				items.splice(updated_item_index, 1);
			}
			if (items.length == 1) {
				last_selected = items[0].variant_id;
			}
			this.setState({ quantity: quantity, items: items, lastSelected: last_selected });
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
		key: 'displaySuccess',
		value: function displaySuccess(msg) {
			document.querySelector('#success-toast').innerHTML = msg;
			document.querySelector('#success-toast').classList.remove('d-none');
			setTimeout(function () {
				document.querySelector('#success-toast').classList.add('d-none');
			}, 3000);
		}
	}, {
		key: 'getGeolocation',
		value: function getGeolocation() {
			return new Promise(function (resolve, reject) {
				window.showSignInModal(true);
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
var variantModals = [];
// Find all DOM containers, and render add-to-cart buttons into them.
document.querySelectorAll('.react-add-to-cart-container').forEach(function (domContainer, index) {
	var product_data = JSON.parse(domContainer.dataset.product_data);
	addToCartComponents[index] = ReactDOM.render(e(addToCart, { product_data: product_data }), domContainer);
});

function toggleModal(modal) {
	modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
	for (var i in variantModals) {
		if (event.target === variantModals[i]) toggleModal(variantModals[i]);
	}
}

window.addEventListener("click", windowOnClick);

window.updateaddToCartComponent = function (item) {
	addToCartComponents.forEach(function (component) {
		if (component.props.product_data.product_id == item.product_id) {
			var items = component.state.items;
			items.push(item);
			items.sort(function (a, b) {
				return b.timestamp._seconds - a.timestamp._seconds;
			});
			var last_added = items[0].variant_id;
			var qty = 0;
			items.forEach(function (item) {
				qty += item.quantity;
			});
			component.setState({ items: items, lastSelected: last_added, quantity: qty });
		}
	});
};

window.updateItemQuantity = function (item, action) {
	console.log("updateItemQuantity ==>", item, action);
	addToCartComponents.forEach(function (component) {
		if (component.props.product_data.product_id == item.product_id) {
			if (action == 'add') component.addItems(item);else component.removeItems(item);
		}
	});
};