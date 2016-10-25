/**
 * Created by David Zhang on 16/10/24.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: "[name]-[hash].js",
    path: __dirname + "./dist"
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8089
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
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}