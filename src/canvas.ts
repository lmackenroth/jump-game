import P5Lib from 'p5';

import { Rectangle } from './rectanglecontrols';
import { platform } from './platforms';

function project(p5: P5Lib) {
    let rect: Rectangle;
    let plat: platform;

    p5.setup = () => {
        p5.createCanvas(500, 500);
        rect = new Rectangle(p5,p5.width / 2 - 25, p5.height - 50, 50, 50, 10);
        plat = new platform(p5);
        plat.createPlatfroms(5);
        console.log("Platforms created:", plat.platforms);
    };
    

    p5.draw = () => {
        p5.background(20, 70, 100); // Clear canvas every frame
        //create platforms then draw them
        plat.draw();
        // Move and draw the rectangle
        rect.move(p5);
        rect.checkCollision(plat.platforms);
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
