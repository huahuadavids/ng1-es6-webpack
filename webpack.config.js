/**
 * Created by David Zhang on 16/10/24.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('app-[hash].css');
module.exports = {
  entry:  "./src/app.js",
  output: {
    filename: "app-[hash].js",
    path: __dirname + "./dist"
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8089
  },
  resolve: {
     // extensions: ['.css', '.scss']
  },
  module: {
    loaders: [
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
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}