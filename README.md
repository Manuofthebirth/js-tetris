# TETRIS

A vanilla Javascript Tetris game based on [Ania Kubow](https://github.com/kubowania)'s [tutorial](https://www.youtube.com/watch?v=rAUn1Lom6dw) in FreeCodeCamp with my personal touch.

Click [here](https://manutetris.herokuapp.com/) to play in your desktop, tablet or mobile device. 

![Tetris](https://github.com/Manuofthebirth/js-tetris/blob/master/img/thumbnail.jpeg)

## What's different from the tutorial?

* 7 tetromino blocks instead of 5
* Music & SFX (and mute/unmute button)
* Difficulty level
* Reload button after game over
* Available for mobile and tablet
* Sass and styling

### Fixes

* freeze() function inside moveDown() [on top instead of bottom so it may delay before freezing] 
* keydown instead of keyup [so it moves like the original Tetris]
* Pause/start changing next tetromino [remove nextRandom inside start/pause button event]
* Duplicate tetromino after clearing row [remove draw() inside freeze()]

## Technologies & Tools Used

* HTML5
* CSS3
* Sass
* JavaScript
* Bootstrap
* Font Awesome
* Git

## To do

* keydown behavior for movement buttons
* Add high score feature
