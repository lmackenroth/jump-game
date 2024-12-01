import P5Lib from 'p5';

export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    moveSpeed: number;
    velocityY: number;  // New property for vertical velocity
    movingUp: boolean;
    movingRight: boolean;
    movingLeft: boolean;
    movingDown: boolean;

    constructor(x: number, y: number, width: number, height: number, moveSpeed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed;
        this.velocityY = 0; // Start with zero vertical speed
        this.movingUp = false;
        this.movingRight = false;
        this.movingLeft = false;
        this.movingDown = false;
    }

    // Draw the rectangle
    draw(p5: P5Lib) {
        p5.rect(this.x, this.y, this.width, this.height);
    }

    // Handle movement logic
    move(p5: P5Lib) {
        // Handle vertical movement (gravity)
        if (this.movingUp) {
            this.velocityY = -this.moveSpeed; // Jump up
            this.movingUp = false; // Set to false after initiating jump
        } else {
            this.velocityY += 0.5; // Gravity effect (increase downward velocity)
        }

        this.y += this.velocityY;

        // makes sure the rectangle doesn't fall below the canvas
        if (this.y > p5.height - this.height) {
            this.y = p5.height - this.height;
            this.velocityY = 0;
            this.movingDown = false;
        }
        //need to put in a check that handles the other sides
        

        //  left right  movement
        if (this.movingRight) {
            this.x += this.moveSpeed / 4; // Move right
        }

        if (this.movingLeft) {
            this.x -= this.moveSpeed / 4; // Move left
        }
    }

    // Handle key press events
    handleKeyPress(key: string, p5: P5Lib) {
        //move up if w or up arrow pressed and height is checked
        //i need to update the height chack to be able to keep jumping

        if ((key === 'w' && this.y >= p5.height - this.height) || (p5.keyCode === 38 && this.y >= p5.height - this.height)) {
            this.movingUp = true;
        }
        //move right if d or right arrow pressed
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = true;
        }
        //move left if a or left arrow pressed
        if (key === 'a' || p5.keyCode === 37) {
            this.movingLeft = true;
        }
    }

    // Handle key release events
    handleKeyRelease(key: string, p5: P5Lib) {
        //don't move right if d or right arrow isn't pressed
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = false;
        }
        //don't move left if a or left arrow isn't pressed
        if (key === 'a' || p5.keyCode === 37) {
            this.movingLeft = false;
        }
    }

    checkCollision(platforms: Array<{ x: number; y: number; width: number; height: number }>) {
        let onPlatform = false;

        for (const platform of platforms) {
            //top of platform
            const platformTop = platform.y;
            //const platformBottom = platform.y + platform.height;
            //left side platform
            const platformLeft = platform.x;
            //right side of platform
            const platformRight = platform.x + platform.width;

            //const rectTop = this.y;
            //bottom of character
            const rectBottom = this.y + this.height;
            //left of character
            const rectLeft = this.x;
            //right of character
            const rectRight = this.x + this.width;

            // **1. Landing on top of the platform**
            if (
                rectBottom >= platformTop && // check collision of bottom of characgter and top of platform
                rectBottom <= platformTop + 5 && // margin of error for landing
                rectRight > platformLeft && // collision left platform side and right character side
                rectLeft < platformRight && // collision right platform side and left character side
                this.velocityY >= 0 // Only handle if falling down
            ) {
                this.y = platformTop - this.height; // Snap to platform's top
                this.velocityY = 0; // makes sure it stops moving
                onPlatform = true;
                break; // Stop further checks
            }
        }

        // If not on a platform, character can fall
        if (!onPlatform) {
            this.movingDown = true;
        } else {
            this.movingDown = false;
        }
    }
}
