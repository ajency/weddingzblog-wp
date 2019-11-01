buildAddToCart(){
	cd ./add-to-cart
	npm install
	npm run build
}

buildDeliveryAddress(){
	cd ../delivery-address-slider
	npm install
	npm run build
}

buildSignIn(){
	cd ../sign-in
	npm install
	npm run build
}

buildVerifyOtp(){
	cd ../verify-otp
	npm install
	npm run build
}

buildViewCart(){
	cd ../view-cart
	npm install
	npm run build
}

buildCartApp(){
	cd ../cart
	npm install
	npm run build
	node postbuild.js
}

postbuildScript(){
	cd ..
	node postbuild.js
}



echo "running build script"
buildAddToCart
buildDeliveryAddress
buildSignIn
buildVerifyOtp
buildViewCart
buildCartApp
# postbuildScript