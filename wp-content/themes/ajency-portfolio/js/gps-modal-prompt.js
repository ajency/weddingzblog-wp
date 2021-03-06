'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
window.lat_lng = null; // store lat long in global varaible.
window.formatted_address = null; // store address to be displayed in global variable.
window.modal_closed = false; // used in add to cart component to resolve promise of geolocation.
var CancelToken = axios.CancelToken;
var cancel = void 0;
var debounceTimer = void 0;

var locationStyle = {
	'listStyle': 'none'
};

var gpsModalPrompt = function (_React$Component) {
	_inherits(gpsModalPrompt, _React$Component);

	function gpsModalPrompt(props) {
		_classCallCheck(this, gpsModalPrompt);

		var _this = _possibleConstructorReturn(this, (gpsModalPrompt.__proto__ || Object.getPrototypeOf(gpsModalPrompt)).call(this, props));

		_this.state = {
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			locations: [],
			locError: '',
			gpsError: '',
			fetchingGPS: false,
			searchText: '',
			addresses: '',
			showNoAddressMsg: false,
			settingUserLocation: false,
			notLoggedIn: false,
			showSignInBtn: false
		};
		firebase.auth().onAuthStateChanged(function (user) {
			console.log("check user ==>", user);
			if (user) {
				console.log("user found ==== setting showSign in button to false");
				_this.setState({ showSignInBtn: false });
			} else {
				_this.setState({ showSignInBtn: true });
			}

			if (user && !_this.state.notLoggedIn) {
				user.getIdToken().then(function (idToken) {
					_this.fetchAddresses(idToken);
				});
			} else {
				_this.setState({ notLoggedIn: true });
				console.log("no user");
			}
		});
		return _this;
	}

	_createClass(gpsModalPrompt, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ className: 'slide-in', id: 'gpsModal' },
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
								return _this2.closeGpsSlider();
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
					this.showSignInButton(),
					React.createElement(
						'h3',
						{ className: 'mt-4 h1 ft6' },
						'Add delivery address'
					),
					React.createElement(
						'h4',
						{ className: 'font-weight-light mt-4 pb-4' },
						'We currently serve at Panjim, Porvorim & its neighbourhood.'
					),
					React.createElement(
						'div',
						{ className: 'mb-3 pt-4' },
						this.showFetchLocationUsingGps()
					),
					React.createElement(
						'div',
						{ className: 'gps-error-msg' },
						this.checkGpsErrorMsg()
					),
					React.createElement(
						'div',
						{ className: 'test-center' },
						this.showLocationSearch()
					),
					React.createElement(
						'div',
						{ className: 'gps-error-msg' },
						this.checkLocationErrorMsg()
					),
					React.createElement(
						'ul',
						{ style: locationStyle, className: 'pl-0 h5 mb-0' },
						this.getAutoCompleteLocations()
					),
					this.getSavedAddresses(),
					this.getNoSavedAddressesMsg()
				)
			);
		}
	}, {
		key: 'showSignInButton',
		value: function showSignInButton() {
			var _this3 = this;

			if (this.state.showSignInBtn) {
				return React.createElement(
					'div',
					{ className: 'list-text-block p-3 mb-2 full-width-15' },
					React.createElement(
						'div',
						{ className: 'list-meta mt-0' },
						'If you have ordered with us before, ',
						React.createElement(
							'a',
							{ className: 'text-underline test-primary text-underline cursor-pointer', onClick: function onClick() {
									return _this3.showSignInScreen();
								} },
							'Sign in'
						),
						' to fetch saved addresses.'
					)
				);
			}
		}
	}, {
		key: 'checkGpsErrorMsg',
		value: function checkGpsErrorMsg() {
			if (this.state.gpsError) {
				return React.createElement(
					'div',
					{ className: 'alert-danger' },
					this.state.gpsError
				);
			}
		}
	}, {
		key: 'showLocationSearch',
		value: function showLocationSearch() {
			var _this4 = this;

			if (!this.state.settingUserLocation && !this.state.fetchingGPS) return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'text-center h4 mb-0 font-weight-light' },
					'-OR-'
				),
				React.createElement(
					'div',
					{ className: 'position-relative mb-3 mt-3 text-center' },
					React.createElement('input', { type: 'text', className: 'border-grey-2 w-100 rounded-0 p-3 h5 mb-0 plceholder-text', name: 'search', placeholder: 'Search Location', value: this.state.searchText, onChange: function onChange(e) {
							_this4.autoCompleteLocation(e.target.value);
						} }),
					React.createElement('img', { className: 'position-absolute-right20', src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/search.png' })
				)
			);
		}
	}, {
		key: 'showFetchLocationUsingGps',
		value: function showFetchLocationUsingGps() {
			var _this5 = this;

			if (this.state.fetchingGPS && !this.state.settingUserLocation) return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: '' },
					' Fetching current Location '
				),
				React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fas fa-circle-notch fa-spin fa-lg' })
				)
			);else if (!this.state.settingUserLocation) return React.createElement(
				'button',
				{ onClick: function onClick() {
						return _this5.getLocation();
					}, type: 'button', className: 'btn-reset btn-location text-grey border-green-2  w-100 p-3 text-left h5 mb-0 position-relative' },
				'Use Current Location ',
				React.createElement('img', { className: 'position-absolute-right20', src: 'http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/location.png' })
			);
		}
	}, {
		key: 'showAddressUpdateMsg',
		value: function showAddressUpdateMsg() {
			if (this.state.settingUserLocation) return React.createElement(
				'div',
				null,
				'Setting User location ...',
				React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fas fa-circle-notch fa-spin fa-lg' })
				)
			);
		}
	}, {
		key: 'getSavedAddresses',
		value: function getSavedAddresses() {
			var _this6 = this;

			if (this.state.addresses && this.state.addresses.length && !this.state.locations.length && !this.state.settingUserLocation && !this.state.fetchingGPS) {
				var addresses = this.state.addresses.map(function (address) {
					return React.createElement(
						'li',
						{ key: address.id, className: 'cursor-pointer address saved-address-item', onClick: function onClick() {
								return _this6.setUserLocations(address.address.lat_long, address.address.formatted_address);
							} },
						_this6.getAddressIcon(address.address.type),
						React.createElement(
							'div',
							{ className: 'address-text' },
							React.createElement(
								'h5',
								null,
								address.address.type
							),
							React.createElement(
								'span',
								{ className: ' font-weight-light h6' },
								address.address.address,
								', ',
								address.address.landmark,
								', ',
								address.address.city,
								', ',
								address.address.state,
								', ',
								address.address.pincode
							)
						)
					);
				});
				return React.createElement(
					'div',
					null,
					React.createElement(
						'h4',
						{ className: 'mt-4' },
						'Saved Addresses'
					),
					React.createElement(
						'ul',
						{ style: locationStyle, className: 'pl-0 mt-4' },
						addresses
					)
				);
			}
		}
	}, {
		key: 'getAddressIcon',
		value: function getAddressIcon(type) {
			console.log("type :  ", type);
			var src = "http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/map.png";
			if (type == 'home') src = "http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/home.png";else if (type == 'office') src = "http://greengrainbowl-com.digitaldwarve.staging.wpengine.com/wp-content/themes/ajency-portfolio/images/slidein/office.png";
			return React.createElement('img', { src: src, className: 'address-icon' });
		}
	}, {
		key: 'getAutoCompleteLocations',
		value: function getAutoCompleteLocations() {
			var _this7 = this;

			if (this.state.locations.length) {
				var locs = this.state.locations.map(function (loc) {
					return React.createElement(
						'li',
						{ key: loc.id, className: 'btn p-1', onClick: function onClick() {
								_this7.reverseGeocode(loc);
							} },
						loc.description
					);
				});
				this.scrollTop();
				return locs;
			}
			if (this.state.showLoader && !this.state.locations.length) {
				return React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fas fa-circle-notch fa-spin fa-lg' })
				);
			}

			if (!this.state.locations.length && this.state.searchText.length > 2) {
				return React.createElement(
					'div',
					null,
					'No results, please enter a valid street address'
				);
			}
		}
	}, {
		key: 'checkLocationErrorMsg',
		value: function checkLocationErrorMsg() {
			if (this.state.locError) {
				return React.createElement(
					'div',
					{ className: 'alert-danger' },
					this.state.locError
				);
			}
		}
	}, {
		key: 'getNoSavedAddressesMsg',
		value: function getNoSavedAddressesMsg() {
			if (this.state.showNoAddressMsg) return React.createElement(
				'div',
				{ 'class': 'list-text-block p-3 mb-2 full-width-15' },
				React.createElement(
					'div',
					{ 'class': 'list-meta mt-0' },
					'You have no saved addreses. Please set delivery location to continue.'
				)
			);
		}
	}, {
		key: 'scrollTop',
		value: function scrollTop() {
			setTimeout(function () {
				var objDiv = document.getElementById("gpsModal");
				objDiv.scrollTop = objDiv.scrollHeight;
			}, 100);
		}
	}, {
		key: 'closeGpsSlider',
		value: function closeGpsSlider() {
			window.modal_closed = true;
			this.setState({ searchText: '', locError: '', gpsError: '' });
			this.closeGpsModal();
		}
	}, {
		key: 'autoCompleteLocation',
		value: function autoCompleteLocation(value) {
			var _this8 = this;

			clearTimeout(debounceTimer);
			this.setState({ searchText: value });
			debounceTimer = setTimeout(function () {
				_this8.setState({ locError: '', showNoAddressMsg: false });
				if (value.length > 2) {
					var url = _this8.state.apiEndPoint + "/places-autocomplete";
					var body = {
						input: value
					};
					_this8.setState({ showLoader: true, locations: [] });
					cancel && cancel();
					axios.get(url, { params: body,
						cancelToken: new CancelToken(function (c) {
							cancel = c;
						})
					}).then(function (res) {
						_this8.setState({ showLoader: false });
						if (res.data.status === "OK") _this8.setState({ locations: res.data.predictions });else {
							//display error
							_this8.setState({ locError: res.data.error_message });
						}
					}).catch(function (error) {
						console.log("error in autoCompleteLocation ==>", error);
						// let msg = error.message ? error.message : error;
						// this.setState({locError : msg})
					});
				} else {
					_this8.setState({ locations: [] });
				}
			}, 500);
		}
	}, {
		key: 'reverseGeocode',
		value: function reverseGeocode() {
			var _this9 = this;

			var loc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var latlng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			this.setSliderLoader();
			this.setState({ locations: [], locError: '', settingUserLocation: true });
			var url = this.state.apiEndPoint + "/reverse-geocode";
			var body = {};
			if (loc) body.place_id = loc.place_id;else if (latlng) body.latlng = latlng[0] + ',' + latlng[1];

			axios.get(url, { params: body }).then(function (res) {
				if (res.data.status === "OK") {
					_this9.setState({ settingUserLocation: false, gpsError: '' });
					if (loc) _this9.setUserLocations([res.data.result.geometry.location.lat, res.data.result.geometry.location.lng], res.data.result.formatted_address);else if (latlng) _this9.setUserLocations(latlng, res.data.results[0].formatted_address);
				} else {
					_this9.removeSliderLoader();
					_this9.setState({ fetchingGPS: false, locError: res.data.error_message });
				}
			}).catch(function (error) {
				_this9.removeSliderLoader();
				_this9.setState({ fetchingGPS: false, settingUserLocation: false });
				console.log("error in autoCompleteLocation ==>", error);
				var msg = error.message ? error.message : error;
				_this9.setState({ locError: msg });
			});
		}
	}, {
		key: 'setUserLocations',
		value: function setUserLocations(lat_lng, formatted_address) {
			var _this10 = this;

			this.setSliderLoader();
			this.setState({ settingUserLocation: true });
			var cart_id = window.readFromLocalStorage('cart_id');
			if (cart_id) {
				var url = this.state.apiEndPoint + "/anonymous/cart/change-location";
				var body = {
					cart_id: cart_id,
					lat_long: lat_lng,
					formatted_address: formatted_address
				};
				axios.post(url, body).then(function (res) {
					_this10.removeSliderLoader();
					_this10.updateLocationUI(lat_lng, formatted_address);
					_this10.setState({ fetchingGPS: false, searchText: '', settingUserLocation: false });
					_this10.closeGpsModal();
				}).catch(function (error) {
					_this10.removeSliderLoader();
					_this10.setState({ fetchingGPS: false, settingUserLocation: false });
					console.log("error in updating cart location ==>", error);
					var msg = error.message ? error.message : error;
					_this10.setState({ locError: msg });
				});
			} else {
				this.removeSliderLoader();
				this.setState({ fetchingGPS: false, searchText: '', settingUserLocation: false });
				this.updateLocationUI(lat_lng, formatted_address);
				this.closeGpsModal();
			}
		}
	}, {
		key: 'updateLocationUI',
		value: function updateLocationUI(lat_lng, formatted_address) {
			// document.cookie = "lat_lng=" + lat_lng[0] + ',' +lat_lng[1] + ";path=/";
			// document.cookie = "formatted_address=" + formatted_address + ";path=/";
			window.writeInLocalStorage('lat_lng', lat_lng[0] + ',' + lat_lng[1]);
			window.writeInLocalStorage('formatted_address', formatted_address);
			window.lat_lng = lat_lng;
			window.formatted_address = formatted_address;
			document.querySelector("#selected-location-address").innerHTML = '<div>' + formatted_address + '</div><i class="fas fa-pencil-alt number-edit cursor-pointer"></i>';
			var cart_address = document.querySelector("#cart-delivery-address");
			if (cart_address) {
				cart_address.innerHTML = formatted_address;

				var cart_add_trigger = document.querySelector("#cart-address-change-trigger");
				if (cart_add_trigger && document.getElementById("root").classList.contains('active')) {
					cart_add_trigger.click();
				}
			}
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			var _this11 = this;

			this.setSliderLoader();
			this.setState({ locations: [], fetchingGPS: true });
			var geoOptions = {
				maximumAge: 30 * 60 * 1000,
				timeout: 20 * 1000,
				enableHighAccuracy: true
			};
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("position ==>", position.coords);
				_this11.reverseGeocode(null, [position.coords.latitude, position.coords.longitude]);
			}, function (geoError) {
				_this11.removeSliderLoader();
				_this11.setState({ fetchingGPS: false });
				console.log("error in getting geolocation", geoError);
				if (geoError.code === 1) {
					// permission denied
					_this11.setState({ gpsError: 'You have blocked Green Grain Bowl from tracking your location. To use this, change your location settings in browser.' });
				} else {
					// other errors
					_this11.setState({ gpsError: 'Error in getting current location using GPS' });
				}
			}, geoOptions);
		}
	}, {
		key: 'fetchAddresses',
		value: function fetchAddresses(idToken) {
			var _this12 = this;

			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/get-addresses";
			axios.get(url, { headers: headers }).then(function (res) {
				_this12.setState({ addresses: res.data.addresses });
				// this.setDefaultAddress(res.data.addresses)
			}).catch(function (error) {
				console.log("error in fetch addresses ==>", error);
			});
		}
	}, {
		key: 'setDefaultAddress',
		value: function setDefaultAddress(addresses) {
			if (!window.lat_lng) {
				var default_address = addresses.find(function (address) {
					return address.address.default;
				});
				console.log("check default address ==>", default_address);
				if (default_address) {
					this.setUserLocations(default_address.address.lat_long, default_address.address.formatted_address);
				}
			}
		}
	}, {
		key: 'closeGpsModal',
		value: function closeGpsModal() {
			document.querySelector('#gpsModal').classList.remove('visible');
			window.removeBackDrop();
		}
	}, {
		key: 'showSignInScreen',
		value: function showSignInScreen() {
			window.showSignInModal(true);
		}
	}, {
		key: 'setSliderLoader',
		value: function setSliderLoader() {
			window.addCartLoader();
			// document.querySelector('#react-add-delivery-address-container').classList.add('slider-loader');
		}
	}, {
		key: 'removeSliderLoader',
		value: function removeSliderLoader() {
			window.removeCartLoader();
			// document.querySelector('#react-add-delivery-address-container').classList.remove('slider-loader');
		}
	}]);

	return gpsModalPrompt;
}(React.Component);

var domContainer = document.querySelector('#react-add-delivery-address-container');
var gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);

window.showGpsModalPrompt = function (display) {
	var addresses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	gpsModalPromptComponent.setState({ showNoAddressMsg: false, locations: [], locError: '', gpsError: '', fetchingGPS: false, searchText: '', settingUserLocation: false });
	document.querySelector('#gpsModal').classList.add('visible');
	window.addBackDrop();
};

window.updateAddresses = function () {
	var addresses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	var showNoAddressMsg = false;
	if (addresses && !addresses.length) showNoAddressMsg = true;

	gpsModalPromptComponent.setState({ addresses: addresses, showNoAddressMsg: showNoAddressMsg });
	// setTimeout(() => {
	// 	gpsModalPromptComponent.setState({showNoAddressMsg : false});
	// },4000);
};