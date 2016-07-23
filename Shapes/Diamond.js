var randomColor = require('../utils').randomColor;

var Diamond = function(originX, originY) {
  return  {
    name: "diamond",
    color: randomColor(),
    firstPointX : originX + 25,
    firstPointY : originY,
    secondPointX : originX + 50,
    secondPointY: originY + 25,
    thirdPointX: originX + 25,
    thirdPointY : originY + 50,
    fourthPointX: originX,
    fourthPointY: originY + 25
  }
}

module.exports = Diamond;
