const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?configFileName=./src/tsconfig.json&declaration=false',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.component\.scss$/,
                exclude: /node_modules/,
                loader: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                exclude: /\.component\.scss$|\/scss\//,
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
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
};