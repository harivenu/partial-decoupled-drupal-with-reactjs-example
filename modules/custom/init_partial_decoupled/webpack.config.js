var webpack = require("webpack");
var path  = require("path");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var DIST_PATH = path.resolve(__dirname, "dist/");
var SRC_PATH = path.resolve(__dirname, "src/");

var config = {
  entry: {
    Article:  SRC_PATH + "/app/entry/ArticleIndex.jsx",
    News:  SRC_PATH + "/app/entry/NewsIndex.jsx",
  },
  mode: 'production',
  output: {
    path: DIST_PATH + "/",
    filename: '[name].js',
  },
  watch: true,
  module:{
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_PATH,
        loader: "babel-loader",
        query : {
          presets:["react", "es2015"]
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        mangle: true,
        output: {
          comments: false
        }
      },
      sourceMap: true,
      exclude: [/\.min\.js$/gi]
    })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  node: {fs: 'empty'},
  externals: [
    {'./cptable': 'var cptable'},
    {'./jszip': 'jszip'}
  ]
};

module.exports = config;
