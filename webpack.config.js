const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content_scripts: "./content_scripts/meta_search.js",
    popup: "./popup/popup.tsx",
  },
  mode: "development",
  devtool: "source-map-inline",
  output: {
    path: path.resolve(__dirname, "addon"),
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MetaSearch",
      filename: "popup/index.html",
      template: "./popup/index.html",
      chunks: ["popup"],
    }),
    new CopyPlugin({
      patterns: ["manifest.json", "web-ext.config.js"],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
