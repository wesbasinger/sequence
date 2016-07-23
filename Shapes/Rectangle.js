var randomColor = require('../utils').randomColor;

var Rectangle = function(originX, originY) {
  return  {
    name: "rectangle",
    color: randomColor(),
    firstPointX : originX,
    firstPointY : originY,
    secondPointX : originX + 50,
    secondPointY: originY,
    thirdPointX: originX + 50,
    thirdPointY : originY + 50,
    fourthPointX: originX,
    fourthPointY: originY + 50
  }
}

module.exports = Rectangle;
