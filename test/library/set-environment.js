'use strict';
var resetEnvironment = require('./reset-environment');
var CONFIG_PREFIX = require('./config-prefix');

function setEnvironment(config) {
    resetEnvironment();
    Object
        .keys(config)
        .forEach(function (key) {
            process.env[CONFIG_PREFIX + key] = config[key];
        })
}

module.exports = setEnvironment;
