module.exports = {
  randomColor: function () {
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
  },
  drawShape: function(shapeObj, ctx) {
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
  },
  removeDuplicates: function(objArray) {
    var bigObj = {};
    objArray.forEach(obj => {
      if (!bigObj[JSON.stringify({color: obj.color, name: obj.name})]) {
        bigObj[JSON.stringify({color: obj.color, name: obj.name})] = obj;
      }
    });
    return(Object.keys(bigObj));
  }
}
