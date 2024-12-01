import P5Lib from 'p5';
//let movingUp: boolean;
let rectY: number;
//project set up

function project(p5: P5Lib) {

    p5.setup = () => {
        p5.createCanvas(500,500);
        p5.background(20,70,100);
        //set size of rectangle
        rectY = p5.height - 50;
        //checks when the rectangle is moving up
        //movingUp = false;

    }

    p5.draw = () => {
        p5.rect(p5.width / 2 - 25, rectY, 50, 50);
 
    }
    p5.keyPressed = () => {


    }

}
new P5Lib(project);