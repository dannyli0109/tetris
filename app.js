var rows = 12;
var cols = 22;
var w = 40;
var shape = [[4,0], [5,0], [6,0], [7,0]];
var newShape = false;


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

  for (var num = 0; num < shape.length; num++) {
    if(newShape) {
      newShape = false;
      shape = [[4,0], [5,0], [6,0], [7,0]]
      break;
    }
    newBlock(shape[num][0], shape[num][1],num)
  }

}

function newBlock(x, y,index) {

  var roundJ = ceil(y/w);
  var roundI = x;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (game.board[i][j].coliding(roundI, roundJ)) {
        for (var index = 0; index < shape.length; index++) {
          game.board[shape[index][0]][roundJ - 1].occupied = true
        }
        newShape = true;
        return
      }
    }
  }

  if (roundJ == cols) {
    for (var index = 0; index < shape.length; index++) {
      game.board[shape[index][0]][roundJ - 1].occupied = true
    }
    newShape = true;
    return
  }
  fill(100)
  rect(x*w, y, 40,40)
  shape[index][1] += 5




}



function keyPressed() {
  if (keyCode == 39) {
    var rightMost = shape[shape.length - 1]
    if (rightMost[0]*w < 480 - w) {
      var roundJ = round(rightMost[1]/w);
      // var roundI = round((x + w)/w);
      if (!game.board[rightMost[0]][roundJ].occupied) {
        for (var index = 0; index < shape.length; index++) {
          shape[index][0] +=1
        }
      }
    }

  }
  if (keyCode == 37) {
    var leftMost = shape[0]
    if (leftMost[0]*w > 0) {
      var roundJ = round(leftMost[1]/w);

      if (!game.board[leftMost[0]][roundJ].occupied) {
        for (var index = 0; index < shape.length; index++) {
          shape[index][0] -=1
        }
      }
    }
  }
}
