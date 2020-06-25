document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game-grid');
  let squares = Array.from(document.querySelectorAll('.game-grid div')); // select all divs in game grid
  const scoreDisplay = document.querySelector('.score-num');
  const levelDisplay = document.querySelector('.level-num');
  const logoDisplay = document.querySelector('.logo');
  const startBtn = document.querySelector('.start-btn');
  const soundBtn = document.querySelector('.music-btn');
  const soundIcon = document.querySelector('.fa-volume-mute');
  const mobileBtns = document.querySelectorAll('.commands');
  const width = 10;
  let nextRandom = 0;
  let score = 0;
  let level = 1;
  let lose = false;
  let soundOn = true;
  let timer; // null value by default

  // mobile commands >> change later
  const up = document.querySelector('#up')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  const down = document.querySelector('#down')
  
  function lockMobile() {
    mobileBtns.forEach(btn => {
      btn.classList.add('disabled');
    })
  }

  function unlockMobile() {
    mobileBtns.forEach(btn => {
      btn.classList.remove('disabled');
    })
  }

  up.addEventListener('click', () => { rotateTetromino(); })
  left.addEventListener('click', () => { moveLeft(); })
  right.addEventListener('click', () => { moveRight(); })
  down.addEventListener('click', () => { moveDown(); })
  
  // disable by default (otherwise clickable before game start)
  lockMobile();
  
  // tetromino colors (change to sass later)
  const colors = [
    '#F0A133',
    '#2E5BD8',
    '#7DE71D',
    '#ED4631',
    '#A86FF0',
    '#EFED35',
    '#6AF1F1'
  ]

  // Tetrominos
  const jTetromino = [
    [0, width, width+1, width+2],
    [1, width+1, width*2+1, 2],
    [0, 1, 2, width+2],
    [1, width+1, width*2, width*2+1]
  ] 

  const lTetromino = [
    [2, width, width+1, width+2],
    [width*2+2, 1, width+1, width*2+1],
    [0, 1, 2, width],
    [0, 1, width+1, width*2+1]
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
    [0, 1, 2, 3],
    [1, width+1, width*2+1, width*3+1],
    [0, 1, 2, 3],
    [1, width+1, width*2+1, width*3+1]
  ]

  const tetrominos = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 14; // default position
  let currentRotation = 0; // default rotation

  // select a random Tetromino in its default rotation
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  let currentTetromino = tetrominos[randomTetromino][currentRotation];

  // drawing the tetromino
  function draw() {
    currentTetromino.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[randomTetromino];
    })
  }

  // undrawing the tetromino
  function undraw() {
    currentTetromino.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    })
  } 

  // set tetromino to fall every second / EDIT: commented so game can start normally
  // timer = setInterval(moveDown, 1000);

  // assign functions to inputs
  function input(i) {
    if (timer != null) {  // only moves if not paused || game over
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
  }
  // keydown = you can hold the down btn 
  document.addEventListener('keydown', input);

  // move down the tetromino
  function moveDown() {
    freeze();
    undraw();
    currentPosition += width;
    draw();
  }

  // bug fix: out of bounds rotation
  function checkRotatedPosition(P){
    function entersRightSide() { return currentTetromino.some(index=> (currentPosition + index + 1) % width === 0)  }
    function entersLeftSide() { return currentTetromino.some(index=> (currentPosition + index) % width === 0) }
    
    if ((P + 1) % width < 4) {       //adds 1 because the position can be 1 less than where the tetromino is (with how they are indexed).     
      if (entersRightSide()) {    // checks 
        currentPosition += 1;    // move back
        checkRotatedPosition(P); // repeat until it's inside its bounds (iTetromino will need to move back more than once)
        }
    }
    else if (P % width > 5) { // iTetromino (biggest) touches right border at position 6 ; 3 if left border
      if (entersLeftSide()) {
        currentPosition -= 1;
      checkRotatedPosition(P);
      }
    }
  }
  
  // rotate the tetromino
  function rotateTetromino() {
    undraw();
    currentRotation++
    // resets to default rotaion after fourth one
    if(currentRotation === currentTetromino.length) {
      currentRotation = 0;
    } 
    currentTetromino = tetrominos[randomTetromino][currentRotation];
    checkRotatedPosition(currentPosition);
    draw();
  }

  // freeze the tetromino
  function freeze() {
    // The some() method tests whether at least one element in the array passes the test
    if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      currentTetromino.forEach(index => squares[currentPosition + index].classList.add('taken'));
      // currentTetromino.forEach(index => squares[currentPosition + index].style.backgroundColor = '#9ACD32'); // change to darker color 
      if (soundOn) {frozen.play();}
      // make a new tetromino fall
      randomTetromino = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominos.length);
      currentRotation = 0; // default
      currentTetromino = tetrominos[randomTetromino][currentRotation];
      currentPosition = 4; // default
      gameOver();
      // draw(); // bug fix ; duplicate tetromino after cleared line
      displayTetromino();
      increaseScore();
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
    [0, displayWidth, displayWidth+1, displayWidth+2], // jTetromino
    [3, displayWidth+1, displayWidth+2, displayWidth+3], //lTetromino
    [2, 3, displayWidth+1, displayWidth+2], // sTetromino
    [0, 1, displayWidth+1, displayWidth+2], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [1, 2, displayWidth+1, displayWidth+2], //oTetromino
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
      startBtn.innerHTML = 'RESUME';
      clearInterval(timer);
      timer = null;
      playTheme.pause();
      lockMobile();
    } else {
      if (lose) { location.reload(); } // checks for game over
      startBtn.innerHTML = 'PAUSE';
      if (soundOn) { playTheme.play(); }
      draw();
      clearInterval(timer); 
      timer = setInterval(moveDown, 1100-100*level); // tetrominos drop 0.1 seconds faster after each lv
      // nextRandom = Math.floor(Math.random()*tetrominos.length); // bug fix ; start/pause btn was changing next tetromino
      displayTetromino();
      unlockMobile();
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
        if (score % width === 0 && level < 9) {
          level++;
          levelDisplay.innerHTML = level;
          if (soundOn) { lvUp.play(); }
        }
        gridRow.forEach(index =>{
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
          if (soundOn) { clearLine.play(); }
        }) 
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(line => grid.appendChild(line));
        clearInterval(timer); 
        timer = setInterval(moveDown, 1100-100*level); // triggers faster movement after 10 lines
      }
    }
  }

  // game over >> when a tetromino in the default position overwrites another
  function gameOver() {
    if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      logoDisplay.innerHTML = 'GAME OVER';
      startBtn.innerHTML = 'RELOAD';
      clearInterval(timer);
      timer = null;
      lockMobile();
      playTheme.pause();
      if (soundOn) { gameOvr.play(); }
      lose = true;
    }
  }

  soundBtn.addEventListener('click', () => {
    if (soundOn) {
      soundOn = false;
      soundIcon.classList.remove("fa-volume-mute");
      soundIcon.classList.add("fa-volume-up");
      playTheme.pause();
    } else {
      soundOn = true;
      soundIcon.classList.remove("fa-volume-up");
      soundIcon.classList.add("fa-volume-mute");
      if (timer) {
        playTheme.play();
      } else { playTheme.pause(); }  // keep sound off when paused
    }
  })
})