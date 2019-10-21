(this.webpackJsonpcart=this.webpackJsonpcart||[]).push([[0],{18:function(e,t,a){e.exports=a(47)},23:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(17),s=a.n(i),c=(a(23),a(1)),l=a(2),o=a(4),m=a(3),u=a(5),d=(a(24),a(25),a(26),function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"header-container"},n.a.createElement("div",{className:"app-name"},n.a.createElement("label",{className:"app-title"},"Green Grain Bowl")),n.a.createElement("div",null,"Secure Checkout"),n.a.createElement("div",{class:"ml-auto align-self-center"},n.a.createElement("h3",{class:"m-0 text-white btn-pay",onClick:function(){return e.closeCart()}},n.a.createElement("span",{"aria-hidden":"true"},"\xd7"))))}},{key:"closeCart",value:function(){document.querySelector(".cart-wrapper").classList.remove("active");var e=window.location.href.split("#")[0];window.history.replaceState({cart:!1},"cart",e)}}]),t}(r.Component)),p=(a(27),a(7)),h=a.n(p),v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={apiEndPoint:"https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1",apiCallInProgress:!1,quantity:0},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({quantity:this.props.quantity})}},{key:"render",value:function(){return n.a.createElement("div",{className:"quantity"},this.getButtonContent())}},{key:"getButtonContent",value:function(){var e=this;return this.state.apiCallInProgress?n.a.createElement("div",{class:"btn-icon"},n.a.createElement("i",{class:"fas fa-circle-notch fa-spin fa-lg"})):n.a.createElement("div",null,n.a.createElement("button",{className:"btn-primary cursor-pointer",onClick:function(){return e.removeFromCart(1)},disabled:this.state.apiCallInProgress},"-"),n.a.createElement("span",{className:"m-1"}," ",this.state.quantity," "),n.a.createElement("button",{className:"btn-primary cursor-pointer",onClick:function(){return e.addToCart(1)},disabled:this.state.apiCallInProgress},"+"),n.a.createElement("div",null,n.a.createElement("i",{className:"far fa-trash-alt cursor-pointer",onClick:function(){return e.removeFromCart(e.state.quantity)},disabled:this.state.apiCallInProgress})))}},{key:"removeFromCart",value:function(e){var t=this;this.setState({apiCallInProgress:!0});var a=this.state.apiEndPoint+"/anonymous/cart/delete",r={variant_id:this.props.variant_id,quantity:e,cart_id:window.getCookie("cart_id")};h.a.post(a,r).then((function(a){if(console.log("add to cart response ==>",a),a.data.success){var r=t.state.quantity-e;console.log("check ==>",r,e,t.state.quantity),t.props.updateSummary(a.data.summary),0===r?t.props.removeItem():t.setState({quantity:r}),window.updateViewCartCompoent(a.data);var n={variant_id:t.props.variant_id,quantity:e,product_id:t.props.product_id};window.updateItemQuantity(n,"remove")}else t.displayError(a.data.message);t.setState({apiCallInProgress:!1})})).catch((function(e){console.log("error in add to cart ==>",e),t.setState({apiCallInProgress:!1});var a=e&&e.message?e.message:e;t.displayError(a)}))}},{key:"addToCart",value:function(e){var t=this;this.setState({apiCallInProgress:!0});var a=this.state.apiEndPoint+"/anonymous/cart/insert",r={variant_id:this.props.variant_id,quantity:1,cart_id:window.getCookie("cart_id")};h.a.post(a,r).then((function(e){if(console.log("add to cart response ==>",e),e.data.success){t.props.updateSummary(e.data.summary);var a=t.state.quantity+e.data.item.quantity;t.setState({quantity:a}),window.updateViewCartCompoent(e.data),window.updateItemQuantity(e.data.item,"add")}else t.displayError(e.data.message);t.setState({apiCallInProgress:!1})})).catch((function(e){console.log("error in add to cart ==>",e),t.setState({apiCallInProgress:!1});var a=e&&e.message?e.message:e;t.displayError(a)}))}},{key:"displayError",value:function(e){}}]),t}(r.Component),f=function(e){function t(e){return Object(c.a)(this,t),Object(o.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"item-container flex-column"},n.a.createElement("div",{className:"d-flex"},n.a.createElement("div",{className:"product-image"},n.a.createElement("img",{alt:"french fries",title:"french fries",height:"70",width:"50",src:this.props.item.attributes.images["1x"]})),n.a.createElement("div",{className:"flex-fill"},n.a.createElement("div",{className:"product-title"},this.props.item.attributes.title),n.a.createElement("div",null,n.a.createElement(v,{quantity:this.props.item.quantity,variant_id:this.props.item.variant_id,product_id:this.props.item.product_id,removeItem:function(){e.removeItem()},updateSummary:function(t){return e.updateSummary(t)}}),n.a.createElement("div",{className:"price"},"\u20b9 ",this.props.item.attributes.price_final,this.checkItemDiscount())),n.a.createElement("div",null,"Size : ",this.props.item.attributes.size))),n.a.createElement("div",null,this.checkServiceability()))}},{key:"checkItemDiscount",value:function(){if(this.props.item.attributes.price_final<this.props.item.attributes.price_mrp)return n.a.createElement("div",null,n.a.createElement("small",{class:"gbb-original-price text-muted"},"\u20b9",this.props.item.attributes.price_mrp)," ",n.a.createElement("span",{class:"gbb-discount text-danger"},this.getOffPercentage(),"% OFF"))}},{key:"getOffPercentage",value:function(){return Math.round((this.props.item.attributes.price_mrp-this.props.item.attributes.price_final)/this.props.item.attributes.price_mrp*100)}},{key:"checkServiceability",value:function(){return this.props.item.deliverable?this.props.item.availability?void 0:n.a.createElement("div",{className:"alert-danger"},"Out of Stock"):n.a.createElement("div",{className:"alert-danger"},"Cannot be delivred at your location")}},{key:"removeItem",value:function(){this.props.removeItem(this.props.item.variant_id)}},{key:"updateSummary",value:function(e){this.props.updateSummary(e)}}]),t}(r.Component),y=(a(45),function(e){function t(e){return Object(c.a)(this,t),Object(o.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"cart-summary-container"},n.a.createElement("div",{className:"summary-item"},n.a.createElement("div",null,n.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Total Item Price")),n.a.createElement("div",null," \u20b9 ",this.props.summary.sale_price_total," ")),this.getCouponDiscount(),this.getShippingFee(),n.a.createElement("div",{className:"summary-item"},n.a.createElement("div",null,n.a.createElement("label",{className:"text-muted f-w-4 m-0"},"To Pay")),n.a.createElement("div",null," \u20b9 ",this.props.summary.you_pay)))}},{key:"getCouponDiscount",value:function(){if(this.props.summary.cart_discount)return n.a.createElement("div",{className:"summary-item"},n.a.createElement("div",null,n.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Coupon Discount")),n.a.createElement("div",{className:"text-success"},"-\u20b9 ",this.props.summary.cart_discount))}},{key:"getShippingFee",value:function(){if(this.props.summary.shipping_fee)return n.a.createElement("div",{className:"summary-item"},n.a.createElement("div",null,n.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Delivery fee")),n.a.createElement("div",null," \u20b9 ",this.props.summary.shipping_fee))}}]),t}(r.Component)),E=(a(46),function(e){function t(e){return Object(c.a)(this,t),Object(o.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"delivery-address-container"},n.a.createElement("div",{className:"address-heading"},n.a.createElement("div",null,"Deliver To Address"),n.a.createElement("div",{className:"btn btn-dark",onClick:function(){return e.openChangeLocationModal()}},"Change")),n.a.createElement("div",{className:"address-details pt-3"},n.a.createElement("label",{id:"cart-delivery-address"},this.props.address),n.a.createElement("label",{className:"delivery-time"},this.props.delivery_time)))}},{key:"openChangeLocationModal",value:function(){console.log("openChangeLocationModal"),window.showGpsModalPrompt(!0)}}]),t}(r.Component)),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={cartData:{},fetchCartComplete:!1,fetchCartFailed:!1,fetchCartFailureMsg:"",apiEndPoint:"https://us-central1-project-ggb-dev.cloudfunctions.net/api/rest/v1",cartEmpty:!1},a.fetchCart(),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;$("#view-cart-btn").on("click",(function(){console.log("click event fired"),e.setState({cartData:{},fetchCartComplete:!1,cartEmpty:!1}),e.fetchCart()}))}},{key:"getItems",value:function(){var e=this;return this.state.cartData.cart.items.map((function(t){return n.a.createElement(f,{key:t.variant_id,item:t,removeItem:function(t){return e.removeItem(t)},updateSummary:function(t){return e.updateSummary(t)}})}))}},{key:"render",value:function(){var e;return e=this.state.fetchCartComplete?this.state.cartEmpty?n.a.createElement("div",{className:"text-center mt-5"}," ",n.a.createElement("h4",null," Your cart is Empty. Add something from the menu "),"  "):this.state.fetchCartFailed?n.a.createElement("div",{className:"text-center mt-5"}," ",n.a.createElement("h4",null," ",this.state.fetchCartFailureMsg," "),"  "):n.a.createElement("div",null,n.a.createElement("div",null,this.getItems()),n.a.createElement("div",{className:"apply-coupon-bar"},n.a.createElement("div",{className:"coupon-label"},"Apply Coupon   >")),n.a.createElement("div",null,n.a.createElement("label",{className:"cart-summary-label"},"Bill Details"),n.a.createElement(y,{summary:this.state.cartData.cart.summary})),n.a.createElement("div",null,n.a.createElement(E,{address:this.state.cartData.cart.formatted_address,delivery_time:this.state.cartData.approx_delivery_time})),n.a.createElement("div",null,n.a.createElement("div",{className:"bottom-bar"},n.a.createElement("img",{alt:"100% Secure Payments",title:"100% Secure Payments",width:"40",src:"https://static.kidsuperstore.in/public/img/shield.png"}),n.a.createElement("div",{className:"genuinity"},n.a.createElement("p",{className:"my-1"},"100% Secure payments.")))),n.a.createElement("div",null,n.a.createElement("div",{className:"secure-checkout"},n.a.createElement("button",{className:"checkout-btn"},"Secure Checkout")))):n.a.createElement("div",{className:"text-center mt-5"}," ",n.a.createElement("h4",null," Loading... "),"  "),n.a.createElement("div",{className:"cart-container"},n.a.createElement(d,null),n.a.createElement("div",{className:"cart-heading"},"Cart"),e)}},{key:"fetchCart",value:function(){var e=this;console.log("inside fetch cart");var t=window.getCookie("cart_id");if(t){var a=this.state.apiEndPoint+"/anonymous/cart/fetch",r={cart_id:t};h.a.get(a,{params:r}).then((function(t){console.log("fetch cart response ==>",t),e.setState({cartData:t.data,fetchCartComplete:!0})})).catch((function(t){e.setState({fetchCartFailureMsg:t.message,fetchCartComplete:!0}),console.log("error in fetch cart ==>",t)}))}else console.log("inside else"),setTimeout((function(){e.setState({cartEmpty:!0,fetchCartComplete:!0})}),100)}},{key:"removeItem",value:function(e){console.log("remove item ==>",e);var t=this.state.cartData;t.cart.items=t.cart.items.filter((function(t){return t.variant_id!=e})),t.cart.items.length||this.setState({cartEmpty:!0}),this.setState({cartData:t})}},{key:"updateSummary",value:function(e){var t=this.state.cartData;t.cart.summary=e,this.setState({cartData:t})}}]),t}(r.Component),g=function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(b,null))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.d836fb8d.chunk.js.map