var randomColor = require('../utils').randomColor;

var Circle = function(originX, originY) {
  return {
    name: 'circle',
    color: randomColor(),
    originX: originX,
    originY: originY
  }
}

module.exports = Circle;
