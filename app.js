// Creating variables to use in the functions below
let snake;
let rez = 20;
let food;
let w;
let h;
let fr = 3;
let lvl = 1;
let previousDir = [0, 0];

// Creating a function that sets up the game
function setup () {
  // creating a backdrop
  createCanvas(400, 400);
  
  // creating width resolution
  w = floor(width/rez);
  
  // creating height resolution
  h = floor (height/rez);
  
  // creating the speed of the snake
  frameRate(fr);
  
  // creating a snake
  snake = new Snake ();
  
  // creating a scoreboard to keep track of the players score
  createDiv(`Score: ${snake.score}`).id('score');

  // creating a scoreboard to keep track of the players level
  createDiv(`Level: ${lvl}`).id('lvl');
  
  // running the food location function to place the food
  foodLocation();
}

// Creating a function that puts the food in a random location
function foodLocation () {
  // creating a random x plot
  let x = floor(random(w));
  
  // creating a random y plot
  let y = floor(random(h));
  
  // creating a piece of food
  food = createVector(x,y);
}

// Creating a function that will check the snakes current direction and previous direction
function arraysEqual(arr1, arr2) {
  // if arr1 is not equal to arr2 return false otherwise return true
	if (arr1.length !== arr2.length)
    return false;
    
  // going through arr1
	for (var i = arr1.length; i--;) {
    // if arr1[i] is not equal to arr2[i] return false otherwise return true
		if (arr1[i] !== arr2[i])
			return false;
	}
	return true;
}

// Creating a function for when each of the arrow keys are pressed
function keyPressed () {
  // when the left arroy key is pressed move left
  if (keyCode === LEFT_ARROW) {
    // if the previous direction and the opposite direction are equal then don't change direction
    if (!arraysEqual(previousDir, [1, 0])) {
      // if they are not equal then set the direction and previous direction
			snake.setDir(-1, 0);
			previousDir = [-1, 0];
		}

  // when the right arroy key is pressed move right  
  } else if (keyCode === RIGHT_ARROW) {
    // if the previous direction and the opposite direction are equal then don't change direction
    if (!arraysEqual(previousDir, [-1, 0])) {
      // if they are not equal then set the direction and previous direction
			snake.setDir(1, 0);
			previousDir = [1, 0];
		}
  
  // when the down arroy key is pressed move down
  } else if (keyCode === DOWN_ARROW) {
    // if the previous direction and the opposite direction are equal then don't change direction
    if (!arraysEqual(previousDir, [0, -1])) {
      // if they are not equal then set the direction and previous direction
			snake.setDir(0, 1);
			previousDir = [0, 1];
		}

  // when the up arroy key is pressed move up
  } else if (keyCode === UP_ARROW) {
    // if the previous direction and the opposite direction are equal then don't change direction
    if (!arraysEqual(previousDir, [0, 1])) {
      // if they are not equal then set the direction and previous direction
			snake.setDir(0, -1);
			previousDir = [0, -1];
		}
  }
}

// Creating a function that increase the players level and snake speed by 1 everytime the player score reaches a multiple of 5
function levelUp () {
  // when the player score reaches a multiple of 5 increase the snake speed by 1
  if (snake.score % 5 === 0) {

    // increasing the snake speed by 1
    fr++;

    // increasing the players level by 1
    lvl++;

    // updating the score board
    select('#lvl').html(`Level: ${lvl}`);

    // setting the speed
    frameRate(fr);
  }
}


// Creating a function that draws our setup and updates game as its being played
function draw () {
  // running a scale function to scale the size of the our game resolution
  scale(rez);
  
  // creating the color of the background of the game
  background(220);
  
  // when the snake eats the food increase players score by 1, run the speed up function, and put a new piece of food radomly on the board
  if  (snake.eat(food)) {
    // increasing the players score by 1
    snake.score++;

    // updating the score board
    select('#score').html(`Score: ${snake.score}`);

    // running the levelUp function
    levelUp();

    // running the foodLocation function
    foodLocation();
  }
  
  // running a function to update the the snake
  snake.update();
  
  // running a function to show the snake
  snake.show();
  
  // running a function for when the game ends turn the background red and stop the app
  if (snake.endGame()) {
    background(255, 0, 0);
    // creating a button to play again
    createButton('Try Again!').id('btn').mousePressed()
    noLoop();
  }
  
  // choosing the color of the food to be red
  fill(255, 0, 0);

  // making sure our food is to scale
  noStroke();
  
  // choosing the shape of the food to be square
  rect(food.x, food.y, 1, 1);
}
