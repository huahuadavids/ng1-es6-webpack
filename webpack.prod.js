/**
 *@webpack procuction config file
 *@author huahudavids
 *@date: 2016/10
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// var extractCSS = new ExtractTextPlugin('app-[hash].css');
var path = require("path");
var config = {}, imgs = ['png','jpg','gif','svg'];
var getPicLoader = require('./utils');

config.entry = {
  index : "./src/index.js",
  vendor : ["angular"]
};
config.output = {
  filename: "app-[hash:8].js",
  path: path.join(__dirname ,"dist"),
  chunkFilename: '[chunkhash].bundle.js'
}
config.resolve = {}

config.module ={
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
      loader: extractTextPlugin.extract(['css','sass'])
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
}

imgs.forEach(function(img){
  config.module.loaders.push(getPicLoader(img))
})

config.resolve = {
  modulesDirectories: ['node_modules'],
  extensions: ['', '.js', '.jsx'],
  alias : {
    'templates': path.join(__dirname ,'src/templates'),
    'modules': path.join(__dirname ,'src/modules'),
    'routes': path.join(__dirname ,'src/routes'),
    'reset': path.join(__dirname ,'src/reset'),
    'view': path.join(__dirname ,'src/view'),
    'styles': path.join(__dirname ,'src/styles')
  }
};

config.plugins =  [
  // extractCSS,
  new extractTextPlugin("app-[hash:8].css"),
  new WebpackCleanupPlugin(),
  new webpack.optimize.DedupePlugin(), //重复数据删除
  new webpack.optimize.OccurenceOrderPlugin(), // 同样是优化文件大小
  new HtmlWebpackPlugin({
    template: __dirname + "/index.html",
    filename: "index.html",
    // favicon: ""
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor-[hash:8].js'),
  // new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
  new webpack.optimize.UglifyJsPlugin({
    mangle: { // 排除不想要压缩的对象名称
      except: ['$', 'exports', 'require', 'module', 'angular']
    },
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: true,
      drop_debugger: true
    }
  })
]

module.exports = config;