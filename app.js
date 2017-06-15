var rows = 12;
var cols = 22;
var w = 40;
var iBlock = [[4,0], [5,0], [6,0], [7,0]];
var iOffsets = [
  [[0,0], [-1,+1], [-2,+2], [-3,+3]],
  [[0,0], [+1,-1], [+2,-2], [+3,-3]],
  [[0,0], [-1,+1], [-2,+2], [-3,+3]],
  [[0,0], [+1,-1], [+2,-2], [+3,-3]]
];

var zBlock = [[4,0], [5,0], [5,w], [6,w]];
var tBlock = [[4,w], [5,0], [5,w], [6,w]];
var jBlock = [[4,0], [5,0], [6,0], [6,w]];
var lBlock = [[4,0], [4,w], [5,0], [6,0]];
var oBlock = [[5,0], [5,w], [6,0], [6,w]];
var shapes = [iBlock, zBlock, tBlock, jBlock, lBlock, oBlock]
var currentShape
var currentIndex = 0
var rotateState = 0
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
  },
  checkClear: function() {
    for (var j = 0; j < cols; j++) {
      var count = 0
      for (var i = 0; i < rows; i++) {
        if (game.board[i][j].occupied) {
          count ++
        }
      }
      // if all of the colom of a row ard filled, change them back to non-fill
      if (count == (rows)) {
        for (var index = 0; index < rows; index++) {
          game.board[index][j].occupied = false;
        }

        // after clearing, we need to change the all occupied cells y position + 1
        // from line j to line 0, move occupied status to the line below it, and set the current occupie status to false
        for (var num = 1; num <= j; num++) {
          for (var index = 0; index < rows; index++) {
            if(game.board[index][j - num].occupied) {
              game.board[index][j - num].occupied = false
              game.board[index][j - num + 1].occupied = true
            }
          }
        }
      }

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
    game.checkClear()
    // randomly pick an element in the shapes array
    // clone the array instead of the reference
    currentShape = shapes[0].map(function(arr) {
      return arr.slice();
    })
    newShape = false;
    rotateState = 0;
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


function rotateShape(shape) {
  if (!isRotatable(shape)) {
    return
  }
  var rotateOffsetState = rotateState % 4
  for (var i = 0; i < shape.length; i++) {
    shape[i][0] += iOffsets[rotateOffsetState][i][0]
    shape[i][1] += iOffsets[rotateOffsetState][i][1] * w
  }
  rotateState++;
}

function isRotatable(shape) {
  var rotateOffsetState = rotateState % 4
  for (var i = 0; i < shape.length; i++) {
    var roundJ = round((shape[i][1] + iOffsets[rotateOffsetState][i][1] * w)/w);
    var newI = shape[i][0] + iOffsets[rotateOffsetState][i][0];
    if (roundJ >= cols) {
      return false;
    }
    if (
      shape[i][0] + iOffsets[rotateOffsetState][i][0] < 0 ||
      shape[i][0] + iOffsets[rotateOffsetState][i][0] >= rows ||
      shape[i][1] + iOffsets[rotateOffsetState][i][1] * w < 0 ||
      shape[i][1] + iOffsets[rotateOffsetState][i][1] * w > 880 ||
      game.board[newI][roundJ].occupied
    ) {
      return false
    }
  }
  return true
}


function keyPressed() {
  if (keyCode == 32) {
    rotateShape(currentShape)
  }

  if (keyCode == 39) {
    for (var i = 0; i < currentShape.length; i++) {
      var roundJ = round(currentShape[i][1]/w)
      if (currentShape[i][0] * w >= 480 - w) {
        return
      }
      if (game.board[currentShape[i][0]+1][roundJ].occupied) {
        return
      }
    }
    for (var index = 0; index < currentShape.length; index++) {
      currentShape[index][0] +=1
    }
  }

  if (keyCode == 37) {
    for (var i = 0; i < currentShape.length; i++) {
      var roundJ = round(currentShape[i][1]/w)
      if (currentShape[i][0] * w <= 0) {
        return
      }
      if (game.board[currentShape[i][0]-1][roundJ].occupied) {
        return
      }
    }
    for (var index = 0; index < currentShape.length; index++) {
      currentShape[index][0] -=1
    }

  }
}
