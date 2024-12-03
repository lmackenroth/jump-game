import P5Lib from 'p5';
import { Rectangle } from './rectanglecontrols';
export class deskInteraction extends Rectangle {

    //p5: P5Lib;
    xDesk: number;
    yDesk: number;
    widthD: number;
    heightD: number;
    roomImage: P5Lib.Image;
    


    //transparency: number;


    constructor(p5: P5Lib, x: number, y: number, width: number, height: number, moveSpeed: number, leftIdle: P5Lib.Image, rightIdle: P5Lib.Image, leftMove: P5Lib.Image, rightMove: P5Lib.Image, roomImage: P5Lib.Image) {
        super(p5, x, y, width, height, moveSpeed, leftIdle, rightIdle, leftMove, rightMove)
        this.p5 = p5;
        this.xDesk = 460;
        this.yDesk = 250;
        this.widthD = this.p5.height / 3;
        this.heightD = this.p5.width / 10;
        this.transparency = 0;
        this.roomImage = roomImage;

    }
    //draw a rectangle where desk is
    override draw(): void {
        this.p5.fill(255, 255, 255, this.transparency);
        this.p5.rect(this.xDesk, this.yDesk, this.widthD, this.heightD)
        // Center the canvas in the window


    }


    //method for checking colision 
    checkDesk(char: Rectangle): boolean {

        //const charX = new Rectangle(y)


        const deskLside = this.xDesk;
        const deskRSide = this.xDesk + this.widthD;

        const rectLeft = char.x;
        const rectRight = char.x + char.width;


        // console.log('Desk:', { deskLside, deskRSide, deskTop, deskBottom });
        // console.log('Character:', { rectLeft, rectRight, rectBottom });

        if (
            rectRight > deskLside &&
            rectLeft < deskRSide
        ) {
            console.log('On the desk');
            return true;
        }
        else {
            console.log('not On the desk');

        }

        return false;
    }
    //hyperlink method for when there is a collision
    screenOn(char: Rectangle): boolean {

        //get boolean from check desk
        if (this.checkDesk(char)) {
            //make text appear
            //this.p5.text('press a',400, 100, this.p5.height/9, this.p5.width/10 )
            this.p5.fill(255, 255, 255); // Set text color (white)
            this.p5.textSize(15); // Set text size
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER); // Center-align text
            this.p5.text('Press E to interact', this.p5.width / 2, 100);
            this.p5.textFont('Courier New') // Center horizontally

            return true;
        }
        return false;
    }
    screenPopUp(char: Rectangle, key: string): boolean {

        if (this.screenOn(char) && key === 'e') {

            this.popUp();

            return true;

        } 
        return false;
    }
    popUp(): void {
        //this.p5.clear();
        
        // Step 1: Draw the background (original image)

        this.p5.image(this.roomImage, 0, 0, this.p5.width, this.p5.height); // Draw the original background image

        // Step 2: Draw a semi-transparent overlay
        this.p5.fill(0, 0, 0, 150); // Black overlay with 150 alpha (semi-transparent)
        this.p5.rect(0, 0, this.p5.width, this.p5.height); // Cover the entire canvas with the overlay

        // Step 3: Draw the bright blue rectangle
        const x = this.p5.width * 0.2; // X position: 1/4 from the left
        const y = this.p5.height * 0.15; // Y position: 1/4 from the top
        const width = this.p5.width * 0.6; // Width: Half the canvas width
        const height = this.p5.height * 0.6; // Height: Half the canvas height

        this.p5.fill(0, 0, 255); // Blue fill for the rectangle
        this.p5.rect(x, y, width, height);

        this.p5.rect(x, y, width, height);
      

        this.p5.fill(255); // White text
        this.p5.textFont('Courier New');
        this.p5.textSize(15);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.text('Thank you for trying out my p5 and typescript practice', x + width *0.5, y + height * 0.2); // Center text inside the rectangle
        this.p5.text('press q to quit', x + width *0.5, y + height * 0.4);
    }

}










