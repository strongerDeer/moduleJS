const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.DefinePlugin({
      REST_API_KEY: JSON.stringify(process.env.REST_API_KEY),
    }),
  ],
};
