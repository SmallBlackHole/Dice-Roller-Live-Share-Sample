/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

module.exports = (env) => {
    const htmlTemplate = "./src/index.html";
    const plugins =
        env && env.clean
            ? [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: htmlTemplate }), new Dotenv()]
            : [new HtmlWebpackPlugin({ template: htmlTemplate }), new Dotenv()];

    const mode = env && env.prod ? "production" : "development";

    return {
        devtool: "inline-source-map",
        entry: {
            app: "./src/app.js",
        },
        mode,
        output: {
            filename: "[name].[contenthash].js",
        },
        plugins,
        devServer: {
            open: false,
            https: {
                key: fs.readFileSync(process.env.SSL_KEY_FILE),
                cert: fs.readFileSync(process.env.SSL_CRT_FILE),
            },
        },
    };
};
