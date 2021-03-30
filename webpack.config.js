/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = (_env, argv) => {
	const mode = argv.mode || "development";
	const toCopyPatterns = ["manifest.json", "resources/logo-48.png", "resources/logo-96.png"];
	if (mode === "development") {
		toCopyPatterns.push("web-ext.config.js");
	}

	const plugins = [
		new HtmlWebpackPlugin({
			filename: "popup/index.html",
			template: "./src/popup/index.html",
			chunks: ["popup"],
		}),
		new CopyPlugin({
			patterns: toCopyPatterns,
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
	];

	if (mode === "production") {
		plugins.push(new CleanWebpackPlugin());
	}

	const config = {
		entry: {
			content_scripts: "./src/content_scripts/search_engine_switcher.ts",
			popup: "./src/popup/popup.tsx",
			background: "./src/background/background.ts",
		},
		mode,
		devtool: mode === "production" ? "none" : "source-map-inline",
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "[name]/index.js",
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /(node_modules)/,
					use: {
						loader: "ts-loader",
					},
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
		optimization: {
			minimize: false,
		},
		plugins,
		resolve: {
			extensions: [".js", ".ts", ".tsx"],
		},
	};

	return config;
};
