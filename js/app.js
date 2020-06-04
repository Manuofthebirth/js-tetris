document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('.score-num');
  const startBtn = document.querySelector('.star-btn');
  const width = 10;

  // Tetrominos
  const jTetromino = [
    [1, width+1, width*2, width*2+1],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, 2],
    [width, width*2, width*2+1, width*2+2]
  ] 

  const lTetromino = [
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [0, 1, width+2, width*2],
    [width+2, width*2, width*2+1, width*2+2]
  ] 

  const sTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]

  const zTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [2, width, width+1, width*2+1],
    [width*2, width*2+1, width+1, width+2],
    [2, width, width+1, width*2+1]
  ]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]
  
  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]
  
  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const tetrominos = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4;
  let currentForm = 0;

  // select a random Tetromino in its first form
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  let currentTetromino = tetrominos[randomTetromino][currentForm];

  // drawing the tetromino
  function draw() {
    currentTetromino.forEach(index =>{
      squares[currentPosition + index].classList.add('tetromino');
    })
  }

  // undrawing the tetromino
  function undraw() {
    currentTetromino.forEach(index =>{
      squares[currentPosition + index].classList.remove('tetromino');
    })
  } 

  // set tetromino to fall every second
  timer = setInterval(moveDown, 1000);

  // assign functions to inputs
  function input(i) {
    if(i.keyCode === 37) {
      moveLeft();
    }
  }
  document.addEventListener('keyup', input);


  // move down the tetromino
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze the tetromino
  function freeze() {
    // The some() method tests whether at least one element in the array passes the test
    if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('stop'))) {
      currentTetromino.forEach(index => squares[currentPosition + index].classList.add('stop'));
      // make a new tetromino fall
      randomTetromino = Math.floor(Math.random() * tetrominos.length);
      currentTetromino = tetrominos[randomTetromino][currentForm];
      currentPosition = 4;
      draw();
    }
  }

  // moves tetromino to the left unless there's another one / is at the left edge
  function moveLeft () {
    undraw();
    // check if tetromino is in the left edge(indexes divisable by 10 >> 0, 10, 20..)
    const atLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);
    // will move left if not on the left edge
    if(!atLeftEdge) currentPosition -= 1;
    // move back if there's a frozen tetromino on your left
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('stop'))) {
      currentPosition +=1
    }

    draw();
  }

})