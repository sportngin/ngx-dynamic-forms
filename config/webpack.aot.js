const path = require('path');
const merge = require('webpack-merge');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = merge(require('./webpack.build.common'), {

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    '@ngtools/webpack'
                ]
            }
        ]
    },

    output: {
        path: path.resolve(process.cwd(), 'out/aot')
    },

    plugins: [
        new AotPlugin({
            tsConfigPath: 'tsconfig.aot.json',
            entryModule: 'src/dynamic.forms.module#DynamicFormsModule'
        })
    ]
});