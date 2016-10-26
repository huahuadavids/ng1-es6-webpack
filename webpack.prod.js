/**
 *@webpack procuction config file
 *@author huahudavids
 *@date: 2016/10
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var extractCSS = new ExtractTextPlugin('app-[hash].css');
var path = require("path");

module.exports = {
  entry:  "./src/app.js",
  output: {
    filename: "app-[hash].js",
    path: path.join(__dirname ,"dist")
  },
  resolve: {
    // extensions: ['.css', '.scss']
  },
  module: {
    loaders :[
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/i,
        loader: extractCSS.extract(['css','sass'])
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    extractCSS,
    new WebpackCleanupPlugin(),
    new webpack.optimize.DedupePlugin(), //重复数据删除
    new webpack.optimize.OccurenceOrderPlugin(), // 同样是优化文件大小
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    })
  ]
}