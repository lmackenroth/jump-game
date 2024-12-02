import P5Lib from 'p5';
import { Rectangle } from './rectanglecontrols';
import { platform } from './platforms';

function project(p5: P5Lib) {
    let rect: Rectangle | null = null;
    let plat: platform;

    // Declare images for animations
    let leftIdle: P5Lib.Image;
    let rightIdle: P5Lib.Image;
    let leftMove: P5Lib.Image;
    let rightMove: P5Lib.Image;
    let roomImage: P5Lib.Image;

    // Preload assets before the setup begins
    p5.preload = () => {
        leftIdle = p5.loadImage('./docs/dist/gifs/leftIdle.gif');
        rightIdle = p5.loadImage('./docs/dist/gifs/rightIdle.gif');
        leftMove = p5.loadImage('./docs/dist/gifs/runLeft.gif');
        rightMove = p5.loadImage('./docs/dist/gifs/runRight.gif');
        roomImage = p5.loadImage('./docs/dist/gifs/room.png');
    };
    

    // Setup canvas, create platforms, and initialize rectangle
    p5.setup = () => {
        const canvas = p5.createCanvas(1000, 500);
        // Center the canvas in the window
        canvas.parent(document.body);
        canvas.style('display', 'block');
        canvas.style('margin', '150px auto');
        p5.background(roomImage); 

        // Initialize the Rectangle instance with preloaded GIFs
        rect = new Rectangle(p5, p5.width / 2 - 25, p5.height - 50, 200, 200, 11, leftIdle, rightIdle, leftMove, rightMove);

        // Create and draw platforms
        plat = new platform(p5);
        plat.createPlatfroms(5);
        console.log("Platforms created:", plat.platforms);
    };

    // Draw loop
    p5.draw = () => {
        if (rect === null) {
            // If `rect` is not initialized, don't proceed with drawing
            return;
        }
        // Clear the canvas
        p5.background(roomImage); 
        p5.fill(255,255,255);

        
        // Draw platforms
        plat.draw();

        // Move and update character, check collision
        rect.move();
        rect.checkCollision(plat.platforms);

        // Draw character with animation
        rect.draw();
    };

    // Handle key presses for character actions
    p5.keyPressed = () => {
        if (rect !== null) {
            rect.handleKeyPress(p5.key);
        }
    };

    // Handle key releases for character actions
    p5.keyReleased = () => {
        if (rect !== null) {
            rect.handleKeyRelease(p5.key);
        }
    };
}

// Create the p5.js project instance
new P5Lib(project);
