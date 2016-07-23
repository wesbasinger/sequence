var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function randomColor() {
  var randValue = Math.random();
  if (randValue < 0.2) {
    return "red";
  } else if (randValue < 0.4) {
    return "blue";
  } else if (randValue < 0.6) {
    return "green";
  } else if (randValue < 0.8) {
    return "yellow";
  } else {
    return "orange";
  }
}

var Rectangle = function(originX, originY) {
  return  {
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

var drawShape = function(shapeObj, ctx, color) {
  ctx.beginPath();
  ctx.moveTo(shapeObj.firstPointX, shapeObj.firstPointY);
  ctx.lineTo(shapeObj.secondPointX, shapeObj.secondPointY);
  ctx.lineTo(shapeObj.thirdPointX, shapeObj.thirdPointY);
  ctx.lineTo(shapeObj.fourthPointX, shapeObj.fourthPointY);
  ctx.lineTo(shapeObj.firstPointX, shapeObj.firstPointY);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

var rect = new Rectangle(30, 30)
drawShape(rect, ctx, "blue");

var newRect = new Rectangle(90, 30);
drawShape(newRect, ctx, "green")

console.log(JSON.stringify(rect))
