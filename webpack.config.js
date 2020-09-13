const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        content_scripts: "./content_scripts/meta_search.js",
        popup: "./popup/popup.js",
    },
    mode: "development",
    devtool: "source-map-inline",
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "MetaSearch",
            filename: "popup/index.html",
            chunks: ["popup"]
        })
    ]
};