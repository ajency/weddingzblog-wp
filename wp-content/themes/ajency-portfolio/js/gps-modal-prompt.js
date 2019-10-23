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
	'list-style': 'none'
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
			settingUserLocation: false
		};
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				user.getIdToken().then(function (idToken) {
					_this.fetchAddresses(idToken);
				});
			} else {
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
				{ className: 'modal fade', id: 'gpsModal', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true', 'data-backdrop': 'static' },
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
								}, disabled: this.state.fetchingGPS || this.state.settingUserLocation },
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
							)
						),
						React.createElement(
							'div',
							null,
							this.getNoSavedAddressesMsg()
						),
						React.createElement(
							'div',
							{ className: 'd-flex justify-content-center flex-column p-4' },
							this.showFetchLocationUsingGps(),
							React.createElement(
								'div',
								{ className: 'gps-error-msg' },
								this.checkGpsErrorMsg()
							),
							React.createElement(
								'div',
								{ className: 'p-4' },
								this.showLocationSearch()
							),
							React.createElement(
								'div',
								{ className: 'gps-error-msg' },
								this.checkLocationErrorMsg()
							),
							React.createElement(
								'ul',
								{ style: locationStyle },
								this.getAutoCompleteLocations()
							),
							React.createElement(
								'div',
								null,
								this.getSavedAddresses()
							),
							this.showAddressUpdateMsg()
						)
					)
				)
			);
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
			var _this3 = this;

			if (!this.state.settingUserLocation && !this.state.fetchingGPS) return React.createElement('input', { type: 'search', className: 'w-75', placeholder: 'search for area, street name', value: this.state.searchText, onChange: function onChange(e) {
					_this3.autoCompleteLocation(e.target.value);
				} });
		}
	}, {
		key: 'showFetchLocationUsingGps',
		value: function showFetchLocationUsingGps() {
			var _this4 = this;

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
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				)
			);else if (!this.state.settingUserLocation) return React.createElement(
				'button',
				{ className: '', style: btnStyle, onClick: function onClick() {
						return _this4.getLocation();
					} },
				' Get Current Location '
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
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
				)
			);
		}
	}, {
		key: 'getSavedAddresses',
		value: function getSavedAddresses() {
			var _this5 = this;

			if (this.state.addresses && this.state.addresses.length && !this.state.locations.length && !this.state.settingUserLocation && !this.state.fetchingGPS) {
				var addresses = this.state.addresses.map(function (address) {
					return React.createElement(
						'li',
						{ key: address.id, className: 'cursor-pointer p-1 saved-address-item', onClick: function onClick() {
								return _this5.setUserLocations(address.address.lat_long, address.address.formatted_address);
							} },
						address.address.address,
						', ',
						address.address.landmark,
						', ',
						address.address.city,
						', ',
						address.address.state,
						', ',
						address.address.pincode
					);
				});
				return React.createElement(
					'div',
					null,
					React.createElement(
						'h4',
						null,
						'Saved Addresses'
					),
					React.createElement(
						'ul',
						{ style: locationStyle },
						addresses
					)
				);
			}
		}
	}, {
		key: 'getAutoCompleteLocations',
		value: function getAutoCompleteLocations() {
			var _this6 = this;

			if (this.state.locations.length) {
				var locs = this.state.locations.map(function (loc) {
					return React.createElement(
						'li',
						{ key: loc.id, className: 'btn p-1', onClick: function onClick() {
								_this6.reverseGeocode(loc);
							} },
						loc.description
					);
				});
				return locs;
			}
			if (this.state.showLoader && !this.state.locations.length) {
				return React.createElement(
					'div',
					null,
					React.createElement('i', { 'class': 'fas fa-circle-notch fa-spin fa-lg' })
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
				{ className: 'p-3 alert-danger' },
				'You have no saved addreses. Please set delivery location from options below'
			);
		}
	}, {
		key: 'modalClosed',
		value: function modalClosed() {
			window.modal_closed = true;
			this.setState({ searchText: '', locError: '', gpsError: '' });
		}
	}, {
		key: 'autoCompleteLocation',
		value: function autoCompleteLocation(value) {
			var _this7 = this;

			clearTimeout(debounceTimer);
			this.setState({ searchText: value });
			debounceTimer = setTimeout(function () {
				_this7.setState({ locError: '' });
				if (value.length > 2) {
					var url = _this7.state.apiEndPoint + "/places-autocomplete";
					var body = {
						input: value
					};
					_this7.setState({ showLoader: true, locations: [] });
					cancel && cancel();
					axios.get(url, { params: body,
						cancelToken: new CancelToken(function (c) {
							cancel = c;
						})
					}).then(function (res) {
						_this7.setState({ showLoader: false });
						if (res.data.status === "OK") _this7.setState({ locations: res.data.predictions });else {
							//display error
							_this7.setState({ locError: res.data.error_message });
						}
					}).catch(function (error) {
						console.log("error in autoCompleteLocation ==>", error);
						// let msg = error.message ? error.message : error;
						// this.setState({locError : msg})
					});
				} else {
					_this7.setState({ locations: [] });
				}
			}, 500);
		}
	}, {
		key: 'reverseGeocode',
		value: function reverseGeocode() {
			var _this8 = this;

			var loc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var latlng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			this.setState({ locations: [], locError: '', settingUserLocation: true });
			var url = this.state.apiEndPoint + "/reverse-geocode";
			var body = {};
			if (loc) body.place_id = loc.place_id;else if (latlng) body.latlng = latlng[0] + ',' + latlng[1];

			axios.get(url, { params: body }).then(function (res) {
				if (res.data.status === "OK") {
					_this8.setState({ settingUserLocation: false, gpsError: '' });
					if (loc) _this8.setUserLocations([res.data.result.geometry.location.lat, res.data.result.geometry.location.lng], res.data.result.formatted_address);else if (latlng) _this8.setUserLocations(latlng, res.data.results[0].formatted_address);
				} else {
					_this8.setState({ fetchingGPS: false, locError: res.data.error_message });
				}
			}).catch(function (error) {
				_this8.setState({ fetchingGPS: false, settingUserLocation: false });
				console.log("error in autoCompleteLocation ==>", error);
				var msg = error.message ? error.message : error;
				_this8.setState({ locError: msg });
			});
		}
	}, {
		key: 'setUserLocations',
		value: function setUserLocations(lat_lng, formatted_address) {
			var _this9 = this;

			this.setState({ settingUserLocation: true });
			var cart_id = window.getCookie('cart_id');
			if (cart_id) {
				var url = this.state.apiEndPoint + "/anonymous/cart/change-location";
				var body = {
					cart_id: cart_id,
					lat_long: lat_lng,
					formatted_address: formatted_address
				};
				axios.post(url, body).then(function (res) {
					_this9.updateLocationUI(lat_lng, formatted_address);
					_this9.setState({ fetchingGPS: false, searchText: '', settingUserLocation: false });
					$('#gpsModal').modal('hide');
				}).catch(function (error) {
					_this9.setState({ fetchingGPS: false, settingUserLocation: false });
					console.log("error in updating cart location ==>", error);
					var msg = error.message ? error.message : error;
					_this9.setState({ locError: msg });
				});
			} else {
				this.setState({ fetchingGPS: false, searchText: '', settingUserLocation: false });
				this.updateLocationUI(lat_lng, formatted_address);
				$('#gpsModal').modal('hide');
			}
		}
	}, {
		key: 'updateLocationUI',
		value: function updateLocationUI(lat_lng, formatted_address) {
			document.cookie = "lat_lng=" + lat_lng[0] + ',' + lat_lng[1] + ";path=/";
			document.cookie = "formatted_address=" + formatted_address + ";path=/";
			window.lat_lng = lat_lng;
			window.formatted_address = formatted_address;
			document.querySelector("#selected-location-address").innerHTML = formatted_address;
			var cart_address = document.querySelector("#cart-delivery-address");
			if (cart_address) cart_address.innerHTML = formatted_address;
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			var _this10 = this;

			this.setState({ locations: [], fetchingGPS: true });
			var geoOptions = {
				maximumAge: 30 * 60 * 1000,
				timeout: 10 * 1000,
				enableHighAccuracy: true
			};
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("position ==>", position.coords);
				_this10.reverseGeocode(null, [position.coords.latitude, position.coords.longitude]);
			}, function (geoError) {
				_this10.setState({ fetchingGPS: false });
				console.log("error in getting geolocation", geoError);
				if (geoError.code === 1) {
					// permission denied
					_this10.setState({ gpsError: 'You have blocked Green Grain Bowl from tracking your location. To use this, change your location settings in browser.' });
				} else {
					// other errors
					_this10.setState({ gpsError: 'Error in getting current location using GPS' });
				}
			}, geoOptions);
		}
	}, {
		key: 'fetchAddresses',
		value: function fetchAddresses(idToken) {
			var _this11 = this;

			var headers = {
				Authorization: 'Bearer ' + idToken
			};
			var url = this.state.apiEndPoint + "/user/get-addresses";
			axios.get(url, { headers: headers }).then(function (res) {
				_this11.setState({ addresses: res.data.addresses });
				_this11.setDefaultAddress(res.data.addresses);
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
	}]);

	return gpsModalPrompt;
}(React.Component);

var domContainer = document.querySelector('#react-add-delivery-address-container');
var gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);

window.showGpsModalPrompt = function (display) {
	var addresses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	$('#gpsModal').modal('show');
};

window.updateAddresses = function () {
	var addresses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	var showNoAddressMsg = false;
	if (addresses && !addresses.length) showNoAddressMsg = true;

	gpsModalPromptComponent.setState({ addresses: addresses, showNoAddressMsg: showNoAddressMsg });
	setTimeout(function () {
		gpsModalPromptComponent.setState({ showNoAddressMsg: false });
	}, 4000);
};