var randomColor = require('../utils').randomColor;

var Triangle = function(originX, originY) {
  return  {
    name: "triangle",
    color: randomColor(),
    firstPointX : originX,
    firstPointY : originY + 50,
    secondPointX : originX + 25,
    secondPointY: originY,
    thirdPointX: originX + 50,
    thirdPointY : originY + 50,
    fourthPointX: originX,
    fourthPointY: originY + 50
  }
}

module.exports = Triangle;
