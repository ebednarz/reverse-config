# reverse-config  [![npm version][npm-image]][npm-url] [![npm dependencies][david-image]][david-url]

> Reverse npm package config environment variables into an object.

## Installation

    $ npm install reverse-config

## Reverse config, [What is it Good For](http://en.wikipedia.org/wiki/The_Marine_Biologist#Plot)?

- homegrown config files contribute to local project clutter and global
  fragmentation; npm loves you, please love it back
- users can
  [override package.json `config` values](https://docs.npmjs.com/files/package.json#config)
  without further ado; npm loves you, please love it back
- package.json `config` values become available as environment variables for
  npm `scripts`, but substitution syntax is shell dependent and accessing them
  programmatically can be slightly to extremely painful, depending on the
  config object's complexity

### Wait, can't I simply do something like `require(path.resolve('package.json')).config`?

That would be a rather terrible idea, because the environment variable and the
corresponding object property might have different values.

## Gotchas

### TL;DR

- `config` object property names
    - MUST NOT be numeric
    - SHOULD NOT contain underscores
- `config` values SHOULD NOT be
    - numeric strings
    - the string literals "true", "false" or "null"

Mnemonic version: Don't be silly.

### Ambiguities

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

the resulting environment variable is `npm_package_config_foo_0`.
The reversed config object is

    {
      "foo": [
        42
      ]
    }

Likewise, given either

    {
      "config": {
        "foo": {
          "bar": 42
        }
    }

or

    {
      "config": {
        "foo_bar": 42
      }
    }

the resulting environment variable is `npm_package_config_foo_bar`.
The reversed config object is

    {
      "foo": {
        "bar": 42
      }
    }

Since creating environment variables from JSON is a somewhat destructive
one-way process, values are coerced during reversion with good faith as follows:

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

[david-image]: https://img.shields.io/david/ebednarz/reverse-config.svg?style=flat-square
[david-url]: https://david-dm.org/ebednarz/reverse-config
[npm-image]: https://img.shields.io/npm/v/reverse-config.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/reverse-config

