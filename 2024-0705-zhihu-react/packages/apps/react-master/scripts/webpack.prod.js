const { merge } = require('webpack-merge');
const baseCfg = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseCfg(), {
    mode: "production",

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                // 多线程并行压缩 js 
                parallel: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn']
                    }
                }
            })
        ],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: /node_modules/,
                    // minChunk:3  -- 使用3次数，才提取成公共的
                    // chunks initail 只提取初始化的，不管异步的
                    // minSize // -- 最小多大的文件，我才提取

                },
                commons: {
                    name: "commons"
                }
            }
        }
    }
});