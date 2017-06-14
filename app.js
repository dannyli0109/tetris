var rows = 12;
var cols = 22;
var w = 40;
var shape = [[0,0], [1,0], [2,0], [3,0]];
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
      shape = [[0,0], [1,0], [2,0], [3,0]]
      break;
    }
    newBlock(shape[num][0], shape[num][1])
  }

}

function newBlock(x, y) {

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
  shape[x][1] += 10

}



// function keyPressed() {
//   if (keyCode == 39) {
//     if (x < 480 - w) {
//       var roundJ = round(y/w);
//       var roundI = round((x + w)/w);
//       if (!game.board[roundI][roundJ].occupied) {
//         x += w
//       }
//     }
//
//   }
//   if (keyCode == 37) {
//     if (x > 0) {
//       var roundJ = round(y/w);
//       var roundI = round((x - w)/w);
//       if (!game.board[roundI][roundJ].occupied) {
//         x -= w
//       }
//     }
//   }
// }
