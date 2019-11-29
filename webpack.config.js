const devMode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/npm-build",
        filename: "js/bundle.js",
        publicPath: "/content/"
    },
    module: {
        rules: [
            // Javascript
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    } 
                }]                        
            },
            // Stylesheets
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } }, 
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            },
            // Font Definitions
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            },
            // Images
            { 
                test: /\.(gif|png)$/,  
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/"
                    }
                }]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "LEDS",
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        })
    ],
    watch: true,
    mode : devMode ? "development" : "production",
}
