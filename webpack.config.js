var path = require("path");

module.exports = {
  context: path.join(__dirname, "project", "src"),
  entry: "./app",
  output: {
    path: path.join(__dirname, "project", "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015', 'stage-2'],
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
  }
};
