//
// The config file for the electron render thread,
// Sets up typescript & scss compilation, static asset inclusion, and sets the target to electron-renderer.
// Also sets up the `app``entry point.
//

'use strict';
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	context: __dirname,
	mode: 'development',
	
	output: {
		path: path.resolve(__dirname, 'res/script'),
		filename: '[name].js'
	},

	entry: {		
		// Define the main entry point, which will produce an output file. 
		main: ['@babel/polyfill', './src/Main.tsx']
	},

	// Don't allow webpack to polyfill __dirname & __filename constants.
	node: { __dirname: false, __filename: false },

	resolve: { extensions: ['.tsx', '.ts', '.js', '.json'] },
	devtool: 'source-map',
	
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'source-map-loader',
			enforce: 'pre'
		}, {
			test: /\.tsx?$/,
			loader: 'babel-loader',
			options: {
				babelrc: false,
				cacheDirectory: true,
				presets: [
					['@babel/preset-env', {targets: {browsers: 'last 2 versions'}}], // Polyfills for the last 2 versions of chromium.
					'@babel/preset-typescript', // Compile Typescript into Javascript.
				],
				plugins: [
					// Allow class properties (properties defined outside of functions).
					['@babel/plugin-proposal-class-properties', { loose: true }],
			    ["@babel/transform-react-jsx", { "pragma": "Preact.h" }]
				]
			}
		}, {
			test: /\.s[c|a]ss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}, {
			test: /\.(gif|png|jpe?g|svg)$/,
			use: [ 'file-loader', {
					loader: 'image-webpack-loader',
					// Does something that is required in webpack 2.x+ (which we are on)
					options: { disable: true }
			}]
		}]
	},

	plugins: [
		// new HtmlWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin(), // Run Typescript linting in a separate thread.
		new webpack.NamedModulesPlugin(), // Displays module path when using HMR, only for development.
		// Manipulates process.env.NODE_ENV, setting it to 'development' if it is not already specified.
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') })
	],
};
