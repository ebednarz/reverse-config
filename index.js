'use strict';
var config = {};
var numericExpression = /^\d+$/;
var PREFIX = 'npm_package_config_';
var bucket;

function mangle(value) {
    switch (value) {
    case 'true':
        return true;
    case 'false':
        return false;
    case 'null':
        return null;
    }

    if (numericExpression.test(value)) {
        return +value;
    }

    return value;
}

Object.keys(process.env).forEach(function (variable) {
    var tokens;

    if (0 !== variable.indexOf(PREFIX)) {
        return;
    }

    bucket = config;
    tokens = variable.substring(PREFIX.length).split('_');
    tokens.forEach(function (key, index) {
        var next = tokens[index + 1];

        if (!next) {
            bucket[key] = mangle(process.env[variable]);
            return;
        }

        if (!bucket.hasOwnProperty(key)) {
            bucket[key] = numericExpression.test(next) ? [] : {};
        }

        bucket = bucket[key];
    });
});

module.exports = config;
