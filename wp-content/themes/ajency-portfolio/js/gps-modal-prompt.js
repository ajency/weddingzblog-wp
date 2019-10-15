'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
window.lat_lng = null;
window.formatted_address = null;
window.modal_closed = false;
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
			display: false,
			// apiEndPoint : 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			apiEndPoint: 'https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1',
			locations: [],
			locError: '',
			gpsError: '',
			fetchingGPS: false
		};
		return _this;
	}

	_createClass(gpsModalPrompt, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			// if(this.state.display){
			// 	$('#gpsModal').modal('show');
			// }

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
							)
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
							)
						)
					)
				)
			);
		}
	}, {
		key: 'modalClosed',
		value: function modalClosed() {
			window.modal_closed = true;
		}
	}, {
		key: 'autoCompleteLocation',
		value: function autoCompleteLocation(value) {
			var _this3 = this;

			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(function () {
				console.log("autoCompleteLocation =>", value);
				_this3.setState({ locError: '' });
				if (value.length > 2) {
					var url = _this3.state.apiEndPoint + "/places-autocomplete";
					var body = {
						input: value
					};
					_this3.setState({ showLoader: true, locations: [] });
					cancel && cancel();
					console.log("cancel ==>", cancel);
					axios.get(url, { params: body,
						cancelToken: new CancelToken(function (c) {
							cancel = c;
						})
					}).then(function (res) {
						_this3.setState({ showLoader: false });
						if (res.data.status === "OK") _this3.setState({ locations: res.data.predictions });else {
							//display error
							_this3.setState({ locError: res.data.error_message });
						}
					}).catch(function (error) {
						// this.setState({showLoader : false})
						console.log("error in autoCompleteLocation ==>", error);
						// let msg = error.message ? error.message : error;
						// this.setState({locError : msg})
					});
				} else {
					_this3.setState({ locations: [] });
				}
			}, 500);
		}
	}, {
		key: 'getAutoCompleteLocations',
		value: function getAutoCompleteLocations() {
			var _this4 = this;

			if (this.state.locations.length) {
				var locs = this.state.locations.map(function (loc) {
					return React.createElement(
						'li',
						{ key: loc.id, className: 'btn p-1', onClick: function onClick() {
								_this4.reverseGeocode(loc);
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
		key: 'reverseGeocode',
		value: function reverseGeocode() {
			var _this5 = this;

			var loc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var latlng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			console.log("reverse geocode ==>", loc);
			this.setState({ locError: '' });
			this.setState({ showLoader: true, locations: [] });
			var url = this.state.apiEndPoint + "/reverse-geocode";
			var body = {};
			if (loc) body.place_id = loc.place_id;else if (latlng) body.latlng = latlng[0] + ',' + latlng[1];

			axios.get(url, { params: body }).then(function (res) {
				if (res.data.status === "OK") {
					if (loc) _this5.setUserLocations([res.data.result.geometry.location.lat, res.data.result.geometry.location.lng], res.data.result.formatted_address);else if (latlng) _this5.setUserLocations(latlng, res.data.results[0].formatted_address);
					_this5.setState({ gpsError: '' });
				} else {
					_this5.setState({ locError: res.data.error_message });
					_this5.setState({ showLoader: false, fetchingGPS: false });
				}
			}).catch(function (error) {
				_this5.setState({ showLoader: false, fetchingGPS: false });
				console.log("error in autoCompleteLocation ==>", error);
				var msg = error.message ? error.message : error;
				_this5.setState({ locError: msg });
			});
		}
	}, {
		key: 'setUserLocations',
		value: function setUserLocations(lat_lng, formatted_address) {
			var _this6 = this;

			var cart_id = this.getCookie('cart_id');
			if (cart_id) {
				var url = this.state.apiEndPoint + "/anonymous/cart/change-location";
				var body = {
					cart_id: cart_id,
					lat_long: lat_lng,
					formatted_address: formatted_address
				};
				axios.post(url, body).then(function (res) {
					_this6.updateLocationUI(lat_lng, formatted_address);
					_this6.setState({ showLoader: false, fetchingGPS: false });
					$('#gpsModal').modal('hide');
				}).catch(function (error) {
					_this6.setState({ showLoader: false, fetchingGPS: false });
					console.log("error in updating cart location ==>", error);
					var msg = error.message ? error.message : error;
					_this6.setState({ locError: msg });
				});
			} else {
				this.setState({ showLoader: false, fetchingGPS: false });
				this.updateLocationUI(lat_lng, formatted_address);
				$('#gpsModal').modal('hide');
			}
		}
	}, {
		key: 'updateLocationUI',
		value: function updateLocationUI(lat_lng, formatted_address) {
			console.log("setUser locations ==>", lat_lng, formatted_address);
			document.cookie = "lat_lng=" + lat_lng[0] + ',' + lat_lng[1] + ";path=/";
			document.cookie = "formatted_address=" + formatted_address + ";path=/";
			window.lat_lng = lat_lng;
			window.formatted_address = formatted_address;
			document.querySelector("#selected-location-address").innerHTML = formatted_address;
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
		key: 'getLocation',
		value: function getLocation() {
			var _this7 = this;

			this.setState({ showLoader: true, locations: [], fetchingGPS: true });
			var geoOptions = {
				maximumAge: 30 * 60 * 1000,
				timeout: 10 * 1000
			};
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("position ==>", position.coords);
				_this7.reverseGeocode(null, [position.coords.latitude, position.coords.longitude]);
			}, function (geoError) {
				_this7.setState({ showLoader: false, fetchingGPS: false });
				console.log("error in getting geolocation", geoError);
				if (geoError.code === 1) {
					// permission denied
					_this7.setState({ gpsError: 'You have blocked Green Grain Bowl from tracking your location. To use this, change your location settings in browser.' });
				} else {
					// other errors
					_this7.setState({ gpsError: 'Error in getting current location using GPS' });
				}
			}, geoOptions);
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
			var _this8 = this;

			if (!this.state.fetchingGPS) return React.createElement('input', { type: 'search', className: 'w-75', placeholder: 'search for area, street name', onChange: function onChange(e) {
					_this8.autoCompleteLocation(e.target.value);
				} });
		}
	}, {
		key: 'showFetchLocationUsingGps',
		value: function showFetchLocationUsingGps() {
			var _this9 = this;

			if (this.state.fetchingGPS) return React.createElement(
				'div',
				{ className: 'btn-dark' },
				' Fetching current Location '
			);else return React.createElement(
				'div',
				{ className: 'btn-dark', style: btnStyle, onClick: function onClick() {
						return _this9.getLocation();
					} },
				' Get Current Location '
			);
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

	return gpsModalPrompt;
}(React.Component);

var domContainer = document.querySelector('#react-add-delivery-address-container');
var gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);

window.updategpsModalPromptComponent = function (display) {
	$('#gpsModal').modal('show');
	// gpsModalPromptComponent.setState({display : display})
};