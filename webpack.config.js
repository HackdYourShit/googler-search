const webpack = require('webpack')
const path = require('path')

const dir = local => path.resolve(__dirname, local)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	entry: "./main.jsx",
	output: {
		path: dir("extension"),
		filename: "bundle.js",
	},
	resolve: {
		modules: [
			"node_modules",
		],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: dir("node_modules"),
			use: [{
				loader: "babel-loader",
				options: {
					presets: ['react', 'env']
				}
			}]
		}]
	}
}
