'use strict';
var config = {};
var identifierExpression = /^[a-z]+$/i;
var numericExpression = /^-?\d+$/;
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

function collapse(input) {
    return input
        .replace(/_{2,}/, '_')
        .replace(/^_/, '')
        .replace(/_$/, '')
}

function split(input) {
    return input.split('_');
}

function resolve(name) {
    var tokenList = split(collapse(name.replace(/[^a-z\d]/gi, '_')));
    var result = config;
    var match = tokenList.every(function (token) {
        result = result[token];
        return (undefined !== result);
    });

    return match
        ? result
        : undefined;
}

function get(key) {
    switch (typeof key) {
    case 'string':
        return identifierExpression.test(key)
            ? config[key]
            : resolve(key);
    case 'undefined':
        return config;
    default:
        throw new TypeError('expected undefined or string argument');
    }
}

Object.keys(process.env).forEach(function (variable) {
    var tokenList;

    if (0 !== variable.indexOf(PREFIX)) {
        return;
    }

    bucket = config;
    tokenList = split(collapse(variable.substring(PREFIX.length)));

    tokenList.forEach(function (key, index) {
        var next = tokenList[index + 1];

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

exports.get = get;
