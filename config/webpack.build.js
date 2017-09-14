'use strict';

const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = merge(require('./webpack.common'), {

    target: 'web',

    entry: {
        'dynamic.forms.umd': './index.ts'
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
        library: '@siplay/ng-dynamic-forms',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    externals: [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        // 'reflect-metadata',
        'rxjs/Rx',
        'zone.js'
    ],

    plugins: [
        // new TypedocWebpackPlugin({
        //
        // }),

        new CopyWebpackPlugin([{
            from: './src/scss',
            to: './scss'
        }])
    ]
});