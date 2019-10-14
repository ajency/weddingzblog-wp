(this.webpackJsonpcart=this.webpackJsonpcart||[]).push([[0],{18:function(e,t,a){e.exports=a(47)},23:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),l=a.n(c),i=(a(23),a(2)),s=a(3),m=a(5),o=a(4),u=a(6),d=(a(24),a(25),a(26),function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"header-container"},r.a.createElement("div",{className:"app-name"},r.a.createElement("label",{className:"app-title"},"Green Grain Bowl")),r.a.createElement("div",null,"Secure Checkout"))}}]),t}(n.Component)),p=(a(27),function(e){function t(e){return Object(i.a)(this,t),Object(m.a)(this,Object(o.a)(t).call(this,e))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"item-container"},r.a.createElement("div",{className:"product-image"},r.a.createElement("img",{alt:"french fries",title:"french fries",height:"70",width:"50",src:this.props.item.attributes.images["1x"]})),r.a.createElement("div",{className:""},r.a.createElement("div",{className:"product-title"},this.props.item.attributes.title),r.a.createElement("div",{className:"quantity"},r.a.createElement("button",null,"-"),this.props.item.quantity,r.a.createElement("button",null,"+")),r.a.createElement("div",{className:"price"},"\u20b9 ",this.props.item.attributes.price_final)),r.a.createElement("div",null,r.a.createElement("i",{className:"material-icons"},"delete")))}}]),t}(n.Component)),h=(a(28),function(e){function t(e){return Object(i.a)(this,t),Object(m.a)(this,Object(o.a)(t).call(this,e))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"cart-summary-container"},r.a.createElement("div",{className:"summary-item"},r.a.createElement("div",null,r.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Total Item Price")),r.a.createElement("div",null," \u20b9 ",this.props.summary.mrp_total," ")),r.a.createElement("div",{className:"summary-item"},r.a.createElement("div",null,r.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Sub Total")),r.a.createElement("div",null," \u20b9 ",this.props.summary.sale_price_total)),this.getCouponDiscount(),this.getShippingFee(),r.a.createElement("div",{className:"summary-item"},r.a.createElement("div",null,r.a.createElement("label",{className:"text-muted f-w-4 m-0"},"To Pay")),r.a.createElement("div",null," \u20b9 ",this.props.summary.you_pay)))}},{key:"getCouponDiscount",value:function(){if(this.props.summary.cart_discount)return r.a.createElement("div",{className:"summary-item"},r.a.createElement("div",null,r.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Coupon Discount")),r.a.createElement("div",{className:"text-success"},"-\u20b9 ",this.props.summary.cart_discount))}},{key:"getShippingFee",value:function(){if(this.props.summary.shipping_fee)return r.a.createElement("div",{className:"summary-item"},r.a.createElement("div",null,r.a.createElement("label",{className:"text-muted f-w-4 m-0"},"Shipping fee")),r.a.createElement("div",null," \u20b9 ",this.props.summary.shipping_fee))}}]),t}(n.Component)),v=(a(29),function(e){function t(e){return Object(i.a)(this,t),Object(m.a)(this,Object(o.a)(t).call(this,e))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"delivery-address-container"},r.a.createElement("div",{className:"address-heading"},r.a.createElement("div",null,"Deliver To Address"),r.a.createElement("div",null,"Change")),r.a.createElement("div",{className:"address-details"},r.a.createElement("label",null,this.props.address.address),r.a.createElement("label",{className:"delivery-time"},this.props.delivery_time)))}}]),t}(n.Component)),E=a(17),f=a.n(E),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(o.a)(t).call(this,e))).state={cart:{},cartLoaded:!1,apiEndPoint:"http://localhost:5000/project-ggb-dev/us-central1/api/rest/v1"},a.fetchCart(),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){}},{key:"getItems",value:function(){return this.state.cart.items.map((function(e){return r.a.createElement(p,{key:e.variant_id,item:e})}))}},{key:"render",value:function(){var e;return e=this.state.cartLoaded?r.a.createElement("div",null,r.a.createElement("div",null,this.getItems()),r.a.createElement("div",{className:"apply-coupon-bar"},r.a.createElement("div",{className:"coupon-label"},"Apply Coupon   >")),r.a.createElement("div",null,r.a.createElement("label",{className:"cart-summary-label"},"Bill Details"),r.a.createElement(h,{summary:this.state.cart.summary})),r.a.createElement("div",null,r.a.createElement(v,{address:this.state.cart.delivery_address,delivery_time:this.state.cart.approx_delivery_time})),r.a.createElement("div",null,r.a.createElement("div",{className:"bottom-bar"},r.a.createElement("img",{alt:"100% Secure Payments",title:"100% Secure Payments",width:"40",src:"https://static.kidsuperstore.in/public/img/shield.png"}),r.a.createElement("div",{className:"genuinity"},r.a.createElement("p",{className:"my-1"},"100% Secure payments.")))),r.a.createElement("div",null,r.a.createElement("div",{className:"secure-checkout"},r.a.createElement("button",{className:"checkout-btn"},"Secure Checkout")))):r.a.createElement("div",{className:"text-center mt-5"}," ",r.a.createElement("h4",null," Loading... "),"  "),r.a.createElement("div",{className:"cart-container"},r.a.createElement(d,null),r.a.createElement("div",{className:"cart-heading"},"Cart"),e)}},{key:"fetchCart",value:function(){var e=this;console.log("inside fetch cart");var t=this.getCookie("cart_id");if(t){var a=this.state.apiEndPoint+"/anonymous/cart/fetch",n={cart_id:t};f.a.get(a,{params:n}).then((function(t){console.log("fetch cart response ==>",t),e.setState({cart:t.data,cartLoaded:!0})})).catch((function(e){console.log("error in fetch cart ==>",e)}))}}},{key:"getCookie",value:function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var r=a[n];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""}}]),t}(n.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.6d5e60ba.chunk.js.map