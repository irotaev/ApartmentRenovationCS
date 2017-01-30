const WebpackMerge = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CommonConfig = require('./common.js'),
    DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = WebpackMerge(CommonConfig, {

    debug: true,
    devtool: 'eval-cheap-source-map',

    output: {
        path: './dist',
		pathinfo: true,
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
    },

    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
    },

    devServer: {
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: './dist'
    },

    plugins: [
        new DefinePlugin({
            "process.env.ENV": JSON.stringify('dev')
        })
    ]

});
