/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Circle = __webpack_require__(1);
	var Triangle = __webpack_require__(3);
	var Diamond = __webpack_require__(4);
	var Rectangle = __webpack_require__(5);
	var drawShape = __webpack_require__(2).drawShape;
	var removeDuplicates = __webpack_require__(2).removeDuplicates;


	var canvas = document.getElementById('canvas');
	var gc = document.getElementById('gameControl');
	var choiceDiv = document.getElementById('choices');
	var fb = document.getElementById('feedback');

	var ctx = canvas.getContext('2d');
	var startX = 50;
	var startY = 50;

	var gameLoop = function() {
	  ctx.clearRect(0,0, canvas.width, canvas.height);
	  gc.innerHTML = "";
	  fb.innerText = "";
	  choiceDiv.innerHTML = "";
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

	  var randomNthTerm = Math.floor(Math.random() * (10 - 6)) + 6;
	  var answer = shapes[randomNthTerm % 5 - 1];

	  var nthTerm = document.getElementById('nth');
	  if (randomNthTerm === 1) {
	    nthTerm.innerText = randomNthTerm + "st";
	  } else if (randomNthTerm === 2) {
	    nthTerm.innerText = randomNthTerm + "nd";
	  } else if (randomNthTerm === 3) {
	    nthTerm.innerText = randomNthTerm + "rd"
	  } else {
	    nthTerm.innerText = randomNthTerm + "th";
	  }

	  var simplifiedShapes = removeDuplicates(shapes)
	  var sanitizedShapes = [];

	  simplifiedShapes.forEach(shape => {
	    sanitizedShapes.push(JSON.parse(shape));
	  })


	  sanitizedShapes.forEach(shape => {
	    var btn = document.createElement("BUTTON");
	    var tstring = shape.color[0].toUpperCase() + shape.color.substring(1) + " " + shape.name[0].toUpperCase() + shape.name.substring(1);
	    var t = document.createTextNode(tstring);
	    btn.appendChild(t);
	    btn.setAttribute("value", tstring);
	    btn.addEventListener('click', function(e) {
	      if (e.target.value.toLowerCase() === answer.color + " " + answer.name) {
	        fb.innerText = "Good job, you got it!";
	        newGame();
	      } else {
	        fb.innerText = "Nope, sorry, try again.";
	        newGame();
	      }
	    })
	    choiceDiv.appendChild(btn);
	  });
	}

	var newGame = function() {
	  var btn = document.createElement("BUTTON");
	  var t = document.createTextNode("New Game");
	  btn.appendChild(t);
	  btn.addEventListener('click', function(e) {
	    gameLoop();
	  });
	  gc.appendChild(btn);
	}

	gameLoop();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var randomColor = __webpack_require__(2).randomColor;

	var Circle = function(originX, originY) {
	  return {
	    name: 'circle',
	    color: randomColor(),
	    originX: originX,
	    originY: originY
	  }
	}

	module.exports = Circle;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var randomColor = __webpack_require__(2).randomColor;

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var randomColor = __webpack_require__(2).randomColor;

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var randomColor = __webpack_require__(2).randomColor;

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


/***/ }
/******/ ]);