// Constructor class for characters in the game.
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Sub class for enemies our player must avoid
class Enemy extends Character {
  constructor(x, y, speed) {
    super(x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
  }
}

// Update enemy position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Ensure game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // Make enemy reappear if reach end of canvas
  if(this.x > 500) {
    this.x = -100;
  }

  //Check for collisions
  this.checkCollision();
};

// Reset game if player-enemy collision
Enemy.prototype.checkCollision = function() {
  if(
    player.y >= this.y &&
    player.y - 15 <= this.y &&
    player.x + 80 >= this.x &&
    player.x <= this.x + 80) {
      console.log('ouch!');
      player.reset();
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Sub class for our player
class Player extends Character {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/char-boy.png';
    this.levelCounter = 0;
  }
}

// Reset player to starting point
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 322;
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
  //function not needed
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Accept user input and update x or y value
Player.prototype.handleInput = function(key) {
  const tileWidth = 101,
        tileHeight = 83;

  switch (key) {
    case 'down':
      if(this.y < 405) {
        this.y += tileHeight;
      }
      break;
    case 'up':
      if(this.y > -10) {
        this.y -= tileHeight;
      }
      break;
    case 'left':
      if(this.x > 0) {
        this.x -= tileWidth;
      }
      break;
    case 'right':
      if(this.x < 404) {
        this.x += tileWidth;
      }
      break;
  }
  // console.log('x = ' + this.x +'\ny = ' + this.y);
  this.victory();
};

// Display alert if user reaches the water
Player.prototype.victory = function() {
  const self = this;
  if(this.y === -10) {
    setTimeout(function(){
      self.levelUp();
      self.reset();
    }, 10);
  }
};

// Display 'level up' modal and increase level by one
Player.prototype.levelUp = function() {
  const victoryModal = document.querySelector('#victoryModal');
  const currentLevel = document.querySelector('#currentLevel');

  this.levelCounter++;
  currentLevel.textContent = this.levelCounter;
  victoryModal.style.visibility = 'visible';

  victoryModal.addEventListener('click', function() {
    victoryModal.style.visibility = 'hidden';
  });

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
      victoryModal.style.visibility = 'hidden';
    }
  });
};

// Instantiates character objects
const enemy1 = new Enemy(-100, 60, Math.random() * 256);
const enemy2 = new Enemy(150, 60, Math.random() * 256);
const enemy3 = new Enemy(200, 143, 100);
const enemy4 = new Enemy(310, 143, 100);
const enemy5 = new Enemy(-100, 226, Math.random() * 256);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// Place the player object in a variable called player
const player = new Player(202, 322);

// Listen for key presses and send the keys to
// player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // Reset game if "r" key is pressed
  if(e.keyCode === 82) {
    player.reset();
  }
  player.handleInput(allowedKeys[e.keyCode]);
});


// Listen for touch input and send inputDirection to
// player.handleInput() method.
const allButtons = document.querySelector('#allButtons');
allButtons.addEventListener('touchend', function(event) {
  const inputDirection = event.target.id;
  player.handleInput(inputDirection);
});

// Listen for click input and send inputDirection to
// player.handleInpu() method.
allButtons.addEventListener('click', function(event) {
  const inputDirection = event.target.id;
  player.handleInput(inputDirection);
});

// Toggle visability for on-screen directional arrows
const arrowsToggle = document.querySelector('#arrows input');
arrowsToggle.addEventListener('change', function(event) {
  console.log(arrowsToggle.checked);
  if(arrowsToggle.checked === true) {
    allButtons.style.display = 'inline-flex';
  } else {
    allButtons.style.display = 'none';
  }
});

// Play music on page load
var audio = new Audio('audio/A_A_Aalto_-_Mosey.mp3');
audio.loop = true;
audio.play();

// Toggle music on/off
const musicToggle = document.querySelector('#music input');
musicToggle.addEventListener('change', function(event) {
  console.log(musicToggle.checked);
  if(musicToggle.checked === true) {
    audio.pause();
  } else {
    audio.play();
  }
});
