import P5Lib from 'p5';

export class Rectangle {
    p5: P5Lib;
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
    isOnPlat: boolean;
    transparency: number; // Transparency of the character
    currentAnimation: string; // Track current animation state
    constructor(p5: P5Lib,x: number, y: number, width: number, height: number, moveSpeed: number) {
        this.x = x;
        this.p5 = p5;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed;
        this.velocityY = 0; // Start with zero vertical speed
        this.movingUp = false;
        this.movingRight = false;
        this.movingLeft = false;
        this.movingDown = false;
        this.isOnPlat = false;
        this.transparency = 150;
        this.currentAnimation = 'idle';
    }

    // Draw the rectangle
    draw(p5: P5Lib) {
        p5.fill(255,255,255,this.transparency);
        p5.rect(this.x, this.y, this.width, this.height);
    }

    animation(p5: P5Lib){

        p5.fill(0, 0, 255, this.transparency); 
        if (this.currentAnimation === 'idle') {
            // idle animation
            p5.text('Idle', this.x + this.width / 2, this.y - 10);
        } else if (this.currentAnimation === 'moveRight') {
            // right animation
            p5.text('Moving Right', this.x + this.width / 2, this.y - 10);
        } else if (this.currentAnimation === 'moveLeft') {
            // left animation
            p5.text('Moving Left', this.x + this.width / 2, this.y - 10);
        }
    }

    // Handle movement logic
    move(p5: P5Lib) {
        // Handle vertical movement (gravity)
        if (this.movingUp && this.isOnPlat) {
            this.velocityY = -this.moveSpeed; // Jump up
            this.movingUp = false; // Set to false after initiating jump
            this.isOnPlat = false;
        } else {
            this.velocityY += 0.5; // Gravity effect (increase downward velocity)
        }

        this.y += this.velocityY;

        // makes sure the rectangle doesn't fall below the canvas
        if (this.y > p5.height - this.height) {
            this.y = p5.height - this.height;
            this.velocityY = 0;
            this.movingDown = false;
            this.isOnPlat = true;
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

       if ((key === 'w' && (this.isOnPlat || this.y >= p5.height - this.height)) || 
            (p5.keyCode === 38 && (this.isOnPlat || this.y >= p5.height - this.height))) {
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


        this.isOnPlat = onPlatform || this.y >= this.p5.height - this.height;
        // If not on any platform and not touching the bottom, allow falling
        if (!onPlatform && this.y < this.p5.height - this.height) {
            this.movingDown = true;
        } else {
            this.movingDown = false;
        }
    }
}
