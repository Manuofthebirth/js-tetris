document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('.score-num');
  const startBtn = document.querySelector('.star-btn');
  const width = 10;

  // Tetrominos
  const jBlock = [
    [1, width+1, width*2, width*2+1],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, 2],
    [width, width*2, width*2+1, width*2+2]
  ] 

  const lBlock = [
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [0, 1, width+2, width*2],
    [width+2, width*2, width*2+1, width*2+2]
  ] 

  const sBlock = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]

  const zBlock = [
    [width, width+1, width*2+1, width*2+2],
    [2, width, width+1, width*2+1],
    [width*2, width*2+1, width+1, width+2],
    [2, width, width+1, width*2+1]
  ]

  const tBlock = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]
  
  const oBlock = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]
  
  const iBlock = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]



})