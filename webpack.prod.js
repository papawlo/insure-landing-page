const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    devtool: 'source-map',
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            })
        ],
    },

    plugins: [
        new ImageminPlugin({
            externalImages: {
                context: 'src',
                sources: glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}'),
                destination: 'dist/images',
                fileName: '[path][name].[ext]'
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/images', to: 'images' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 3. Extract CSS into files
                    MiniCssExtractPlugin.loader,
                    // 2. translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            removeCR: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'dist/images',
                },
            }
        ]
    },
});