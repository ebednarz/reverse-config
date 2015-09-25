'use strict';
var CONFIG_PREFIX = require('./config-prefix');

function resetEnvironment() {
    Object
        .keys(process.env)
        .forEach(function (key) {
            if (0 === key.indexOf(CONFIG_PREFIX)) {
                delete process.env[key];
            }
        });
}

module.exports = resetEnvironment;
