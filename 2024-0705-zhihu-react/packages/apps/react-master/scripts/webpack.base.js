const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(isDev) {


    return {
        // 1. 输入输出 部分
        // 最基础的，入口
        entry: path.resolve(__dirname, '../src/index.tsx'),
        output: {
            // 打包输出的结果路径
            path: path.resolve(__dirname, '../dist'),
            // 每个输出的 js 的名称
            // hash, contentHash, chunkHash 
            filename: "static/js/[name].[hash:8].js",
            // webpack5 内置，构建前删除一下 dist.
            // webpack4 没有，clean-webpack-plugin.
            clean: true,
            // 打包后文件的公共前缀路径
            publicPath: '/'
        },

        // 2. resolve 部分
        // extensions, 是 webpack 的解析项，用于在引入模块时，可以不带文件后缀
        resolve: {
            // 这个优先级，也是会影响性能的。
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },

        // 3. loader 部分
        module: {
            // loader 就是你在从入口文件，去解析各种 import from 的文件时。
            // 针对不同的文件，有不同的处理方法，这些不同后缀的文件，需要有一个
            // 解析器，去识别它的含义，从而保证可以最后形成一个 bundle.
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    use: {
                        loader:'babel-loader'
                    }
                },
                // postcss-loader: 帮我们处理一下语法转换，postcss 就是 css 界的 babel .
                // css-loader: 主要是处理 路径，<link>
                // style-loader: 其实是帮我们把 css 的属性，放到元素的内联样式上。
                // dev: css 嵌套在 style 标签里，可以方便热替换；
                // prod: 我们希望使用 mini-css-extract-plugin，帮我们单独抽离出来，方便缓存。
                {
                    oneOf: [
                        {
                            test: /\.css$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader"
                            ]
                        },
                        // 定义一个规则，模块化的，我们用 xxx.module.css 这种格式处理
                        {
                            test: /\.module\.(less|css)$/,
                            include: [path.resolve(__dirname, "../src")],
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: {
                                            // 我们这里就可以借助 css-module， 实现 BEM 风格
                                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                                        }
                                    }
                                },
                                "postcss-loader",
                                "less-loader"
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                                "css-loader",
                                "postcss-loader",
                                "less-loader"
                            ]
                        },
                        {
                            // webpack5 以前要单独的 laoder (url, file)，去处理，现在内置了
                            test: /\.(png|jpg|jpeg|gif|svg)$/,
                            generator: {
                                filename: 'static/images/[name].[contenthash:8][ext]',
                            }
                        },
                        {
                            // webpack5 以前要单独的 laoder (url, file)，去处理，现在内置了
                            test: /\.(woff2?|eot|ttf|otf)$/,
                            generator: {
                                filename: 'static/fonts/[name].[contenthash:8][ext]',
                            }
                        },
                        {
                            // webpack5 以前要单独的 laoder (url, file)，去处理，现在内置了
                            test: /\.(mp4|flv|mp3|wav)$/,
                            generator: {
                                filename: 'static/media/[name].[contenthash:8][ext]',
                            }
                        }
                    ]
                },

                
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                // 就是把我们的js和css 注入到一个 html 的模板里
                template: path.resolve(__dirname, "../public/index.html"),
                // 自动注入资源文件
                inject: true,
            }),

            new MiniCssExtractPlugin({
                filename: isDev ? 'static/css/[name].css' :
                "static/css/[name].[contenthash:4].css"
            })
        ]
    }
}