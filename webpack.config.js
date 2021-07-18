const webpack			= require('webpack');
const TerserPlugin		= require("terser-webpack-plugin");

module.exports = {
    target: 'node',
    mode: 'production', // production | development
    entry: [ './src/index.js' ],
    output: {
	filename: 'promise-timeout.bundled.js',
	globalObject: 'this',
	library: {
	    "name": "PromiseTimeoutModule",
	    "type": "umd",
	},
    },
    stats: {
	colors: true
    },
    devtool: 'source-map',
    optimization: {
	minimizer: [
	    new TerserPlugin({
		terserOptions: {
		    keep_classnames: true,
		},
	    }),
	],
    },
};
