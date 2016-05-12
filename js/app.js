// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.velocity * dt;
    } else {
        this.resetEnemy();
    }
};

Enemy.prototype.randomEnemyY = function() {
    // changes the enemy's y-coordinate randomly to one of the stone rows
    this.y = 60 + 83 * (Math.floor(Math.random() * 3));
};

Enemy.prototype.randomEnemyV = function() {
    // changes the enemys's velocity randomly
    this.velocity = 50 + Math.random()*100;
};

Enemy.prototype.initEnemyX = function() {
    // initializes the enemy's x-coordinate on the screen
    this.x = 404 * Math.random();
};

Enemy.prototype.resetEnemyX = function() {
    // resets the enemy's x-coordinate off the screen on the left side
    this.x = -101;
};

Enemy.prototype.initEnemy = function() {
    // initializes the enemy's position and velocity at the beginning of the
    // game
    this.initEnemyX();
    this.randomEnemyY();
    this.randomEnemyV();
};

Enemy.prototype.resetEnemy = function() {
    // resets the enemy's position and velocity after it crosses
    this.resetEnemyX();
    this.randomEnemyY();
    this.randomEnemyV();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // player class - initializes the player randomly on the grass, with a
    // score of 0
    this.resetPlayer();
    this.score = 0;
};

Player.prototype.render = function() {
    // renders the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.randomPlayerX = function() {
    // resets the player's x coordinate randomly to the grass
    this.x = 101 * (Math.floor(Math.random() * 5));
    this.moveToX = this.x;
};

Player.prototype.randomPlayerY = function() {
    // resets the player's y coordinate randomly to the grass
    this.y = 289 + 83 * (Math.floor(Math.random() * 2));
    this.moveToY = this.y;
};

Player.prototype.resetPlayer = function() {
    // resets the position on the grass
    this.randomPlayerX();
    this.randomPlayerY();
};

Player.prototype.stayPut = function() {
    // stops the player from moving
    this.moveToX = this.x;
    this.moveToY = this.y;
}

Player.prototype.update = function() {
    // moves the player to where it's going
    this.x = this.moveToX;
    this.y = this.moveToY;
}

var player1 = new Player();

player1.sprite = 'images/char-cat-girl.png';

player1.handleInput = function(key) {
    // player 1's controls
    switch (key) {
        case 'w':
            this.moveToY -= 83;
            break;
        case 's':
            this.moveToY += 83;
            break;
        case 'a':
            this.moveToX -= 101;
            break;
        case 'd':
            this.moveToX += 101;
            break;
    }
};

var player2 = new Player();

player2.sprite = 'images/char-boy.png';

player2.handleInput = function(key) {
    // player 2's controls
    switch (key) {
        case 'up':
            this.moveToY -= 83;
            break;
        case 'down':
            this.moveToY += 83;
            break;
        case 'left':
            this.moveToX -= 101;
            break;
        case 'right':
            this.moveToX += 101;
            break;
    }
};

var Item = function(sprite) {
    // this is a super class for rocks and gems
    this.sprite = sprite;
    this.moveItemOffScreen();
    this.timer = 0;
}

Item.prototype.render = function() {
    // render items
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Item.prototype.update = function() {
    // moves the item to where it's going
    this.x = this.moveToX;
    this.y = this.moveToY;
}

Item.prototype.togglePosition = function() {
    // if the item is off screen, moves it on
    // if the item is on screen, moves it off
    if (this.timer > 60 * this.switchTime) {
        if (this.x === -100) {
            this.randomItemPosition();
        } else {
            this.moveItemOffScreen();
        }
    } else {
        this.timer += 1;
    }
}

Item.prototype.moveItemOffScreen = function() {
    // moves the item off screen
    this.moveToX = -100;
    this.moveToY = -100;
    this.timer = 0;
}

Item.prototype.randomItemPosition = function() {
    // moves the item on screen to a random position on the stone
    this.moveToX = 101 * (Math.floor(Math.random() * 5));
    this.moveToY = 40 + 83 * (Math.floor(Math.random() * 3));
    this.timer = 0;
};

var Gem = function(sprite) {
    // class for gems
    Item.call(this, sprite);
}
Gem.prototype = Object.create(Item.prototype);
Gem.prototype.constructor = Gem;

var blueGem = new Gem('images/GemBlue.png');
blueGem.value = 2;
blueGem.switchTime = 3;

var orangeGem = new Gem('images/GemOrange.png');
orangeGem.value = 3;
orangeGem.switchTime = 7;

var greenGem = new Gem('images/GemGreen.png');
greenGem.value = 5;
greenGem.switchTime = 11;

var Rock = function() {
    // class for rocks
    Item.call(this, 'images/Rock.png');
}
Rock.prototype = Object.create(Item.prototype);
Rock.prototype.constructor = Rock;

var rock = new Rock();
rock.switchTime = 5;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        87: 'w',
        83: 's',
        68: 'd'
    };

    player1.handleInput(allowedKeys[e.keyCode]);
    player2.handleInput(allowedKeys[e.keyCode]);

});