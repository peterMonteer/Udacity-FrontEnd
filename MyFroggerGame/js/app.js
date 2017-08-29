var enemyTracker= 0;
var score= 0;
var col1, col2, col3, col4, col5;


// Enemies our player must avoid
var Enemy = function(verticalPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=0;
    this.y=verticalPos;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x= this.x +this.y*dt;
    if (this.x>=404) {
        this.x-=404;
    }
    enemyTracker=this.x;
    this.enemyPos();
};
Enemy.prototype.enemyPos= function(){
    if (enemyTracker < 80) {
        col1 = true;
    } else if (enemyTracker < 160) {
        col2 = true;
        col1 = col3 = col4 = col5 = false;
    } else if (enemyTracker < 240) {
        col3 = true;
        col1 = col2 = col4 = col5 = false;
    } else if (enemyTracker < 320) {
        col4 = true;
        col1 = col2 = col3 = col5 = false;
    } else if (enemyTracker < 400) {
        col5 = true;
        col1 = col2 = col3 = col4 = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player= function(){
    this.sprite="images/char-boy.png";
    this.x=202;
    this.y=400;

};

Player.prototype.update= function(){

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y === -50) {
        score +=100;
        alert('You won!' + '\n' + 'Your score: '+ score);
        this.y = 400;
    }
    if (this.y === 220) {
        score += 5;
        this.checkCollision();
    } else if (this.y === 130) {
        score += 10;
        this.checkCollision();
    } else if (this.y === 40) {
        score += 15;
        this.checkCollision();
    }
};

Player.prototype.checkCollision = function() {
    if (this.x < 80 & col1) {
        this.y = 400;
        col1 = false;
        score = 0;
    } else if (this.x <= 160 && this.x >= 80 & col2) {
        this.y = 400;
        col2 = false;
        score = 0;
    } else if (this.x <= 240 && this.x >=160& col3) {
        this.y = 400;
        col3 = false;
        score = 0;
    } else if (this.x <= 320 && this.x >=240& col4) {
        this.y = 400;
        col4 = false;
        score = 0;
    } else if (this.x <= 400 && this.x>=320& col5) {
        this.y = 400;
        col5 = false;
        score = 0;
    }
};
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};
Player.prototype.handleInput=function(direction){
    if (direction=="left"){
        this.x-=100;
    }
    if (direction=="right"){
        this.x+=100;
    }
    if (direction=="up"){
        this.y-=90;
    }
    if (direction=="down"){
        this.y+=90;
    }
    console.log(this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player= new Player();
var enemy1 = new Enemy(60);
var enemy2 = new Enemy(145);
var enemy3 = new Enemy(225);
var allEnemies = [enemy1, enemy2, enemy3];


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
