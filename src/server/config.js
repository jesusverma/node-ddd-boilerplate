const path = require('path');

const ENV = process.env.NODE_ENV || 'dev';

const configPath = path.resolve('config');
const appConfig = require(configPath);

const config = Object.assign({}, appConfig);

module.exports = config;
