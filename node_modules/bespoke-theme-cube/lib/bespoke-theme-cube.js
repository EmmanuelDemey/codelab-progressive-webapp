var fs = require('fs');
var classes = require('bespoke-classes');
var insertCss = require('insert-css');

module.exports = function() {
  var css = fs.readFileSync(__dirname + '/tmp/theme.css', 'utf8');
  insertCss(css, { prepend: true });

  return function(deck) {
    classes()(deck);

    var wrap = function(element) {
      var wrapper = document.createElement('div');
      wrapper.className = 'bespoke-theme-cube-slide-parent';
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    };

    deck.slides.forEach(wrap);
  };
};
