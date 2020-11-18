import { resolve } from 'path';
import * as Webpack from 'webpack';
import { merge } from 'webpack-merge';

const LiveReloadPlugin     = require('webpack-livereload-plugin');
const MomentLocalesPlugin  = require('moment-locales-webpack-plugin');
const ForkTsCheckerPlugin  = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export default function(_: {}, argv: { mode: string, analyze: boolean }) {
	const prod = argv.mode === 'production';
	const analyze = argv.analyze;

	let config: Webpack.Configuration = ({
		name: 'admin',
		context: resolve(__dirname, 'src'),
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
			alias: {
				"react": "preact/compat",
				"react-dom": "preact/compat"
			}
		},
		mode: argv.mode as 'production' ?? 'development',
		devtool: prod ? undefined : 'source-map',

		entry: { main: [ './Main.ts' ] },
		output: { path: resolve(__dirname, './build') },

		plugins: [
			new ForkTsCheckerPlugin({
				typescript: {
					configFile: resolve(__dirname, 'tsconfig.json'),
				},
				eslint: {
					files: './**/*.{ts,tsx}',
					options: {
						configFile: resolve(__dirname, '.eslintrc.js'),
						emitErrors: true,
						failOnHint: true,
						typeCheck: true
					}
				}
			}),
			new MomentLocalesPlugin()
		],

		module: {
			rules: [{
				test: /\.[t|j]sx?$/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					cacheDirectory: true,
					presets: [
						['@babel/preset-typescript', {
							isTSX: true,
							allExtensions: true,
							jsxPragma: 'Preact.h'
						}],
						[ '@babel/preset-env', {
							targets: { browsers: ['Chrome 78']},
						}]
					],
					plugins: [
						["@babel/transform-react-jsx", {
				    	pragma: "Preact.h"
				    }],
						['@babel/plugin-proposal-class-properties', {
							loose: true
						}]
					]
				}
			}, {
				test: /\.s[c|a]ss$/,
				loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}, {
				test: /\.css$/,
				loaders: [ 'style-loader', 'css-loader' ]
			}, {
				test: /\.(gif|png|jpe?g|svg)$/,
				use: [ 'file-loader', {
					loader: 'image-webpack-loader',
					options: { disable: true }
				}]
			}]
		},
	});

	if (!prod) config = merge(config, {
		plugins: [ new LiveReloadPlugin() ]
	});

	if (analyze) config = merge(config, {
		plugins: [ new BundleAnalyzerPlugin() ]
	});

	return config;
}
