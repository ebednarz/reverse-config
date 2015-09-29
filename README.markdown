# reverse-config [![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

> Reverse npm package config environment variables into an object.

## Installation

    $ npm install reverse-config

## reverse-config, [What is it Good For](http://en.wikipedia.org/wiki/The_Marine_Biologist#Plot)?

- use built in `npm` functionality instead of homegrown configuration formats and parsers
- [selectively override configuration](https://docs.npmjs.com/files/package.json#config) 
  for local development in your `~/.npmrc`

Essentially, this package is just syntactic sugar for reading 
`npm_package_config_*` properties from `process.env`.

## Usage

    var reverseConfig = require('reverse-config');
    reverseConfig.get({string} [key])
    
- if `key` is undefined, the entire configuration object is returned
- if `key` is alphanumeric, it is used as property accessor for the configuration object 
- otherwise
    - all non-alphanumeric characters are replaced by underscores
    - consecutive underscores are collapsed to a single one
    - leading and trailing underscores are stripped
    - the remaining value is split with the underscore and used as a 'deep' property accessor
        - example: `.get('@my.scoped/package')` would try to access 
          `.my.scoped.message` in the configuration object

## Gotchas

The `npm` transformation of the package.json `config` object 
to environment variables is a destructive process.

Given either

    {
      "config": {
        "foo": [
          42
        ]
      }
    }

or

    {
      "config": {
        "foo": {
          "0": 42
        }
      }
    }

or 

    {
      "config": {
        "foo_0": "42"
      }
    }

the resulting environment variable name is `npm_package_config_foo_0`, 
and its value the string '42'.

Rule of thumb: only use alphanumeric property names.

The *useful* exception would be package names used as config *sections*, e.g.

    {
      "config": {
        "my_package": {},
        "@my.scope/my-package": {},
      }
    }

Use with moderation and pretend to be a responsible adult.

### Values

During reversion values are coerced with good faith as follows:

- numeric string => {number}
- 'true' => {boolean} true
- 'false' => {boolean} false
- 'null' => {null} null

In other words, you might face surprises if you use strings like
"42", "true", "false" or "null" as property values in your package.json
config object.
[Don't do that then!](http://www.catb.org/jargon/html/D/Don-t-do-that-then-.html).

## License

MIT

[npm-image]: https://img.shields.io/npm/v/reverse-config.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/reverse-config
[travis-image]: https://img.shields.io/travis/ebednarz/reverse-config.svg?style=flat-square
[travis-url]: https://travis-ci.org/ebednarz/reverse-config
