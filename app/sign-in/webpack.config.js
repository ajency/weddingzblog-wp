const path = require('path');

module.exports = {
  mode : "production",
  output : {
    // filename : "sign-in.js",
    filename: 'sign-in.[contenthash].js',
    path: path.resolve(__dirname, "../../wp-content/themes/ajency-portfolio/js/")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};