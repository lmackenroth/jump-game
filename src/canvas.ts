import P5Lib from 'p5';

let movingUp: boolean;
let movingRight: boolean;
let movingLeft: boolean;

let rectY: number;
let rectX: number;
let moveSpeed: number = 7;

function project(p5: P5Lib) {
    p5.setup = () => {
        p5.createCanvas(500, 500);
        rectY = p5.height - 50; // Start rectangle at the bottom
        rectX = p5.width / 2 - 25; // Center horizontally
        movingUp = false; // Initially, rectangle is not moving
        movingRight = false;
        movingLeft = false;
    };

    p5.draw = () => {
        p5.background(20, 70, 100); // Clear canvas every frame

        // Draw the rectangle at its current position
        p5.rect(rectX, rectY, 50, 50);

        // Move the rectangle up or down
        if (movingUp) {
            rectY -= moveSpeed; // Move up
            if (rectY <= 300) { // Stop moving up at the upper limit
                movingUp = false;
            }
        } else if (rectY < p5.height - 50) {
            rectY += moveSpeed; // Move down if not at the bottom
        }
        if (movingRight) {
            rectX += moveSpeed/4; // Move side to side  
        } 
        if (movingLeft) {
            rectX -= moveSpeed/4; // Move side to side  
        } 
    };

    p5.keyPressed = () => {
        // Check if the "a" key is pressed
        if (p5.key === 'w') {
            if (rectY >= p5.height - 50) { // Only move up if rectangle is at the bottom
                movingUp = true;
                console.log("a is pressed, starting to move up");
            }
        }
        if (p5.key === 'd') {
            if (rectY >= p5.height - 50) { // Only move up if rectangle is at the bottom
                movingRight = true;
                console.log("d is pressed, starting to move up");
            } 
        }
        if (p5.key === 'a') {
            if (rectY >= p5.height - 50) { // Only move up if rectangle is at the bottom
                movingLeft = true;
                console.log("a is pressed, starting to move up");
            } 
        }
    };
    p5.keyReleased = () => {
        // Handle key release
        if (p5.key === 'd') {
            movingRight = false;
            console.log("'d' is released, stopping right movement");
        }
        if (p5.key === 'a') {
            movingLeft = false;
            console.log("'a' is released, stopping left movement");
        }
    };
}

new P5Lib(project);
