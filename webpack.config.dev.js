const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
                test: /\.css$/,
                include: APP_DIR,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:
                                    "[name]__[local]___[hash:base64:5]",
                            },
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
    devServer: {
        client: {
            overlay: false,
        },
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
};
