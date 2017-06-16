
var rows = 12;
var cols = 22;
var w = 40;
var speed = 4;
var iBlock = [[4,0], [5,0], [6,0], [7,0]];
var iOffsets = [
  [[0,0], [-1,+1], [-2,+2], [-3,+3]],
  [[0,0], [+1,-1], [+2,-2], [+3,-3]],
  [[0,0], [-1,+1], [-2,+2], [-3,+3]],
  [[0,0], [+1,-1], [+2,-2], [+3,-3]]
];

var zBlock = [[4,0], [5,0], [5,w], [6,w]];
var zOffsets = [
  [[+1,+0], [+0,+1], [-1,+0], [-2,+1]],
  [[-1,-0], [+0,-1], [+1,-0], [+2,-1]],
  [[+1,+0], [+0,+1], [-1,+0], [-2,+1]],
  [[-1,-0], [+0,-1], [+1,-0], [+2,-1]]
];

var tBlock = [[4,w], [5,0], [5,w], [6,w]];
var tOffsets = [
  [[+0,-1], [+0,+1], [-1,+0], [-2,+1]],
  [[+2,-0], [+0,+0], [+1,-1], [+0,-2]],
  [[+0,+2], [+0,+0], [+1,+1], [+2,+0]],
  [[-2,+0], [+0,+0], [-1,+1], [+0,+2]]
];

var jBlock = [[4,0], [5,0], [6,0], [6,w]];
var jOffsets = [
  [[+1,+0], [+0,+1], [-1,+2], [-2,+1]],
  [[+1,+2], [+0,+1], [-1,+0], [+0,-1]],
  [[-2,+0], [-1,-1], [+0,-2], [+1,-1]],
  [[+0,-2], [+1,-1], [+2,+0], [+1,+1]]
];

var lBlock = [[4,0], [4,w], [5,0], [6,0]];
var lOffsets = [
  [[+1,+0], [+0,-1], [+0,+1], [-1,+2]],
  [[+1,+1], [+2,+0], [+0,+0], [-1,-1]],
  [[-2,+1], [-1,+2], [-1,+0], [+0,-1]],
  [[+0,-2], [-1,-1], [+1,-1], [+2,+0]]
]

var oBlock = [[5,0], [5,w], [6,0], [6,w]];
var oOffsets = [
  [[0,0], [0,0], [0,0], [0,0]],
  [[0,0], [0,0], [0,0], [0,0]],
  [[0,0], [0,0], [0,0], [0,0]],
  [[0,0], [0,0], [0,0], [0,0]]
]

var sBlock = [[4,w], [5,w], [5,0], [6,0]]
var sOffsets = [
  [[+0,-1], [-1,+0], [+0,+1], [-1,+2]],
  [[+0,+1], [+1,+0], [+0,-1], [+1,-2]],
  [[+0,-1], [-1,+0], [+0,+1], [-1,+2]],
  [[+0,+1], [+1,+0], [+0,-1], [+1,-2]]
]

var shapes = [iBlock, zBlock, tBlock, jBlock, lBlock, oBlock, sBlock]
var offsets = [iOffsets, zOffsets, tOffsets, jOffsets, lOffsets, oOffsets, sOffsets]
var currentShape
var currentIndex
var rotateState = 0
var newShape = true;
var state = -1;
var pause = false;


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
  noLoop()
}

function start() {
  state ++;
  loop()
}

function draw() {
  background(255)
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      game.board[i][j].display()
    }
  }
  if (state < 0) {
    return
  }

  if (state > 0) {
    noLoop()
  }



  if(newShape) {
    game.checkClear()

    // randomly pick an element in the shapes array
    // clone the array instead of the reference
    currentIndex = floor(random(0, shapes.length))
    console.log(currentIndex);
    currentShape = shapes[currentIndex].map(function(arr) {
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
    currentShape[num][1] += speed
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
          if (roundJ-1 <0) {
            gameOver()
            return
          }
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
    shape[i][0] += offsets[currentIndex][rotateOffsetState][i][0]
    shape[i][1] += offsets[currentIndex][rotateOffsetState][i][1] * w

  }
  rotateState++;
}

function isRotatable(shape) {
  var rotateOffsetState = rotateState % 4
  for (var i = 0; i < shape.length; i++) {
    var roundJ = round((shape[i][1] + offsets[currentIndex][rotateOffsetState][i][1] * w)/w);
    var newI = shape[i][0] + offsets[currentIndex][rotateOffsetState][i][0];
    if (roundJ >= cols) {
      return false;
    }
    if (
      shape[i][0] + offsets[currentIndex][rotateOffsetState][i][0] < 0 ||
      shape[i][0] + offsets[currentIndex][rotateOffsetState][i][0] >= rows ||
      shape[i][1] + offsets[currentIndex][rotateOffsetState][i][1] * w < 0 ||
      shape[i][1] + offsets[currentIndex][rotateOffsetState][i][1] * w > 880 ||
      game.board[newI][roundJ].occupied
    ) {
      return false
    }
  }
  return true
}


function keyPressed() {
  if (state < 0) {
    if (keyCode == 13) {
        start()
    }
    return
  }
  if (state > 0) {
    if (keyCode == 13) {
      game.initboard()
      state = 0;
      loop()
    }
  }else {

    if (keyCode == 81) {
      pause = !pause

      if (pause) {
        noLoop()
      } else {
        loop()
      }
    }

    if (pause) {
      return
    }

    // move right
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

    // move left
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

}


function gameOver() {
  console.log("gameOver");
  state++;

}
