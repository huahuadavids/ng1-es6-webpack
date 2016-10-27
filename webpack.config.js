/**
 * Created by David Zhang on 16/10/24.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var ip = require("my-local-ip");
var path = require("path");
var host = process.env.HOST || ip();
var port = process.env.PORT || "8081";
var url = "http://" + host + ":" + port;
var getPicLoader = require('./utils');
var config = {}, imgs = ['png','jpg','gif','svg'];
config.entry = [
  "webpack-dev-server/client?" + url,
  "webpack/hot/only-dev-server",
  "./src/app.js"
];
config.devtool = 'source-map';
config.output = {
  filename: "bundle.js",
  path: path.join(__dirname, "dist")
}

config.devServer = {
  contentBase: "./dist",
  // noInfo: false,
  colors: true,
  historyApiFallback: true,
  inline: true,
  hot: true,
  host: host,
  port: port
}

config.resolve = {
  // extensions: ['.css', '.scss']
  // alias: {
  //   'src': path.resolve(__dirname, '../src')
  // }
}

config.module = {
  preLoaders: [
    {
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }
  ],
  loaders: [
    {
      test: /\.json$/,
      loader: "json"
    },
    {
      test: /\.css$/,
      loaders: ["style", "css"]
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },
    {
      test: /\.html$/,
      loader: "html"
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
  ]
}
imgs.forEach(function(img){
  config.module.loaders.push(getPicLoader(img))
})
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"develop"'
    }
  }),
  new HtmlWebpackPlugin({
    template: __dirname + "/index.html"
  }),
  new webpack.HotModuleReplacementPlugin(),
  new OpenBrowserPlugin({url: url})
]

module.exports = config;