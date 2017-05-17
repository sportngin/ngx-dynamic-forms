'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(require('./webpack.test.common'), {

    target: 'web',

    entry: {
        'test.app.umd': './test/test.bootstrap.ts'
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json', '.css', '.scss', '.pug', '.html' ]
    },

    devtool: 'source-map',

    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        library: 'ng-dynamic-forms',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './test/test.index.pug',
            filename: 'index.html',
            chunksSortMode: 'dependency'
        })
    ]
});