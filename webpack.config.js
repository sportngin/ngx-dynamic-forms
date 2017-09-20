const merge = require('webpack-merge');

const ENV = process.env.npm_lifecycle_event;

module.exports = merge(require(`./config/webpack.${ENV}`), require('./config/webpack.common'));