const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test:/\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            // {
            //     test:/\.(jpg|jpeg|gif|png)$/,
            //     use: 'file-loader'
            // }
            {
                test:/\.(jpg|jpeg|gif|png)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
		    template: path.resolve(__dirname,'src/index.html'),
		    filename:'index.html',
		    inject: true
		}),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}