import P5Lib from 'p5';

import { Rectangle } from './rectanglecontrols';

function project(p5: P5Lib) {
    let rect: Rectangle;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        rect = new Rectangle(p5.width / 2 - 25, p5.height - 50, 50, 50, 10);
    };

    p5.draw = () => {
        p5.background(20, 70, 100); // Clear canvas every frame

        // Move and draw the rectangle
        rect.move(p5);
        rect.draw(p5);
    };

    p5.keyPressed = () => {
        rect.handleKeyPress(p5.key, p5);
    };

    p5.keyReleased = () => {
        rect.handleKeyRelease(p5.key,p5);
    };
}

new P5Lib(project);
