var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var startX = 50;
var startY = 50;

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

var Circle = function(originX, originY) {
  return {
    name: 'circle',
    color: randomColor(),
    originX: originX,
    originY: originY
  }
}

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

var drawShape = function(shapeObj, ctx) {
  if (shapeObj.name === "circle") {
    ctx.beginPath();
    ctx.arc(shapeObj.originX + 25, shapeObj.originY + 25, 25, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = shapeObj.color;
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(shapeObj.firstPointX, shapeObj.firstPointY);
    ctx.lineTo(shapeObj.secondPointX, shapeObj.secondPointY);
    ctx.lineTo(shapeObj.thirdPointX, shapeObj.thirdPointY);
    ctx.lineTo(shapeObj.fourthPointX, shapeObj.fourthPointY);
    ctx.lineTo(shapeObj.firstPointX, shapeObj.firstPointY);
    ctx.closePath();
    ctx.fillStyle = shapeObj.color;
    ctx.fill();
  }
}

var makeSequence = function() {
  var shapes = [];
  for (var i=0; i<5; i++) {
    var randValue = Math.random();
    if (randValue < 0.25) {
      shapes.push(new Rectangle(startX + i*70, startY));
    } else if (randValue < 0.50) {
      shapes.push(new Diamond(startX + i*70, startY));
    } else if (randValue < 0.75) {
      shapes.push(new Circle(startX + i*70, startY));
    } else {
      shapes.push(new Triangle(startX + i*70, startY));
    }
  }
  return shapes;
}

var shapes = makeSequence();

shapes.forEach(shape => {
  drawShape(shape, ctx);
});
