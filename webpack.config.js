const path = require("path");

module.exports = {
    entry: "./dist/main.js",
    output: {
        path: path.resolve(__dirname + "/"),
        filename: "./bundle.js"
    },
    module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			}
		]
	},
    watch: true
};