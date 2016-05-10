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
    this.y = 60 + 83 * (Math.floor(Math.random() * 3));
};

Enemy.prototype.randomEnemyV = function() {
    this.velocity = 50 + Math.random()*100;
};

Enemy.prototype.initEnemyX = function() {
    this.x = 404 * Math.random();
};

Enemy.prototype.resetEnemyX = function() {
    this.x = -101;
};

Enemy.prototype.initEnemy = function() {
    this.initEnemyX();
    this.randomEnemyY();
    this.randomEnemyV();
};

Enemy.prototype.resetEnemy = function() {
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
    this.resetPlayer();
    // this.sprite = 'images/char-princess-girl.png';
    this.score = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.randomPlayerX = function() {
    this.x = 101 * (Math.floor(Math.random() * 5));
    this.moveToX = this.x;
};

Player.prototype.randomPlayerY = function() {
    this.y = 289 + 83 * (Math.floor(Math.random() * 2));
    this.moveToY = this.y;
};

Player.prototype.resetPlayer = function() {
    this.randomPlayerX();
    this.randomPlayerY();
};

Player.prototype.update = function() {
    this.x = this.moveToX;
    this.y = this.moveToY;
}

var player1 = new Player();

player1.sprite = 'images/char-cat-girl.png';

player1.handleInput = function(key) {
    switch (key) {
        case 'w':
            if (this.y === 40) {
                this.resetPlayer();
                this.score += 1;
            } else {
                this.moveToY -= 83;
            }
            break;
        case 's':
            if (this.y < 372) {
                this.moveToY += 83;
            }
            break;
        case 'a':
            if (this.x > 0) {
                this.moveToX -= 101;
            }
            break;
        case 'd':
            if (this.x < 404) {
                this.moveToX += 101;
            }
            break;
    }
};

var player2 = new Player();

player2.sprite = 'images/char-boy.png';

player2.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y === 40) {
                this.resetPlayer();
                this.score += 1;
            } else {
                this.moveToY -= 83;
            }
            break;
        case 'down':
            if (this.y < 372) {
                this.moveToY += 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.moveToX -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.moveToX += 101;
            }
            break;
    }
};

// var Rock = function() {
//     this.x = 202;
//     this.y = 123;
//     this.sprite = 'images/Rock.png';
// };

// Rock.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// var rock = new Rock();

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