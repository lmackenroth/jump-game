import P5Lib from 'p5';

export class platform {

    public p5: P5Lib;
    //array of rectangles, maybe pass number or rectangles to its method
    public platforms: Array<{ x: number; y: number; width: number; height: number }>;

    constructor(p5: P5Lib) {
        this.p5 = p5;
        this.platforms = [];
    }

    //I want to spawn in rectangles at a certain length but in random positions
    draw() {
        //draw rectangles


    }

    createPlatfroms(amount: number) {
        //fill array with a cdertain number of platforms

        for (var i = 0; i < amount; i++) {
            //very vauge constrictions on the randomness, will have to tweak later
            const platform = {
                x: this.p5.random(0, this.p5.width), //x position
                y: this.p5.random(0, this.p5.height), //y position
                width: this.p5.random(40, 80), // width 
                height: this.p5.random(10, 30), // height
            };
            this.platforms.push(platform);





        }



    }
}