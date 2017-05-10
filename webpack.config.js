const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');

module.exports = {

    target: 'web',

    entry: {},

    output: {
        publicPath: '/',
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[file].map'
    },

    resolve: {
        extensions: ['.js', '.ts', '.json', '.css', '.scss', '.pug', '.html']
    },

    devtool: 'source-map',

    module: {
        loaders: [

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
        new webpack.ProgressPlugin(),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(process.cwd(), 'src')
        ),

        new webpack.optimize.OccurrenceOrderPlugin(true),

        new ExtractTextPlugin('styles.css')
    ]
};