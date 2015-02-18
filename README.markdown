# reverse-config

> Reverse npm package config environment variables into an object.

## Installation

    $ npm install reverse-config

## Reverse config, [what is it good for](http://en.wikipedia.org/wiki/The_Marine_Biologist#Plot)?

- homegrown config files contribute to local project clutter and global
  fragmentation; npm loves you, please love it back
- package.json `config` values become available as environment variables for
  npm `scripts`, but substitution syntax is shell dependent and accessing them
  programmatically can be slightly to extremely painful, depending on the
  config object's complexity
- users can
  [override package.json `config` values](https://docs.npmjs.com/files/package.json#config)
  without further ado; npm loves you, please love it back

### Wait, can't I simply do something like `require(path.resolve('package.json')).config`?

That would be a rather terrible idea, because the environment variable and the
corresponding object property might have different values.

## Gotchas

Don't use underscores in package.json `config` property names. Given

    {
      "config": {
        "foo": {
          "bar": 13
        },
        "foo_bar": 42
      }
    }

the value of `npm_package_config_foo_bar` is 42, not 13. The reversed
config object is

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
