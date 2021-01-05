class Vector {
  constructor(x, y) {
    this.setX(x);
    this.setY(y);
  }

  getX() {
    return this._x;
  }

  setX(x) {
    this._x = x;
  }

  getY() {
    return this._y;
  }

  setY(y) {
    this._y = y;
  }
}

module.exports = Vector;
