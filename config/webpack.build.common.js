const path = require('path');

module.exports = {

    target: 'web',

    entry: {
        'dynamic.forms.umd': './index.ts'
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json', '.css', '.scss', '.pug', '.html' ]
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
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
    ]
};