/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! p5.js v1.11.1 October 31, 2024 */

/***/ }),

/***/ "./src/deskInteract.ts":
/*!*****************************!*\
  !*** ./src/deskInteract.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deskInteraction: () => (/* binding */ deskInteraction)
/* harmony export */ });
/* harmony import */ var _rectanglecontrols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectanglecontrols */ "./src/rectanglecontrols.ts");

class deskInteraction extends _rectanglecontrols__WEBPACK_IMPORTED_MODULE_0__.Rectangle {
    constructor(p5, x, y, width, height, moveSpeed, leftIdle, rightIdle, leftMove, rightMove, roomImage) {
        super(p5, x, y, width, height, moveSpeed, leftIdle, rightIdle, leftMove, rightMove);
        this.p5 = p5;
        this.xDesk = 460;
        this.yDesk = 250;
        this.widthD = this.p5.height / 3;
        this.heightD = this.p5.width / 10;
        this.transparency = 0;
        this.roomImage = roomImage;
    }
    draw() {
        this.p5.fill(255, 255, 255, this.transparency);
        this.p5.rect(this.xDesk, this.yDesk, this.widthD, this.heightD);
    }
    checkDesk(char) {
        const deskLside = this.xDesk;
        const deskRSide = this.xDesk + this.widthD;
        const rectLeft = char.x;
        const rectRight = char.x + char.width;
        if (rectRight > deskLside &&
            rectLeft < deskRSide) {
            console.log('On the desk');
            return true;
        }
        else {
            console.log('not On the desk');
        }
        return false;
    }
    screenOn(char) {
        if (this.checkDesk(char)) {
            this.p5.fill(255, 255, 255);
            this.p5.textSize(15);
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
            this.p5.text('Press E to interact', this.p5.width / 2, 100);
            this.p5.textFont('Courier New');
            return true;
        }
        return false;
    }
    screenPopUp(char, key) {
        if (this.screenOn(char) && key === 'e') {
            this.popUp();
            return true;
        }
        return false;
    }
    popUp() {
        this.p5.image(this.roomImage, 0, 0, this.p5.width, this.p5.height);
        this.p5.fill(0, 0, 0, 150);
        this.p5.rect(0, 0, this.p5.width, this.p5.height);
        const x = this.p5.width * 0.2;
        const y = this.p5.height * 0.15;
        const width = this.p5.width * 0.6;
        const height = this.p5.height * 0.6;
        this.p5.fill(0, 0, 255);
        this.p5.rect(x, y, width, height);
        this.p5.rect(x, y, width, height);
        this.p5.fill(255);
        this.p5.textFont('Courier New');
        this.p5.textSize(15);
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.text('Thank you for trying out my p5 and typescript practice', x + width * 0.5, y + height * 0.2);
        this.p5.text('press q to quit', x + width * 0.5, y + height * 0.4);
    }
}


/***/ }),

/***/ "./src/rectanglecontrols.ts":
/*!**********************************!*\
  !*** ./src/rectanglecontrols.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rectangle: () => (/* binding */ Rectangle)
/* harmony export */ });
class Rectangle {
    constructor(p5, x, y, width, height, moveSpeed, leftIdle, rightIdle, leftMove, rightMove) {
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
        this.leftIdle = leftIdle;
        this.rightIdle = rightIdle;
        this.leftMove = leftMove;
        this.rightMove = rightMove;
    }
    draw() {
        if (this.p5) {
            this.p5.fill(255, 255, 255, this.transparency);
            this.p5.stroke(255, 255, 255, this.transparency);
            this.p5.rect(this.x, this.y, this.width, this.height);
            this.drawAnimation();
        }
    }
    drawAnimation() {
        let animationGif = null;
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
    move() {
        if (this.movingUp && this.isOnPlat) {
            this.velocityY = -this.moveSpeed;
            this.movingUp = false;
            this.isOnPlat = false;
        }
        else {
            this.velocityY += 5;
        }
        this.y += this.velocityY;
        if (this.y > this.p5.height - this.height) {
            this.y = this.p5.height - this.height;
            this.velocityY = 0;
            this.movingDown = false;
            this.isOnPlat = true;
        }
        if (this.movingRight) {
            this.x += this.moveSpeed / 4;
            this.currentAnimation = 'moveRight';
        }
        else if (this.movingLeft) {
            this.x -= this.moveSpeed / 4;
            this.currentAnimation = 'moveLeft';
        }
        else if (!this.movingRight && !this.movingLeft) {
            this.currentAnimation = this.currentAnimation.includes('Right') ? 'idleRight' : 'idleLeft';
        }
    }
    handleKeyPress(key) {
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
    handleKeyRelease(key) {
        if (key === 'd' || this.p5.keyCode === 39) {
            this.movingRight = false;
            this.currentAnimation = 'idleRight';
        }
        if (key === 'a' || this.p5.keyCode === 37) {
            this.movingLeft = false;
            this.currentAnimation = 'idleLeft';
        }
    }
    checkCollision(platforms) {
        let onPlatform = false;
        for (const platform of platforms) {
            const platformTop = platform.y;
            const platformLeft = platform.x;
            const platformRight = platform.x + platform.width;
            const rectBottom = this.y + this.height;
            const rectLeft = this.x;
            const rectRight = this.x + this.width;
            if (rectBottom >= platformTop &&
                rectBottom <= platformTop + 5 &&
                rectRight > platformLeft &&
                rectLeft < platformRight &&
                this.velocityY >= 0) {
                this.y = platformTop - this.height;
                this.velocityY = 0;
                onPlatform = true;
                break;
            }
        }
        this.isOnPlat = onPlatform || this.y >= this.p5.height - this.height;
        if (!onPlatform && this.y < this.p5.height - this.height) {
            this.movingDown = true;
        }
        else {
            this.movingDown = false;
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "./node_modules/p5/lib/p5.min.js");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rectanglecontrols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rectanglecontrols */ "./src/rectanglecontrols.ts");
/* harmony import */ var _deskInteract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deskInteract */ "./src/deskInteract.ts");



function project(p5) {
    let rect = null;
    let desk;
    let leftIdle;
    let rightIdle;
    let leftMove;
    let rightMove;
    let roomImage;
    let popUpMode = false;
    p5.preload = () => {
        leftIdle = p5.loadImage('./docs/dist/gifs/leftIdle.gif');
        rightIdle = p5.loadImage('./docs/dist/gifs/rightIdle.gif');
        leftMove = p5.loadImage('./docs/dist/gifs/runLeft.gif');
        rightMove = p5.loadImage('./docs/dist/gifs/runRight.gif');
        roomImage = p5.loadImage('./docs/dist/gifs/room1.png');
    };
    p5.setup = () => {
        const canvas = p5.createCanvas(1000, 500);
        canvas.parent(document.body);
        canvas.style('display', 'block');
        canvas.style('margin', '150px auto');
        p5.background(roomImage);
        rect = new _rectanglecontrols__WEBPACK_IMPORTED_MODULE_1__.Rectangle(p5, p5.width / 2 - 25, p5.height - 50, 250, 250, 40, leftIdle, rightIdle, leftMove, rightMove);
        desk = new _deskInteract__WEBPACK_IMPORTED_MODULE_2__.deskInteraction(p5, p5.width / 2 - 25, p5.height - 50, 250, 250, 40, leftIdle, rightIdle, leftMove, rightMove, roomImage);
    };
    p5.draw = () => {
        if (rect === null) {
            return;
        }
        if (popUpMode) {
            desk.popUp();
        }
        else {
            p5.background(roomImage);
            p5.fill(255, 255, 255);
            rect.move();
            rect.draw();
            desk.draw();
            desk.screenOn(rect);
        }
    };
    p5.keyPressed = () => {
        if (rect !== null) {
            rect.handleKeyPress(p5.key);
        }
        if (!popUpMode && rect !== null && desk !== undefined) {
            if (desk.screenPopUp(rect, p5.key)) {
                popUpMode = true;
                console.log('Pop-up mode activated');
            }
        }
        if (popUpMode && (p5.key === 'Escape' || p5.key === 'q')) {
            popUpMode = false;
        }
    };
    p5.keyReleased = () => {
        if (rect !== null) {
            rect.handleKeyRelease(p5.key);
        }
    };
}
new (p5__WEBPACK_IMPORTED_MODULE_0___default())(project);

})();

/******/ })()
;
//# sourceMappingURL=sketch.67b373e1.map