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
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [ '@babel/preset-env', {
                                    targets: {
                                        browsers: [ 'ie 11' ],
                                    },
                                } ],
                            ],
                        },
                    },
                    'awesome-typescript-loader',
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
        'lodash-es',
        'luxon',
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
