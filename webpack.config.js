const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./content_scripts/meta_search.js",
    },
    mode: "development",
    devtool: "source-map-inline",
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    },
};