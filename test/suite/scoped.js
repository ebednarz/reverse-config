'use strict';
var expect = require('chai').expect;
var resetRequireCache = require('../library/reset-require-cache');
var getReverseConfig = require('../library/get-reverse-config');

describe('The `reverse-config` module', function () {
    beforeEach(resetRequireCache);

    it('can resolve package names used as a getter key', function () {
        var reverseConfig = getReverseConfig({
            'my_scope_mypackage_key': 'Config value'
        });
        var localConfig = reverseConfig.get('@my.scope/mypackage');

        expect(localConfig.key).to.equal('Config value');
    });
});
