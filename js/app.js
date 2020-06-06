document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game-grid');
  let squares = Array.from(document.querySelectorAll('.game-grid div')); // select all divs in game grid
  const scoreDisplay = document.querySelector('.score-num');
  const startBtn = document.querySelector('.start-btn');
  const width = 10;
  let nextRandom = 0;
  let score = 0;
  let timer; // null value by default
  
  // tetromino colors
  const colors = [
    'orange',
    'navy',
    'green',
    'red',
    'purple',
    'yellow',
    'blue'
  ]

  // Tetrominos
  const jTetromino = [
    [width, width*2, width*2+1, width*2+2],
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2, width*2+1]
  ] 

  const lTetromino = [
    [width+2, width*2, width*2+1, width*2+2],
    [width*2+2, 1, width+1, width*2+1],
    [width, width+1, width+2, width*2],
    [1, 2, width+2, width*2+2]
  ] 

  const sTetromino = [
    [width+1, width, 1, 2],
    [0, width, width+1, width*2+1],
    [width+1, width, 1, 2],
    [0, width, width+1, width*2+1]
  ]

  const zTetromino = [
    [width+2, width+1, 0, 1],
    [1, width+1, width, width*2],
    [width+2, width+1, 0, 1],
    [1, width+1, width, width*2]
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
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1]
  ]

  const tetrominos = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4; // default position
  let currentRotation = 0; // default rotation

  // select a random Tetromino in its default rotation
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  let currentTetromino = tetrominos[randomTetromino][currentRotation];

  // drawing the tetromino
  function draw() {
    currentTetromino.forEach(index =>{
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[randomTetromino];
    })
  }

  // undrawing the tetromino
  function undraw() {
    currentTetromino.forEach(index =>{
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    })
  } 

  // set tetromino to fall every second / EDIT: commented so game can start normally
  // timer = setInterval(moveDown, 1000);

  // assign functions to inputs
  function input(i) {
    if(i.keyCode === 37) {
      moveLeft();
    } else if(i.keyCode === 39) {
      moveRight();
    } else if(i.keyCode === 38) {
      rotateTetromino();
    } else if(i.keyCode === 40) {
      moveDown();
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

  // rotate the tetromino
  function rotateTetromino() {
    undraw();
    currentRotation++;
    // resets to default rotaion after fourth one
    if(currentRotation === currentTetromino.length) {
      currentRotation = 0;
    }
    currentTetromino = tetrominos[randomTetromino][currentRotation];
    draw();
  }

  // freeze the tetromino
  function freeze() {
    // The some() method tests whether at least one element in the array passes the test
    if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      currentTetromino.forEach(index => squares[currentPosition + index].classList.add('taken'));
      // make a new tetromino fall
      randomTetromino = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominos.length);
      currentRotation = 0; // default
      currentTetromino = tetrominos[randomTetromino][currentRotation];
      currentPosition = 4; // default
      draw();
      displayTetromino();
      increaseScore();
      gameOver();
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
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw();
  }

  // moves tetromino to the right unless there's another one / is at the right edge
  function moveRight () {
    undraw();
    // check if tetromino is in the right edge(indexes 9, 19, 29..)
    const atRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width -1);
    // will move right if not on the right edge
    if(!atRightEdge) currentPosition += 1;
    // move back if there's a frozen tetromino on your right
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw();
  }

  // display next tetromino
  const displaySquares = document.querySelectorAll('.display-next-grid div'); // select all divs in display grid
  const displayWidth = 4;
  let displayIndex = 0;
  // let nextRandom = 0;

  // tetrominos at default rotation
  const nextTetrominos = [
    [displayWidth, displayWidth*2, displayWidth*2+1, displayWidth*2+2], // jTetromino
    [displayWidth+2, displayWidth*2, displayWidth*2+1, displayWidth*2+2], //lTetromino
    [displayWidth+1, displayWidth, 1, 2], // sTetromino
    [displayWidth+2, displayWidth+1, 0, 1], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [displayWidth, displayWidth+1, displayWidth+2, displayWidth+3] // iTetromino
  ]

  // display tetromino in the display grid
  function displayTetromino() {
    // remove traces of tetromino block in display grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    })
    // add a tetromino block in display grid
    nextTetrominos[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    })
  }

  // start/pause button
  startBtn.addEventListener('click', () => {
    // if time value isn't null >> pause
    if (timer) {
      clearInterval(timer);
      timer = null;
    } else {
      draw();
      timer = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random()*tetrominos.length);
      displayTetromino();
    }
  })

  // increase score
  function increaseScore() {
    for (let i=0; i < 199; i+=width) {
      const gridRow = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9] 

      // check if every square in a row is taken (remove line(s) if true)
      if(gridRow.every(index => squares[index].classList.contains('taken'))) {
        // increase score, remove then replace line taken
        score++;
        scoreDisplay.innerHTML = score;
        gridRow.forEach(index =>{
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
        })
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(line => grid.appendChild(line));
      }
    }
  }

  // game over >> when a tetromino in the default position overwrites another
  function gameOver() {
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'Game Over';
      clearInterval(timer);
    }
  }

})