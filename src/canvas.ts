import P5Lib from 'p5';
import { Rectangle } from './rectanglecontrols';
//import { platform } from './platforms';
import { deskInteraction } from './deskInteract';

function project(p5: P5Lib) {
    let rect: Rectangle | null = null;
    //let plat: platform;
    let desk: deskInteraction;

    // Declare images for animations
    let leftIdle: P5Lib.Image;
    let rightIdle: P5Lib.Image;
    let leftMove: P5Lib.Image;
    let rightMove: P5Lib.Image;
    let roomImage: P5Lib.Image;
    let popUpMode = false;


    // Preload assets before the setup begins
    p5.preload = () => {
        leftIdle = p5.loadImage('./docs/dist/gifs/leftIdle.gif');
        rightIdle = p5.loadImage('./docs/dist/gifs/rightIdle.gif');
        leftMove = p5.loadImage('./docs/dist/gifs/runLeft.gif');
        rightMove = p5.loadImage('./docs/dist/gifs/runRight.gif');
        roomImage = p5.loadImage('./docs/dist/gifs/room1.png');
        // leftIdle = p5.loadImage('gifs/leftIdle.gif');
        // rightIdle = p5.loadImage('gifs/rightIdle.gif');
        // leftMove = p5.loadImage('gifs/runLeft.gif');
        // rightMove = p5.loadImage('gifs/runRight.gif');
        // roomImage = p5.loadImage('gifs/room1.png');
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
        rect = new Rectangle(p5, p5.width / 2 - 25, p5.height - 50, 250, 250, 40, leftIdle, rightIdle, leftMove, rightMove);
        // Create and draw platforms
        //plat = new platform(p5);
        //plat.createPlatfroms(5);
        //console.log("Platforms created:", plat.platforms);
        desk = new deskInteraction(p5, p5.width / 2 - 25, p5.height - 50, 250, 250, 40, leftIdle, rightIdle, leftMove, rightMove, roomImage);

    };

    // Draw loop
    p5.draw = () => {
        if (rect === null) {
            // If `rect` is not initialized, don't proceed with drawing
            return;
        }
      
        if (popUpMode) {
            // Only render the pop-up
            desk.popUp();
            //p5.fill(255,255,255);
        

        } else {
            // Render the game world
            p5.background(roomImage); // Redraw the background image
            p5.fill(255,255,255);

            rect.move();
            rect.draw();
            desk.draw();
            desk.screenOn(rect);
        }
    };

    // Handle key presses for character actions
    p5.keyPressed = () => {
        if (rect !== null) {
            rect.handleKeyPress(p5.key);
        }
        if (!popUpMode && rect !== null && desk !== undefined) {
            if (desk.screenPopUp(rect, p5.key)) { // Only set popUpMode if screenPopUp returns true
                popUpMode = true;
                console.log('Pop-up mode activated');
            }
        }
     
        if (popUpMode && (p5.key === 'Escape' || p5.key === 'q')) {
            // Quit pop-up mode when Escape or 'q' is pressed
            popUpMode = false; // Exit pop-up mode
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
