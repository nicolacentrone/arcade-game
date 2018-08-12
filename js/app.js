// Enemies our player must avoid
var Enemy = function(speed, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
Enemy.prototype.reset = function(speed) {
  this.x = -100;
  this.speed = speed;
}

Enemy.prototype.checkOutside = function() {
  if(this.x > 500) {
  return true;
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 380;
};

Player.prototype.update = function () {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (obj) {
  if(obj == 'left') {
    if(player.x <= 100) {

    }else{
      player.x -= 101;
    }
  }else if (obj == 'right') {
    if(player.x >= 400) {

    }else{
      player.x += 101;
    }
  }else if (obj == 'up') {
    if(player.y < 83) {
      player.reset();
    }else{
      player.y -= 83;
    }
  }else if (obj == 'down') {
    if(player.y >= 380) {
    }else{
      player.y += 83;
    }
  }
};

Player.prototype.reset = function() {
  this.x = 0;
  this.y = 380;
}

/*
* The functions start here
*
*/

function randomSpeed() {
  let temp = Math.random() * 500;
  if(temp <= 100) {
    temp = 100;
  }
  return temp;
}

function randomNumber() {
  return Math.random() * 3;
}

function randomRow() {
  let row;
  for(let i = 0; i < 1; i++) {
    if(Math.random() * 180 <= 60) {
      row = 60;
    }else if ((Math.random() * 180 > 60) && (Math.random() * 180 <= 120)) {
      row = 140;
    }else if (Math.random() * 180 <= 180) {
      row = 220;
    }
  }
  return row;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
debugger;


function spawn() {
  for (let i = 0; i < randomNumber(); i++) {
    allEnemies.push(new Enemy(randomSpeed(), randomRow()));
  }
}

var player = new Player();
var allEnemies = [];

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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
