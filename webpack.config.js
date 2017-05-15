'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    target: 'web',

    entry: {
        'dynamic.forms.umd': './index.ts'
    },

    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        library: 'ng-dynamic-forms',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['.js', '.ts', '.json', '.css', '.scss', '.pug', '.html']
    },

    devtool: 'source-map',

    module: {
        loaders: [

            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader?configFileName=./tsconfig.json&declaration=false',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(ico)$/,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                use: 'file-loader?name=font/[name].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            // minimize: true,
            debug: false
        }),

        new webpack.ProgressPlugin(),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(process.cwd(), 'src')
        ),

        new webpack.optimize.OccurrenceOrderPlugin(true),

        new ExtractTextPlugin('styles.css')
    ],

    externals: [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        // 'reflect-metadata',
        'rxjs/Rx',
        'zone.js'
    ]
};