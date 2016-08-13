var webpack = require('webpack');

var targetPath = './';
var outPublicPath = '/assets/';

var config = {
  entry:{
    'entry-pagebar': './samples/entry-pagebar.js'
  },
  output: {
      path: targetPath+'assets/',
      publicPath: outPublicPath,
      filename: '[name].js'
    },
  module: {
  loaders: [
        {test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
        loader: 'react-hot',
     },
    {
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/,
             /src\/lib/
           ],
      loader: 'babel'
    },
    {
      test: /\.css$/, loader: 'style!css'
    },
    {
      test: /\.(png|jpg|eot|svg|ttf|woff|gif)((\?|#).*)?$/, loader: 'url?limit=100000'
    },
    {
      test: /\.less$/, loader: "style-loader!css-loader!less-loader"
    }
    ],
  }
}

config.module.preLoaders = [{
    test: /\.jsx!$/,
    exclude: [/node_modules/],
    loader: 'eslint'
}];

module.exports = config
