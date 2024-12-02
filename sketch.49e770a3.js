/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! p5.js v1.11.1 October 31, 2024 */

/***/ }),

/***/ "./src/platforms.ts":
/*!**************************!*\
  !*** ./src/platforms.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   platform: () => (/* binding */ platform)
/* harmony export */ });
class platform {
    constructor(p5) {
        this.p5 = p5;
        this.platforms = [];
    }
    draw() {
        this.p5.fill(255);
        for (const platform of this.platforms) {
            this.p5.rect(platform.x, platform.y, platform.width, platform.height);
        }
        console.log("drawing platforms");
    }
    createPlatfroms(amount) {
        for (var i = 0; i <= amount; i++) {
            const platform = {
                x: this.p5.random(0, this.p5.width),
                y: this.p5.random(0, this.p5.height),
                width: this.p5.random(40, 80),
                height: this.p5.random(10, 30),
            };
            console.log("creating platform");
            this.platforms.push(platform);
        }
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
    constructor(p5, x, y, width, height, moveSpeed) {
        this.x = x;
        this.p5 = p5;
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
    }
    draw(p5) {
        p5.rect(this.x, this.y, this.width, this.height);
    }
    move(p5) {
        if (this.movingUp && this.isOnPlat) {
            this.velocityY = -this.moveSpeed;
            this.movingUp = false;
            this.isOnPlat = false;
        }
        else {
            this.velocityY += 0.5;
        }
        this.y += this.velocityY;
        if (this.y > p5.height - this.height) {
            this.y = p5.height - this.height;
            this.velocityY = 0;
            this.movingDown = false;
            this.isOnPlat = true;
        }
        if (this.movingRight) {
            this.x += this.moveSpeed / 4;
        }
        if (this.movingLeft) {
            this.x -= this.moveSpeed / 4;
        }
    }
    handleKeyPress(key, p5) {
        if ((key === 'w' && (this.isOnPlat || this.y >= p5.height - this.height)) ||
            (p5.keyCode === 38 && (this.isOnPlat || this.y >= p5.height - this.height))) {
            this.movingUp = true;
        }
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = true;
        }
        if (key === 'a' || p5.keyCode === 37) {
            this.movingLeft = true;
        }
    }
    handleKeyRelease(key, p5) {
        if (key === 'd' || p5.keyCode === 39) {
            this.movingRight = false;
        }
        if (key === 'a' || p5.keyCode === 37) {
            this.movingLeft = false;
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
/* harmony import */ var _platforms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platforms */ "./src/platforms.ts");



function project(p5) {
    let rect;
    let plat;
    p5.setup = () => {
        p5.createCanvas(500, 500);
        rect = new _rectanglecontrols__WEBPACK_IMPORTED_MODULE_1__.Rectangle(p5, p5.width / 2 - 25, p5.height - 50, 50, 50, 10);
        plat = new _platforms__WEBPACK_IMPORTED_MODULE_2__.platform(p5);
        plat.createPlatfroms(5);
        console.log("Platforms created:", plat.platforms);
    };
    p5.draw = () => {
        p5.background(20, 70, 100);
        plat.draw();
        rect.move(p5);
        rect.checkCollision(plat.platforms);
        rect.draw(p5);
    };
    p5.keyPressed = () => {
        rect.handleKeyPress(p5.key, p5);
    };
    p5.keyReleased = () => {
        rect.handleKeyRelease(p5.key, p5);
    };
}
new (p5__WEBPACK_IMPORTED_MODULE_0___default())(project);

})();

/******/ })()
;
//# sourceMappingURL=sketch.49e770a3.map