const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
// Specify separate paths
const APP_DIR = path.resolve(__dirname, "./src");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false, // this option will solve the issue
            },
          },
        },
        exclude: "/node_modules/",
      },
      {
        include: APP_DIR,
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new Dotenv()
  ],
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: false,
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3004,
    hot: true,
    allowedHosts: ['192.168.1.50', 'aikido.sytes.net', 'http://aikido.sytes.net/'],
  },
};
