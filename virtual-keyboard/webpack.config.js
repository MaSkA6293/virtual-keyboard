const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
    "postcss-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: `./[name].[contenthash].js`,
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name][ext][query]",
  },
  devServer: {
    port: 4100,
    hot: isDev,
    static: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `./index.html`,
      template: "src/index.html",
      chunks: ["main"],
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/icons/favicon.ico"),
          to: path.resolve(__dirname, "dist/assets/icons"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: `./${filename("css")}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(png)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/icons/[hash][ext][query]",
        },
      },
    ],
  },
};