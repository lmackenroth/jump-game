import P5Lib from 'p5';

export class Rectangle {
    p5: P5Lib;
    x: number;
    y: number;
    width: number;
    height: number;
    moveSpeed: number;
    velocityY: number;
    movingUp: boolean;
    movingRight: boolean;
    movingLeft: boolean;
    movingDown: boolean;
    isOnPlat: boolean;
    transparency: number;
    currentAnimation: string;

    leftIdle: P5Lib.Image;
    rightIdle: P5Lib.Image;
    leftMove: P5Lib.Image;
    rightMove: P5Lib.Image;

    constructor(p5: P5Lib, x: number, y: number, width: number, height: number, moveSpeed: number, leftIdle: P5Lib.Image, rightIdle: P5Lib.Image, leftMove: P5Lib.Image, rightMove: P5Lib.Image) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed;
        this.velocityY = 0;
        this.movingUp = false;
        this.movingRight = false;
        this.movingLeft = false;
        this.movingDown = false;
        this.isOnPlat = false;
        this.transparency = 0;
        this.currentAnimation = 'idleRight';

        // Assign preloaded images
        this.leftIdle = leftIdle;
        this.rightIdle = rightIdle;
        this.leftMove = leftMove;
        this.rightMove = rightMove;
    }

    // Remaining methods (move, draw, checkCollision, etc.)


    // Draw the character and animation
    draw() {
        if (this.p5) {
            this.p5.fill(255, 255, 255, this.transparency);
            this.p5.stroke(255, 255, 255, this.transparency);
            this.p5.rect(this.x, this.y, this.width, this.height);
            this.drawAnimation();
        }
    }


    


    // Draw animation based on the current state
    drawAnimation() {
        let animationGif: P5Lib.Image | null = null;

        switch (this.currentAnimation) {
            case 'moveRight':
                animationGif = this.rightMove;
                break;
            case 'moveLeft':
                animationGif = this.leftMove;
                break;
            case 'idleLeft':
                animationGif = this.leftIdle;
                break;
            case 'idleRight':
                animationGif = this.rightIdle;
                break;
            default:
                animationGif = this.rightIdle;
                break;
        }

        if (animationGif) {
            this.p5.image(animationGif, this.x, this.y, this.width, this.height);
        }
    }

    // Handle movement logic
    move() {
        if (this.movingUp && this.isOnPlat) {
            this.velocityY = -this.moveSpeed;
            this.movingUp = false;
            this.isOnPlat = false;
        } else {
            this.velocityY += 0.5; // Gravity effect
        }

        this.y += this.velocityY;

        // Keep the character above the canvas bottom
        if (this.y > this.p5.height - this.height) {
            this.y = this.p5.height - this.height;
            this.velocityY = 0;
            this.movingDown = false;
            this.isOnPlat = true;
        }

        if (this.movingRight) {
            this.x += this.moveSpeed / 4;
            this.currentAnimation = 'moveRight';
        } else if (this.movingLeft) {
            this.x -= this.moveSpeed / 4;
            this.currentAnimation = 'moveLeft';
        } else if (!this.movingRight && !this.movingLeft) {
            this.currentAnimation = this.currentAnimation.includes('Right') ? 'idleRight' : 'idleLeft';
        }
    }

    // Handle key press events
    handleKeyPress(key: string) {
        if ((key === 'w' && (this.isOnPlat || this.y >= this.p5.height - this.height)) ||
            (this.p5.keyCode === 38 && (this.isOnPlat || this.y >= this.p5.height - this.height))) {
            this.movingUp = true;
        }
        if (key === 'd' || this.p5.keyCode === 39) {
            this.movingRight = true;
            this.currentAnimation = 'moveRight';
        }
        if (key === 'a' || this.p5.keyCode === 37) {
            this.movingLeft = true;
            this.currentAnimation = 'moveLeft';
        }
    }

    // Handle key release events
    handleKeyRelease(key: string) {
        if (key === 'd' || this.p5.keyCode === 39) {
            this.movingRight = false;
            this.currentAnimation = 'idleRight';
        }
        if (key === 'a' || this.p5.keyCode === 37) {
            this.movingLeft = false;
            this.currentAnimation = 'idleLeft';
        }
    }

    checkCollision(platforms: Array<{ x: number; y: number; width: number; height: number }>) {
        let onPlatform = false;

        for (const platform of platforms) {
            const platformTop = platform.y;
            const platformLeft = platform.x;
            const platformRight = platform.x + platform.width;

            const rectBottom = this.y + this.height;
            const rectLeft = this.x;
            const rectRight = this.x + this.width;

            if (
                rectBottom >= platformTop &&
                rectBottom <= platformTop + 5 &&
                rectRight > platformLeft &&
                rectLeft < platformRight &&
                this.velocityY >= 0
            ) {
                this.y = platformTop - this.height;
                this.velocityY = 0;
                onPlatform = true;
                break;
            }
        }

        this.isOnPlat = onPlatform || this.y >= this.p5.height - this.height;

        if (!onPlatform && this.y < this.p5.height - this.height) {
            this.movingDown = true;
        } else {
            this.movingDown = false;
        }
    }
}
