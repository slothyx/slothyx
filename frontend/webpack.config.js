const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
	entry: './app/src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'app/dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'app/dist'),
		port: 5000,
		compress: true,
		hot: true,
		proxy: {
			'/api': 'http://localhost:8080'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(pdf|jpg|png|gif|svg|ico)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/src/index.html',
			favicon: './app/src/images/favicon.png',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new ScriptExtHtmlWebpackPlugin({
			prefetch: /\.js$/,
			defaultAttribute: 'async'
		})
	]
};
