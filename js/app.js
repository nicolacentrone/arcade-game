/**
* @description Enemies our player must avoid
* @constructor
*/
var Enemy = function(speed, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.speed = speed;
};

/**
* @description Updates the enemy's position
* @param {number} dt - A time delta between ticks
* @param {number} speed - The amount of pixels the bugs objects move
* between ticks
*/
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
};

/**
* @description Draws the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Checks when a bug goes off-screen, in order to delete the
* objects that are no longer visible. This way I keep the memory lean
* @returns {boolean} True if the object is offscreen
*/
Enemy.prototype.checkOutside = function() {
  if(this.x > 500) {
  return true;
  }
}

/**
* @description The character moved by the player
* @constructor
*/
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 380;
};

/**
* @description It's not used since all the updates were more simple to develop
* within the handleInput method
*/
Player.prototype.update = function () {
};

/**
* @description Draws the player's png to screen
*/
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Takes the arrow keys input and moves the player from a tile to
* another
* @param {string} obj - The keys sent by the Event Listener 'keyup'
*/
Player.prototype.handleInput = function(obj) {
  if(obj === 'left') {
    if(player.x <= 100) {

    }else{
      player.x -= 101;
    }
  }else if (obj === 'right') {
    if(player.x >= 400) {

    }else{
      player.x += 101;
    }
  }else if (obj === 'up') {
    if(player.y < 83) {
      player.win();
    }else{
      player.y -= 83;
    }
  }else if (obj === 'down') {
    if(player.y >= 380) {
    }else{
      player.y += 83;
    }
  }
};

/**
* @description Moves the player object to the start location
*/
Player.prototype.reset = function() {
  this.x = 0;
  this.y = 380;
}

/**
* @description Moves the player object to the start location and displays the text 'You Win!'
*/
Player.prototype.win = function() {
  this.x = 0;
  this.y = 380;
  let newContainer = document.createElement('div');
  newContainer.setAttribute('class', 'status');
  document.querySelector('body').appendChild(newContainer);
  document.querySelector('.status').innerHTML = 'You Win!';
  setTimeout(function() {
    newContainer.remove();
  }, 3000);
}


// Functions

/**
* @description Generates a random number between 1-500 so every bug move at different
* speed
* @returns {number} Value for speed
*/
function randomSpeed() {
  let temp = Math.random() * 500;
  if(temp <= 100) {
    temp = 100;
  }
  return temp;
}

/**
* @description Generates a random number between 1-3. This represents the number of
* bugs generated every second
* @returns {number} Random decimal multiplied by 3
*/
function randomNumber() {
  return Math.random() * 3;
}

/**
* @description Generates a random number between 1-180 to select the row in which
* spawn the bug
* @returns {number} Number of row
*/
function randomRow() {
  let row;
  for(let i = 0; i < 1; i++) {
    if(Math.random() * 180 <= 60) {
      row = 48;
    }else if ((Math.random() * 180 > 60) && (Math.random() * 180 <= 120)) {
      row = 131;
    }else if (Math.random() * 180 <= 180) {
      row = 214;
    }
  }
  return row;
}

/**
* @description Creates the instances of the enemy
*/
function spawn() {
  for (let i = 0; i < randomNumber(); i++) {
    allEnemies.push(new Enemy(randomSpeed(), randomRow()));
  }
}

var player = new Player();
var allEnemies = [];

/**
* @description Creates a new async function for spawning the bugs every second
* Checks if any of the bugs is no more visible then they are deleted.
*/
function loop() {
    let p1 = new Promise((resolve, reject) => {
    resolve(spawn());
    for (var i = 0; i < allEnemies.length; i++) {
      if (allEnemies[i].checkOutside() === true) {
        allEnemies.splice(i,1);
      }
    }
  });
}

loop();
setInterval(loop, 1000);

/**
* @description This listens for key presses and sends the keys to
* Player.handleInput() method
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
