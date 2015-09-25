'use strict';
var setEnvironment = require('./set-environment');
var INDEX_PATH = require('./index-path');

function getReversedConfig(config) {
    setEnvironment(config);
    return require(INDEX_PATH);
}

module.exports = getReversedConfig;
