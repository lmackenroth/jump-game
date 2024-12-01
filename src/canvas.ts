import P5Lib from 'p5';
let movingUp: boolean;
let rectY: number;
let rectX: number;
let moveSpeed: number = 5;

//project set up

function project(p5: P5Lib) {

    p5.setup = () => {
        p5.createCanvas(500, 500);
        p5.background(20, 70, 100);
        //set size of rectangle
        rectY = p5.height - 50;
        rectX = p5.width - 50;
        //cset to false when loaded in
        movingUp = false;

    }

    p5.draw = () => {
        //create rectangle and spawn point based on canvas
        p5.rect(rectX / 2 - 25, rectY, 50, 50);

        if (movingUp) {

            rectY -= moveSpeed;
            if (rectY <= 100) {

                movingUp = false;
            } 


        }else if (rectY < p5.height - 50) {

            rectY += moveSpeed;

        }

    }
    p5.keyPressed = () => {
        // Check if the spacebar is pressed
        if (p5.key === 'a') { 
            // Only move up if the rectangle is at the bottom
            if (rectY >= p5.height - 50) { 
                movingUp = true;
                console.log("a is pressed");
    
            }

        }
    }

}
new P5Lib(project);