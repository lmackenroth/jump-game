import P5Lib from 'p5';

export class platform {

    public p5: P5Lib;
    //array of rectangles, maybe pass number or rectangles to its method
    //stores each rectangles starting position, its width, and height
    public platforms: Array<{ x: number; y: number; width: number; height: number }>;

    constructor(p5: P5Lib) {
        this.p5 = p5;
        this.platforms = [];
    }

    //I want to spawn in rectangles at a certain length but in random positions
    draw() {
        //will change color later
        this.p5.fill(255); 
        //draw rectangles with stored values
        for (const platform of this.platforms) {
            this.p5.rect(platform.x, platform.y, platform.width, platform.height);
        }
        console.log("drawing platforms");


    }

    createPlatforms(amount: number, rectX: number, rectY: number, rectWidth: number, rectHeight: number) {
        this.platforms = []; // Clear previous platforms
    
        for (let i = 0; i < amount; i++) {
            const platform = {
                x: this.p5.random(rectX, rectX + rectWidth), // Constrain x position to the rectangle
                y: this.p5.random(rectY, rectY + rectHeight), // Constrain y position to the rectangle
                width: this.p5.random(40, 80), // Platform width
                height: this.p5.random(10, 30), // Platform height
            };
            console.log("Creating platform:", platform);
            this.platforms.push(platform);
        }
    }
}