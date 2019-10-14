'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
window.lat_long = null;

var gpsModalPrompt = function (_React$Component) {
	_inherits(gpsModalPrompt, _React$Component);

	function gpsModalPrompt(props) {
		_classCallCheck(this, gpsModalPrompt);

		var _this = _possibleConstructorReturn(this, (gpsModalPrompt.__proto__ || Object.getPrototypeOf(gpsModalPrompt)).call(this, props));

		_this.state = {
			display: false,
			apiEndPoint: 'http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1',
			locations: []
		};
		_this.autoCompleteLocation = _this.autoCompleteLocation.bind(_this);
		return _this;
	}

	_createClass(gpsModalPrompt, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.state.display) {
				$('#exampleModal').modal('show');
			}

			return React.createElement(
				'div',
				{ className: 'modal fade', id: 'exampleModal', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true', 'data-backdrop': 'static' },
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
							React.createElement(
								'div',
								{ className: 'btn-dark', style: btnStyle, onClick: function onClick() {
										return _this2.getLocation();
									} },
								'Get Current Location'
							),
							React.createElement(
								'div',
								{ className: 'p-4' },
								React.createElement('input', { type: 'search', className: 'w-75', placeholder: 'search for area, street name', onChange: this.autoCompleteLocation })
							),
							React.createElement(
								'div',
								null,
								this.getAutoCompleteLocations()
							)
						)
					)
				)
			);
		}
	}, {
		key: 'autoCompleteLocation',
		value: function autoCompleteLocation(event) {
			var _this3 = this;

			console.log("autoCompleteLocation =>", event.target.value, event.target.value.length);
			if (event.target.value.length > 2) {
				var url = this.state.apiEndPoint + "/places-autocomplete";
				var body = {
					input: event.target.value
				};
				this.setState({ showLoader: true, locations: [] });
				axios.get(url, { params: body }).then(function (res) {
					_this3.setState({ showLoader: false });
					if (res.data.status === "OK") _this3.setState({ locations: res.data.predictions });else {
						//display error
					}
				}).catch(function (error) {
					_this3.setState({ showLoader: false });
					console.log("error in autoCompleteLocation ==>", error);
				});
			} else {
				this.setState({ locations: [] });
			}
		}
	}, {
		key: 'getAutoCompleteLocations',
		value: function getAutoCompleteLocations() {
			var _this4 = this;

			console.log("inside getAutoCompleteLocations", this.state.locations);
			if (this.state.locations.length) {
				var locs = this.state.locations.map(function (loc) {
					return React.createElement(
						'div',
						{ key: loc.id, className: 'btn p-1', onClick: function onClick() {
								_this4.reverseGeocode(loc);
							} },
						loc.description
					);
				});
				console.log("locs ==>", locs);
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
		value: function reverseGeocode(loc) {
			console.log("reverse geocode ==>", loc);
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			var _this5 = this;

			var geoOptions = {
				maximumAge: 30 * 60 * 1000,
				timeout: 10 * 1000
			};
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("position ==>", position.coords);
				_this5.setState({ display: false });
				window.lat_long = [position.coords.latitude, position.coords.longitude];
			}, function (geoError) {
				console.log("error in getting geolocation", geoError);
				if (geoError.code === 1) {
					// permission denied
					// show a toast with proper message 
				} else {
						// other errors
						// show a toast with proper message
					}
			}, geoOptions);
		}
	}]);

	return gpsModalPrompt;
}(React.Component);

// Find all DOM containers, and render add-to-cart buttons into them.


var domContainer = document.querySelector('#react-add-delivery-address-container');
var gpsModalPromptComponent = ReactDOM.render(e(gpsModalPrompt), domContainer);

window.updategpsModalPromptComponent = function (display) {
	gpsModalPromptComponent.setState({ display: display });
};