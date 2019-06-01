const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const vendorLib = [
	'jquery',
	'bootstrap',
	'popper.js'
];
const config = {
	entry: {
		app: './src/index.js',
		vendor: vendorLib
	},
	mode: 'development',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@admin': path.resolve(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/
			},
			{
				use: [
					MiniCssExtractPlugin.loader,
					{loader:'css-loader',options:{url:false,sourceMap:true}},
					{loader:'sass-loader',options:{sourceMap:true}},
				],
				test: [/\.scss$/,/\.css$/]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		}),
		// new WebpackBuildNotifierPlugin({
		// 	suppressCompileStart: false,
		// 	suppressSuccess: false,
		// 	successSound:true
		// }),
	],
	optimization:{
		splitChunks:{
			chunks:'all',
			name:'vendor'
		}
	}
};
module.exports = config;