const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin(),

    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
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
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
