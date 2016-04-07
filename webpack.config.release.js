var path = require("path");
var webpack = require("webpack");

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
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
  }
};
