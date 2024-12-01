import P5Lib from 'p5';

export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    moveSpeed: number;
    movingRight: boolean;
    movingLeft: boolean;
    velocity: number;
    isJumping: boolean;

    constructor(x: number, y: number, width: number, height: number, moveSpeed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed;
        this.movingRight = false;
        this.movingLeft = false;
        this.velocity = 0; // Vertical velocity
        this.isJumping = false; // Track if the rectangle is in the air
    }

    // Draw the rectangle
    draw(p5: P5Lib) {
        p5.rect(this.x, this.y, this.width, this.height);
    }

    // Handle movement logic
    move(p5: P5Lib) {
        // Apply gravity and update velocity
        if (this.y + this.height < p5.height) {
            this.velocity += 1; // Gravity effect
        } else {
            this.velocity = 0; // Reset velocity if on the ground
            this.isJumping = false; // Allow jumping again
        }
    
        // Apply vertical movement
        this.y += this.velocity;
    
        // Constrain vertical position to not go below ground level
        this.y = p5.constrain(this.y, 0, p5.height - this.height);
    
        // Horizontal movement
        if (this.movingRight) {
            this.x += this.moveSpeed; // Move right
        }
        if (this.movingLeft) {
            this.x -= this.moveSpeed; // Move left
        }
    
        // Constrain horizontal movement within canvas bounds
        this.x = p5.constrain(this.x, 0, p5.width - this.width);
    }
    
    
    // Handle key press events
    handleKeyPress(key: string, p5: P5Lib) {
        if ((key === 'w' || p5.keyCode === 38) && !this.isJumping) {
            this.velocity = -15; // Set jump velocity
            this.isJumping = true; // Set jumping state
            console.log('Jump initiated');
        }
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = true;
        }
        if (key === 'a' || p5.keyCode === 37) {
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

    // Check collision with platforms
    checkCollision(platforms: Array<{ x: number; y: number; width: number; height: number }>) {
        for (const platform of platforms) {
            const platformTop = platform.y;
            const platformLeft = platform.x;
            const platformRight = platform.x + platform.width;
    
            const rectBottom = this.y + this.height;
            const rectLeft = this.x;
            const rectRight = this.x + this.width;
    
            // Check for collision with the top of the platform
            if (
                rectBottom >= platformTop &&
                rectBottom <= platformTop + 5 && // Allow small margin for collision
                rectRight > platformLeft &&
                rectLeft < platformRight &&
                this.velocity >= 0 // Ensure it's falling, not jumping
            ) {
                this.velocity = 0; // Stop downward movement
                this.y = platformTop - this.height; // Place rectangle on top of the platform
                this.isJumping = false; // Allow jumping again
                console.log(`Velocity: ${this.velocity}, Y Position: ${this.y}`);

            }
        }
    }
    
}
