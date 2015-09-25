'use strict';
var INDEX_PATH = require('./index-path');

function resetRequireCache() {
    var resolved = require.resolve(INDEX_PATH);
    delete require.cache[resolved];
}

module.exports = resetRequireCache;
