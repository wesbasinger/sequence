var Circle = require('./Shapes/Circle');
var Triangle = require('./Shapes/Triangle');
var Diamond = require('./Shapes/Diamond');
var Rectangle = require('./Shapes/Rectangle');
var drawShape = require('./utils').drawShape;
var removeDuplicates = require('./utils').removeDuplicates;


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
  nthTerm.innerText = randomNthTerm;

  var simplifiedShapes = removeDuplicates(shapes)
  var sanitizedShapes = [];

  simplifiedShapes.forEach(shape => {
    sanitizedShapes.push(JSON.parse(shape));
  })


  sanitizedShapes.forEach(shape => {
    var btn = document.createElement("BUTTON");
    var tstring = shape.color + " " + shape.name;
    var t = document.createTextNode(tstring);
    btn.appendChild(t);
    btn.setAttribute("value", tstring);
    btn.addEventListener('click', function(e) {
      if (e.target.value === answer.color + " " + answer.name) {
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
