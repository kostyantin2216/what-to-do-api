const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server.ts',
  output: { 
    path: __dirname + '/dist',
    filename: 'server.js',
  },
  resolve: {
    // Add '.ts' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      // All files with a '.ts'
      // extension will be handled by 'ts-loader'
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
    ],
  },
  target: 'node',
  externals: nodeModules,
  mode: 'development'
};