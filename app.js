var rows = 12;
var cols = 22;
var w = 40;
var lineBlock = [[4,0], [5,0], [6,0], [7,0]];
var zBlock = [[4,0], [5,0], [5,w], [6,w]];
var shapes = [lineBlock, zBlock]
var currentShape
var newShape = true;




var game = {
  board: [],
  initboard: function() {
    game.board = []
    for (var i = 0; i < rows; i++) {
      var rowArray = []
      for (var j = 0; j < cols; j++) {
        rowArray.push(new Cell(i, j, w))
      }
      game.board.push(rowArray)
    }
  }
}


function setup() {
  createCanvas(481,881)
  game.initboard()
}

function draw() {
  background(255)
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      game.board[i][j].display()
    }
  }

    if(newShape) {

      // clone the array instead of the reference
      currentShape = shapes[round(random(0,1))].map(function(arr) {
        return arr.slice();
      })
      newShape = false;
    }
    for (var num = 0; num < currentShape.length; num++) {
      newBlock(currentShape[num][0], currentShape[num][1],num)
    }

    for (var num = 0; num < currentShape.length; num++) {
      if (newShape) {
        break;
      }
      fill(100)
      rect(currentShape[num][0]*w, currentShape[num][1], 40,40)
      currentShape[num][1] += 5
    }

}

function newBlock(x, y,index) {

  var roundJ = ceil(y/w);
  var roundI = x;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (game.board[i][j].coliding(roundI, roundJ)) {
        for (var index = 0; index < currentShape.length; index++) {
          roundJ = ceil(currentShape[index][1]/w)
          game.board[currentShape[index][0]][roundJ - 1].occupied = true
        }
        newShape = true;
        return
      }
    }
  }

  if (roundJ == cols) {
    for (var index = 0; index < currentShape.length; index++) {
      roundJ = ceil(currentShape[index][1]/w)
      game.board[currentShape[index][0]][roundJ - 1].occupied = true
    }
    newShape = true;
    return
  }
}



function keyPressed() {
  if (keyCode == 39) {
    var rightMost = currentShape[currentShape.length - 1]
    if (rightMost[0]*w < 480 - w) {
      var roundJ = round(rightMost[1]/w);
      // var roundI = round((x + w)/w);
      if (!game.board[rightMost[0]+1][roundJ].occupied) {
        for (var index = 0; index < currentShape.length; index++) {
          currentShape[index][0] +=1
        }
      }
    }

  }
  if (keyCode == 37) {
    var leftMost = currentShape[0]
    if (leftMost[0]*w > 0) {
      var roundJ = round(leftMost[1]/w);

      if (!game.board[leftMost[0]-1][roundJ].occupied) {
        for (var index = 0; index < currentShape.length; index++) {
          currentShape[index][0] -=1
        }
      }
    }
  }
}
