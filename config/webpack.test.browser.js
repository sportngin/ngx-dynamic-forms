var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var commonTestConfig = require('./webpack.test.common.js');

module.exports = webpackMerge(commonTestConfig, {
    target: 'web',

    entry: {
        'test': 'mocha-loader!./config/mocha/mocha-browser-test-shim.js'
    },

    output: {
        path: helpers.root('tests'),
        publicPath: '/',
        filename: 'test.bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: helpers.root('test/mocha-index.html')
        })
    ]
});