var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "project", "src"),
  entry: "./app",
  output: {
    path: path.join(__dirname, "project", "dist"),
    filename: "[chunkhash:8].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
        cacheDirectory: false
      }
    },{
      test: /\.css$/,
      loader: "css-loader"
    },{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "project", "src")],
    modulesDirectories: ["node_modules"],
    alias: {
      'react-router-redux': path.join(__dirname, "node_modules/react-router-redux"),
    }
  },
  plugins: [
    new ExtractTextPlugin("[chunkhash:8].[name].css"),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
  }
};
