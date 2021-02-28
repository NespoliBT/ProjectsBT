const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var nodeExternals = require("webpack-node-externals");

const clientConfig = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },

  devtool: "inline-source-map",
  mode: "production",
  target: "electron-renderer",
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
  ],
};

const serverConfig = {
  mode: "development",
  entry: "./backend/main.ts",

  target: "electron-main",
  externals: [nodeExternals()],

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    filename: "main.js",
  },
};

module.exports = [clientConfig, serverConfig];
