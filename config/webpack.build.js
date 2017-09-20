const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = merge(require('./webpack.build.common'), {

    module: {
        loaders: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                    'angular2-template-loader'
                ]
            }
        ]
    },

    output: {
        path: path.resolve(process.cwd(), 'dist')
    },

    externals: [
        '@angular/animations',
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/platform-browser',
        'bootstrap',
        'lodash',
        'moment',
        'reflect-metadata',
        'rxjs',
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