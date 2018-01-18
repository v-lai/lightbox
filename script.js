(function () {
  const n = 6; // number of boxes in a row/column
  const main = document.getElementsByClassName('main')[0];
  main.style.width = n * 50 + 'px';
  const arr = [];
  const lightSet = new Set();

  class Square {
    constructor(id) {
      this.id = id;
      this.on = false;
      this.div = document.createElement('div');
      this.div.className = 'lgbox';
      this.div.innerHTML = '&nbsp;'; // id;
      this.div.onclick = () => {
        this.flipSquares(this.id);
        adjacentSquares(this.id).forEach(el => arr[el].flipSquares());
      }
    }
    flipSquares() {
      this.on = !this.on;
      if (lightSet.has(this.id)) {
        lightSet.delete(this.id);
      } else {
        lightSet.add(this.id);
      }
      checkGame();
      this.div.className = this.div.className === 'dgbox' ? 'lgbox' : 'dgbox';
    }
  }

  const adjacentSquares = (id) => {
    const around = []; // pushing only valid ids into the array
    // corners
    if (id === 0) { // top left
      around.push(id + 1, id + n);
      return around;
    }
    if (id === n - 1) { // top right
      around.push(id - 1, id + n);
      return around;
    }
    if (id === n*n - n) { // bottom left
      around.push(id + 1, id - n);
      return around;
    }
    if (id === n*n - 1) { // bottom right
      around.push(id - 1, id - n);
      return around;
    }
    // edges
    if (id % n === 0) { // left
      around.push(id + 1, id - n, id + n);
      return around;
    }
    if (id % n === n - 1) { // right
      around.push(id - 1, id - n, id + n);
      return around;
    }
    if (id < n) { // top
      around.push(id - 1, id + 1, id + n);
      return around;
    }
    if (id > n*n - n) { // bottom
      around.push(id - 1, id + 1, id - n);
      return around;
    }
    // typical square
    around.push(id - n, id + n, id - 1, id + 1);
    return around;
  };

  // game over
  const checkGame = () => {
    if (n*n - lightSet.size === 0) {
      const text = document.createElement("div");
      text.innerText = 'winner!';
      main.appendChild(text);
      return;
    }
  }

  // create squares and attach to DOM
  const makeSquares = () => {
    for (let i = 0; i < n * n; i++) {
      arr.push(new Square(i));
      main.appendChild(arr[i].div);
    }
  };
  makeSquares();

  // randomize to pick start
  const pickRandom = () => {
    const random = Math.floor(Math.random() * n * n);
    arr[random].on = true;
    arr[random].div.className = 'dgbox';
    lightSet.add(random);
    return random
  };
  pickRandom();

})();
