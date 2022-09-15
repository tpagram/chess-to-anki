const path = require("path");

module.exports = {
    entry: {
        background_scripts: "./background.js",
        extractMove: "./content_scripts/extractMove.js"
    },
    output: {
        path: path.resolve(__dirname, "extension"),
        filename: "[name]/index.js"
    }
};
