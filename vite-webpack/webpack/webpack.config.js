const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "assets/webpack-sample.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        //use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  target: "web",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({ filename: "assets/webpack-sample.css" }),
  ],
};
