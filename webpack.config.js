const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    content_scripts: "./content_scripts/meta_search.js",
    popup: "./popup/popup.jsx",
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
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "h", pragmaFrag: "Fragment" }]
            ],
          },
        },
      },
    ],
  },
  plugins: [
    //new CleanWebpackPlugin(),
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
    extensions: [".js", ".jsx"],
  },
};
