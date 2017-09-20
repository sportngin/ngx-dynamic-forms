const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const helpers = require('./helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge({

    entry: {
        'test.app.umd': './test/app/test.bootstrap.ts'
    },

    devtool: 'cheap-module-source-map',

    target: 'web',

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'ts-loader?configFile=test/tsconfig.json',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                loader: 'raw-loader'
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
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=font/[name].[ext]'
            }
        ]
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json', '.css', '.scss', '.pug', '.html' ],

        modules: [
            'node_modules',
            path.resolve(__dirname, '../test/modules')
        ]
    },

    output: {
        publicPath: '/',
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        library: '@siplay/ng-dynamic-forms',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),

        new HtmlWebpackPlugin({
            template: './test/app/test.index.pug',
            filename: 'index.html',
            chunksSortMode: 'dependency'
        }),

        new ExtractTextPlugin('style.css'),

        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: false
        }),

        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
    ],

    devServer: {
        host: '0.0.0.0',
        port: '8888',
        disableHostCheck: true
    }
});