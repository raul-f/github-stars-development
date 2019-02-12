const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: ['@babel/polyfill', './src/script.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
		],
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
}
