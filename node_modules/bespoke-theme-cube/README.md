[![Build Status](http://img.shields.io/travis/markdalgleish/bespoke-theme-cube/master.svg?style=flat)](https://travis-ci.org/markdalgleish/bespoke-theme-cube)

# bespoke-theme-cube

Cube theme for [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) &mdash; [View demo](http://markdalgleish.github.io/bespoke-theme-cube/)

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/markdalgleish/bespoke-theme-cube/master/dist/bespoke-theme-cube.min.js
[max]: https://raw.github.com/markdalgleish/bespoke-theme-cube/master/dist/bespoke-theme-cube.js

## Usage

This theme is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  cube = require('bespoke-theme-cube');

bespoke.from('#presentation', [
  cube()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.themes.cube()
]);
```

## Credits

This theme was built with [generator-bespoketheme](https://github.com/markdalgleish/generator-bespoketheme).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
