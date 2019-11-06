const { resolve, join } = require('path');

const webpack = require('webpack');

// plugins
const { CheckerPlugin } = require('awesome-typescript-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

  entry: {
		app: './src/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
      new CleanWebpackPlugin(),
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: 'src/index.html'
      }),
  ]
};
