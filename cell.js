var Cell = function(i, j, w) {
  this.i = i;
  this.j = j;
  this.w = w;
  this.x = i * w;
  this.y = j * w;
  this.occupied = false;
}

Cell.prototype.display = function() {

  stroke(0, 0, 0, 100)
  noFill()
  strokeWeight(2)

  rect(this.x, this.y, this.w, this.w)

  if(this.occupied) {
    if (state > 0) {
      fill(255,0,0)
    } else {
      fill(100)
    }
    rect(this.x, this.y, this.w, this.w)
  }
}

Cell.prototype.coliding = function(i, j) {
  if (this.i == i && this.j == j && this.occupied) {
    if (j > 0) {
      game.board[i][j - 1].occupied = true;
      return true
    }
  }
  return false
}
