// Creating a snake class to hold the snake itself and other functions to make the snake move/play the game
class Snake {
    // Creating a function that creates the snake at the start
    constructor () {
      // creating the size of the snake at the start
      this.len = 1;
      
      // creating an array to keep track of the snake elements
      this.body = [];
      
      // creating the position of the snake in the middle a the start
      this.body[0] = createVector( floor(w/2), floor(h/2));
      
      // making sure the snake is not moving horizontally at the start
      this.xdir = 0;
      
      // making sure the snake is not moving vertically at the start
      this.ydir = 0;

      // make sure the player starts with a score of zero
      this.score = 0;
    }
    
    // Creating a function that sets the direction of the snake
    setDir (x,y) {
      // setting the horizontal direction
      this.xdir = x;
      
      // setting the vertical direction
      this.ydir = y;
    }
    
    // Creating a function that will update the snake
    update () {
      // copying the last 
      let head = this.body[this.body.length-1].copy();
      
      // updating the body of the snake by shifting the body over by one piece
      this.body.shift();
      
      // adding the head horizontal direction
      head.x += this.xdir;
      
      // adding the head vertical direction
      head.y += this.ydir;
      
      // adding the body to the head
      this.body.push(head);
    }
    
    // Creating a function that grows the snake
    grow () {
      // grabbing the head of the snake
      let head = this.body[this.body.length-1].copy();
      
      // increasing the snake size by one
      this.len++;
      
      // adding a new body piece to the head of the snake
      this.body.push(head);
    }
    
    // Creating a function that ends the game
    endGame () {
      // getting the heads horizontal location
      let x = this.body[this.body.length-1].x;
      
      // getting the heads vertical location
      let y = this.body[this.body.length-1].y;
      
      // if the snake hits one of the walls end the game otherwise continue playing
      if (x > w-1 || x < 0 || y > h-1 || y < 0) {
        return true
      }
      
      // going through the entire body of the snake
      for (let i = 0; i < this.body.length-1; i++) {
      
        // creating a part of the body
        let part = this.body[i];
        
        // if part of the body touches the head the end the game otherwise conmtinue playing
        if (part.x == x && part.y == y) {
          return true;
        }
      }
      return false
    }

    // Creating a function for when the snake eats the food
    eat (pos) {
      // getting the heads horizontal location
      let x = this.body[this.body.length-1].x;

      // getting the heads vertical location
      let y = this.body[this.body.length-1].y;
      
      // if the snake and the food have the same location then allow the snake to grow otherwise keep the snake the same size
      if (x == pos.x && y == pos.y) {

        // running the grow function
        this.grow();

        // running the speedUp function
        // this.speedUp();
        return true;
      }
       return false
    }
    
    // Creating a function that will show the snake
    show () {
      // showing the entire snake and not just a piece of the snake
      for (let i = 0; i < this.body.length; i++) {

        // creating the color of the snake to be black
        fill(0);

        // making sure snake is to scale
        noStroke();
      
        // creating the shape of the snake to be a square at the start
        rect(this.body[i].x, this.body[i].y, 1, 1);
      }
    }
  }