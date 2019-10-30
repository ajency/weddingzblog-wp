const fs = require('fs-extra');

let react_file_hash = {};
let react_css_file_hash = {}
let js_files = ["runtime-main.", "main.", "2."];
let css_files = ["main."];

fs.emptyDir('../../wp-content/themes/ajency-portfolio/js/cart')
.then(() => {
	fs.copy('./build/', '../../wp-content/themes/ajency-portfolio/js/cart/')
		.then((success) =>{
			console.log("build folder copied successfully");
			for(let i = 0; i<js_files.length; i++){
			    fromDir('./build/static/js/', js_files[i], 'js');
			}

			fromDir('./build/static/css/', css_files[0], 'css');


			// fromDir('../../wp-content/themes/ajency-portfolio/js/cart/static/css/', "main.");

			console.log("file hash ==>", react_file_hash, react_css_file_hash);

			fs.writeJson('../../wp-content/themes/ajency-portfolio/react_file_hash.json', react_file_hash)
			.then(() => {
			  console.log('success!')
			})
			.catch(err => {
			  console.error(err)
			})

			fs.writeJson('../../wp-content/themes/ajency-portfolio/react_css_file_hash.json', react_css_file_hash)
			.then(() => {
			  console.log('success!')
			})
			.catch(err => {
			  console.error(err)
			})

		})
		.catch((error)=>{
			console.log("error in copying build folder");
		})
})
.catch(err => {
  console.error(err)
})



function fromDir(startPath,filter, type){
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    console.log("type ==>", type);

    var files=fs.readdirSync(startPath);
    if(type == 'js'){
    	for(var i=0;i<files.length;i++){
	        if (files[i].indexOf(filter)>=0) {
	            console.log('-- found: ',files[i]);
	            react_file_hash[files[i].split('.')[0]] = files[i].split('.')[1];
	        };
	    };
    }
    else {
    	for(var i=0;i<files.length;i++){
	        if (files[i].indexOf(filter)>=0) {
	            console.log('-- found: ',files[i]);
	            react_css_file_hash[files[i].split('.')[0]] = files[i].split('.')[1];
	        };
	    };
    }
};