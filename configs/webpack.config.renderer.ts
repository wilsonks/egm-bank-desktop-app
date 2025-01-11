const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


var commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
              loader: MiniCssExtractPlugin.loader, 
              options: {
                  publicPath: ''
              }
          },
          {
              loader: "css-loader"
          }
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/images/[name].[ext]",
        },
      },
      {
        test: /\.(mp3|wav)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "assets/sounds/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          publicPath: "",
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};


var appConfig = Object.assign({}, commonConfig, {
  target: "web",
  name: "app",
  entry: "./src/renderer/index.js",
  output: {
    filename: "app-bundle.js",
    path: path.resolve(__dirname, "../release/app/dist/renderer"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/renderer/index.html" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
});


module.exports = () => {
  return [
    appConfig,
  ];
};
