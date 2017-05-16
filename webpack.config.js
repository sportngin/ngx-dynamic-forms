'use strict';

switch (process.env.NODE_ENV) {
    case 'test':
        module.exports = require('./config/webpack.test.config');
        break;
    default:
        module.exports = require('./config/webpack.build');
        break;
}