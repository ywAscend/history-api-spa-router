const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: Path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[name].[hash:10].[ext]',
                    outputPath: 'imgs'

                }
            },
            {  
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: './build',
        compress: true,
        port: 3000,
        open: true,
        proxy:{
            '/API':{
                target:'http://mobilecdnbj.kugou.com',
                pathRewrite:{"^/API":""},
                changeOrigin: true,
                secure:false 
            }
        }
    },
    devtool: 'source-map'  
}