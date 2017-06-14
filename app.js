var rows = 12;
var cols = 22;
var w = 40;
var y = 0;
var x = 0;
var atBottom = false;


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

  newBlock()

}

function newBlock() {
  var roundJ = ceil(y/w);
  var roundI = ceil(x/w);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (game.board[i][j].coliding(roundI, roundJ)) {
        console.log("coliding");
        x = 0;
        y = 0;
        return
      }
    }
  }

  if (roundJ == cols - 1) {
    game.board[roundI][roundJ].occupied = true
    x = 0;
    y = 0;
    return
  }
  fill(100)
  rect(x, y, 40,40)
  y += 3
  // console.log(round(y/w));
  // y = 880 - w
  // fill(100)
  // rect(x, y, 40,40)
  //
  //
  // for (var i = 0; i < rows; i++) {
  //   for (var j = 0; j < cols; j++) {
  //     if (game.board[i][j].x == x && game.board[i][j].y == y) {
  //       game.board[i][j].occupied = true;

  //     }
  //   }
  // }
}



function keyPressed() {
  if (keyCode == 39) {
    if (x < 480 - w) {
      var roundJ = (y/w);
      var roundI = round((x + w)/w);
      if (!game.board[roundI][roundJ].occupied) {
        x += w

      }
    }

  }
  if (keyCode == 37) {
    if (x > 0) {
      var roundJ = round(y/w);
      var roundI = round((x - w)/w);
      if (!game.board[roundI][roundJ].occupied) {
        x -= w
      }
    }
  }
}
