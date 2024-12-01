import P5Lib from 'p5';

export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    moveSpeed: number;
    movingUp: boolean;
    movingRight: boolean;
    movingLeft: boolean;

    constructor(x: number, y: number, width: number, height: number, moveSpeed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed;
        this.movingUp = false;
        this.movingRight = false;
        this.movingLeft = false;
    }

    // Draw the rectangle
    draw(p5: P5Lib) {
        p5.rect(this.x, this.y, this.width, this.height);
    }

    // Handle movement logic
    move(p5: P5Lib) {
        if (this.movingUp) {
            this.y -= this.moveSpeed;
            if (this.y <= 200) { // Stop moving up at the upper limit
                this.movingUp = false;
            }
        } else if (this.y < p5.height - this.height) {
            this.y += this.moveSpeed; // Move down if not at the bottom
        }

        if (this.movingRight) {
            this.x += this.moveSpeed / 4; // Move right
        }

        if (this.movingLeft) {
            this.x -= this.moveSpeed / 4; // Move left
        }
    }

    // Handle key press events
    handleKeyPress(key: string, p5: P5Lib) {
        if ((key === 'w' && this.y >= p5.height - this.height) || (p5.keyCode === 38 && this.y >= p5.height - this.height) ) {
            this.movingUp = true;
        }
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = true;
        }
        if (key === 'a'|| p5.keyCode === 37) {
            this.movingLeft = true;
        }
    }

    // Handle key release events
    handleKeyRelease(key: string, p5: P5Lib) {
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = false;
        }
        if (key === 'a' || p5.keyCode === 37) {
            this.movingLeft = false;
        }
    }
}

