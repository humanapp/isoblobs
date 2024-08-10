const webpack = require('webpack')
const { aliasWebpack } = require("react-app-alias-ex");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (config, env) {
    const isEnvProduction = env === "production";
    const aliasFn = aliasWebpack({});
    config = {
        ...aliasFn(config),
        plugins: [
            ...config.plugins.filter((p) => !(p instanceof HtmlWebpackPlugin)),
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: "./public/index.html",
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: false,
                                  collapseWhitespace: false,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined
                )
            ),
        ],
    };
    return config;
};