const helpers = require('./helpers');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        moduleExtensions: ['-loader'] // To bypass mocha-loader incompatibility with webpack :
                                      // mocha-loader still using loaders without the "-loader" suffix,
                                      // which is forbidden with webpack v2
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?configFileName=./test/tsconfig.json&declaration=false',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.pug$/,
                loader: ['raw-loader', 'pug-html-loader']
            },
            {
                test: /\.component\.scss$/,
                exclude: /node_modules/,
                loader: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                exclude: /\.component\.scss$/,
                use: 'null-loader'
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),
    ],

    performance: {
        hints: false
    }
};