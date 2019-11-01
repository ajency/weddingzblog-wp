const fs = require('fs-extra');

let react_file_hash = {};
let js_files = ["add-to-cart.", "delivery-address-slider.", "sign-in.", "verify-otp.", "view-cart."];


for(let i = 0; i<js_files.length; i++){
    fromDir('./build/', js_files[i], 'js');
}


fs.writeJson('./build/react_component_file_hash.json', react_file_hash)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})


function fromDir(startPath,filter){
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
	for(var i=0;i<files.length;i++){
        if (files[i].indexOf(filter)>=0) {
            console.log('-- found: ',files[i]);
            react_file_hash[files[i].split('.')[0]] = files[i].split('.')[1];
        };
    };
};