/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Assets.ts":
/*!***********************!*\
  !*** ./src/Assets.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_config_1 = __webpack_require__(/*! ./game.config */ "./src/game.config.ts");
class Assets_Singleton {
    constructor() {
        this.sprites = new Map();
    }
    async loadGameAssets() {
        await this.loadGameSprites();
    }
    getSprite(key) {
        return this.sprites.get(key);
    }
    loadSprite(path) {
        const img = new Image();
        this.sprites.set(path, img);
        return new Promise(resolve => {
            img.onload = () => resolve();
            img.src = game_config_1.GAME_CONFIG.SPRITES_BASE_PATH + path;
        });
    }
    async loadGameSprites() {
        const loadPromises = Object.values(game_config_1.GAME_CONFIG.SPRITES).map(this.loadSprite.bind(this));
        await Promise.all(loadPromises);
    }
}
exports.Assets = new Assets_Singleton();


/***/ }),

/***/ "./src/Canvas.ts":
/*!***********************!*\
  !*** ./src/Canvas.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_config_1 = __webpack_require__(/*! ./game.config */ "./src/game.config.ts");
const Vector2_1 = __webpack_require__(/*! ./geom/Vector2 */ "./src/geom/Vector2.ts");
class Canvas2D_Singleton {
    get scaleX() {
        return this._scale.x;
    }
    get scaleY() {
        return this._scale.y;
    }
    get offsetX() {
        return this._offset.x;
    }
    get offsetY() {
        return this._offset.y;
    }
    constructor(canvas, canvasContainer) {
        this._canvasContainer = canvasContainer;
        this._canvas = canvas;
        this._context = this._canvas.getContext('2d');
        this.resizeCanvas();
    }
    resizeCanvas() {
        const originalCanvasWidth = game_config_1.GAME_CONFIG.GAME_WIDTH;
        const originalCanvasHeight = game_config_1.GAME_CONFIG.GAME_HEIGHT;
        const widthToHeight = originalCanvasWidth / originalCanvasHeight;
        let newHeight = window.innerHeight;
        let newWidth = window.innerWidth;
        const newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        }
        else {
            newHeight = newWidth / widthToHeight;
        }
        this._canvasContainer.style.width = newWidth + 'px';
        this._canvasContainer.style.height = newHeight + 'px';
        this._canvasContainer.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
        this._canvasContainer.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
        this._scale = new Vector2_1.Vector2(newWidth / originalCanvasWidth, newHeight / originalCanvasHeight);
        this._canvas.width = newWidth;
        this._canvas.height = newHeight;
        if (this._canvas.offsetParent) {
            this._offset = new Vector2_1.Vector2(this._canvas.offsetLeft, this._canvas.offsetTop);
        }
    }
    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    drawImage(sprite, position = Vector2_1.Vector2.zero, rotation = 0, origin = Vector2_1.Vector2.zero) {
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.translate(position.x, position.y);
        this._context.rotate(rotation);
        this._context.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
        this._context.restore();
    }
    drawText(text, font, color, position, textAlign = 'left') {
        this._context.save();
        this._context.fillStyle = color;
        this._context.font = font;
        this._context.textAlign = textAlign;
        this._context.fillText(text, position.x, position.y);
        this._context.restore();
    }
}
const canvas = document.getElementById('screen');
const container = document.getElementById('gameArea');
exports.Canvas2D = new Canvas2D_Singleton(canvas, container);
window.addEventListener('resize', exports.Canvas2D.resizeCanvas.bind(exports.Canvas2D));


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = __webpack_require__(/*! ./Assets */ "./src/Assets.ts");
const GameWorld_1 = __webpack_require__(/*! ./game-objects/GameWorld */ "./src/game-objects/GameWorld.ts");
const Keyboard_1 = __webpack_require__(/*! ./input/Keyboard */ "./src/input/Keyboard.ts");
const Canvas_1 = __webpack_require__(/*! ./Canvas */ "./src/Canvas.ts");
const Mouse_1 = __webpack_require__(/*! ./input/Mouse */ "./src/input/Mouse.ts");
let poolGame;
async function initGame() {
    await Assets_1.Assets.loadGameAssets();
    poolGame = new GameWorld_1.GameWorld();
    gameLoop();
}
function update() {
    poolGame.update();
    Keyboard_1.Keyboard.reset();
    Mouse_1.Mouse.reset();
}
function draw() {
    Canvas_1.Canvas2D.clear();
    poolGame.draw();
}
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
initGame();


/***/ }),

/***/ "./src/common/Color.ts":
/*!*****************************!*\
  !*** ./src/common/Color.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["white"] = 0] = "white";
    Color[Color["black"] = 1] = "black";
    Color[Color["red"] = 2] = "red";
    Color[Color["yellow"] = 3] = "yellow";
})(Color = exports.Color || (exports.Color = {}));


/***/ }),

/***/ "./src/game-objects/Ball.ts":
/*!**********************************!*\
  !*** ./src/game-objects/Ball.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_config_1 = __webpack_require__(/*! ./../game.config */ "./src/game.config.ts");
const Canvas_1 = __webpack_require__(/*! ./../Canvas */ "./src/Canvas.ts");
const Color_1 = __webpack_require__(/*! ./../common/Color */ "./src/common/Color.ts");
const Vector2_1 = __webpack_require__(/*! ./../geom/Vector2 */ "./src/geom/Vector2.ts");
const Assets_1 = __webpack_require__(/*! ../Assets */ "./src/Assets.ts");
class Ball {
    constructor(_position, color) {
        this._position = _position;
        this._velocity = Vector2_1.Vector2.zero;
        this._moving = false;
        this._visible = true;
        this.resolveSprite(color);
    }
    get velocity() {
        return this._velocity;
    }
    set velocity(value) {
        this._velocity = value;
    }
    get position() {
        return Vector2_1.Vector2.copy(this._position);
    }
    set position(value) {
        this._position = value;
    }
    get moving() {
        return this._moving;
    }
    resolveSprite(color) {
        switch (color) {
            case Color_1.Color.white:
                this._sprite = Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.CUE_BALL);
                break;
            case Color_1.Color.black:
                this._sprite = Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.BLACK_BALL);
                break;
            case Color_1.Color.red:
                this._sprite = Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.RED_BALL);
                break;
            case Color_1.Color.yellow:
                this._sprite = Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.YELLOW_BALL);
                break;
        }
    }
    handleBallInPocket() {
        const inPocket = game_config_1.GAME_CONFIG.POCKETS_POSITIONS
            .some((pocketPos) => this._position.distFrom(pocketPos) <= game_config_1.GAME_CONFIG.POCKET_RADIUS);
        if (inPocket) {
            this._velocity = Vector2_1.Vector2.zero;
            setTimeout(() => {
                this._moving = false;
                this._visible = false;
            }, game_config_1.GAME_CONFIG.TIMOUT_TO_HIDE_BALL_AFTER_POCKET);
        }
    }
    handleCollisionWithCushion() {
        const ballRadius = game_config_1.GAME_CONFIG.BALL_DIAMETER / 2;
        const topBallEdge = this.position.y - ballRadius;
        const leftBallEdge = this.position.x - ballRadius;
        const rightBallEdge = this.position.x + ballRadius;
        const bottomBallEdge = this.position.y + ballRadius;
        if (topBallEdge <= game_config_1.GAME_CONFIG.CUSHION_WIDTH) {
            this._position.addToY(game_config_1.GAME_CONFIG.CUSHION_WIDTH - this._position.y + ballRadius);
            this.velocity = new Vector2_1.Vector2(this.velocity.x, -this.velocity.y);
        }
        if (leftBallEdge <= game_config_1.GAME_CONFIG.CUSHION_WIDTH) {
            this._position.addToX(game_config_1.GAME_CONFIG.CUSHION_WIDTH - this._position.x + ballRadius);
            this.velocity = new Vector2_1.Vector2(-this.velocity.x, this.velocity.y);
        }
        if (rightBallEdge >= game_config_1.GAME_CONFIG.GAME_WIDTH - game_config_1.GAME_CONFIG.CUSHION_WIDTH) {
            this._position.addToX(game_config_1.GAME_CONFIG.GAME_WIDTH - game_config_1.GAME_CONFIG.CUSHION_WIDTH - this._position.x - ballRadius);
            this.velocity = new Vector2_1.Vector2(-this.velocity.x, this.velocity.y);
        }
        if (bottomBallEdge >= game_config_1.GAME_CONFIG.GAME_HEIGHT - game_config_1.GAME_CONFIG.CUSHION_WIDTH) {
            this._position.addToY(game_config_1.GAME_CONFIG.GAME_HEIGHT - game_config_1.GAME_CONFIG.CUSHION_WIDTH - this._position.y - ballRadius);
            this.velocity = new Vector2_1.Vector2(this.velocity.x, -this.velocity.y);
        }
    }
    collideWithBall(ball) {
        if (!this._visible || !ball._visible) {
            return;
        }
        const n = this._position.subtract(ball._position);
        const dist = n.length;
        if (dist > game_config_1.GAME_CONFIG.BALL_DIAMETER) {
            return;
        }
        const mtd = n.mult((game_config_1.GAME_CONFIG.BALL_DIAMETER - dist) / dist);
        this._position.addTo(mtd.mult(0.5));
        ball.position = ball.position.subtract(mtd.mult(0.5));
        const un = n.mult(1 / n.length);
        const ut = new Vector2_1.Vector2(-un.y, un.x);
        const v1n = un.dot(this._velocity);
        const v1t = ut.dot(this._velocity);
        const v2n = un.dot(ball.velocity);
        const v2t = ut.dot(ball.velocity);
        const v1nTag = un.mult(v2n);
        const v1tTag = ut.mult(v1t);
        const v2nTag = un.mult(v1n);
        const v2tTag = ut.mult(v2t);
        this._velocity = v1nTag.add(v1tTag);
        ball.velocity = v2nTag.add(v2tTag);
        this._moving = true;
        ball._moving = true;
        this.velocity.multBy(1 - game_config_1.GAME_CONFIG.COLLISION_LOSS);
        ball.velocity = ball.velocity.mult(1 - game_config_1.GAME_CONFIG.COLLISION_LOSS);
    }
    shoot(power, angle) {
        this._velocity = new Vector2_1.Vector2(power * Math.cos(angle), power * Math.sin(angle));
        this._moving = true;
    }
    update() {
        if (this._moving) {
            this.handleBallInPocket();
            this.handleCollisionWithCushion();
            this._velocity.multBy(1 - game_config_1.GAME_CONFIG.FRICTION);
            this._position.addTo(this._velocity);
            if (this._velocity.length < game_config_1.GAME_CONFIG.BALL_MIN_VELOCITY_LENGTH) {
                this.velocity = Vector2_1.Vector2.zero;
                this._moving = false;
            }
        }
    }
    draw() {
        if (this._visible) {
            Canvas_1.Canvas2D.drawImage(this._sprite, this._position, 0, game_config_1.GAME_CONFIG.BALL_ORIGIN);
        }
    }
}
exports.Ball = Ball;


/***/ }),

/***/ "./src/game-objects/GameWorld.ts":
/*!***************************************!*\
  !*** ./src/game-objects/GameWorld.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stick_1 = __webpack_require__(/*! ./Stick */ "./src/game-objects/Stick.ts");
const Color_1 = __webpack_require__(/*! ../common/Color */ "./src/common/Color.ts");
const Vector2_1 = __webpack_require__(/*! ../geom/Vector2 */ "./src/geom/Vector2.ts");
const game_config_1 = __webpack_require__(/*! ../game.config */ "./src/game.config.ts");
const Assets_1 = __webpack_require__(/*! ../Assets */ "./src/Assets.ts");
const Canvas_1 = __webpack_require__(/*! ../Canvas */ "./src/Canvas.ts");
const Ball_1 = __webpack_require__(/*! ./Ball */ "./src/game-objects/Ball.ts");
const Mouse_1 = __webpack_require__(/*! ../input/Mouse */ "./src/input/Mouse.ts");
class GameWorld {
    constructor() {
        this._redBalls = game_config_1.GAME_CONFIG.RED_BALLS_POSITIONS
            .map((position) => new Ball_1.Ball(Vector2_1.Vector2.copy(position), Color_1.Color.yellow));
        this._yellowBalls = game_config_1.GAME_CONFIG.YELLOW_BALLS_POSITIONS
            .map((position) => new Ball_1.Ball(Vector2_1.Vector2.copy(position), Color_1.Color.red));
        this._cueBall = new Ball_1.Ball(Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.CUE_BALL_POSITION), Color_1.Color.white);
        this._8Ball = new Ball_1.Ball(Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.EIGHT_BALL_POSITION), Color_1.Color.black);
        this._stick = new Stick_1.Stick(Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.CUE_BALL_POSITION));
        this._balls = [
            this._cueBall,
            ...this._redBalls,
            ...this._yellowBalls,
            this._8Ball
        ].sort((a, b) => {
            return a.position.x - b.position.x;
        });
        ;
        console.log(this._balls);
    }
    shootCueBall() {
        if (this._stick.power > 0) {
            this._stick.shoot();
            this._cueBall.shoot(this._stick.power, this._stick.rotation);
            this._stick.movable = false;
            setTimeout(() => this._stick.hide(), game_config_1.GAME_CONFIG.TIMEOUT_TO_HIDE_STICK_AFTER_SHOT);
        }
    }
    handleInput() {
        if (Mouse_1.Mouse.isPressed(game_config_1.GAME_CONFIG.SHOOT_MOUSE_BUTTON)) {
            this.shootCueBall();
        }
    }
    handleCollisions() {
        for (let i = 0; i < this._balls.length; i++) {
            for (let j = i + 1; j < this._balls.length; j++) {
                const firstBall = this._balls[i];
                const secondBall = this._balls[j];
                firstBall.collideWithBall(secondBall);
            }
        }
    }
    ballsMoving() {
        return this._balls.some(ball => ball.moving);
    }
    nextTurn() {
        this._stick.relocate(this._cueBall.position);
    }
    update() {
        this.handleCollisions();
        this.handleInput();
        this._stick.update();
        this._balls.forEach((ball) => ball.update());
        if (!this.ballsMoving() && !this._stick.visible) {
            this.nextTurn();
        }
    }
    draw() {
        Canvas_1.Canvas2D.drawImage(Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.TABLE));
        this._redBalls.forEach((ball) => ball.draw());
        this._yellowBalls.forEach((ball) => ball.draw());
        this._8Ball.draw();
        this._cueBall.draw();
        this._stick.draw();
    }
}
exports.GameWorld = GameWorld;


/***/ }),

/***/ "./src/game-objects/Stick.ts":
/*!***********************************!*\
  !*** ./src/game-objects/Stick.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Keyboard_1 = __webpack_require__(/*! ./../input/Keyboard */ "./src/input/Keyboard.ts");
const Mouse_1 = __webpack_require__(/*! ./../input/Mouse */ "./src/input/Mouse.ts");
const game_config_1 = __webpack_require__(/*! ./../game.config */ "./src/game.config.ts");
const Assets_1 = __webpack_require__(/*! ./../Assets */ "./src/Assets.ts");
const Canvas_1 = __webpack_require__(/*! ./../Canvas */ "./src/Canvas.ts");
const Vector2_1 = __webpack_require__(/*! ./../geom/Vector2 */ "./src/geom/Vector2.ts");
class Stick {
    constructor(_position) {
        this._position = _position;
        this._power = 0;
        this._movable = true;
        this._visible = true;
        this._sprite = Assets_1.Assets.getSprite(game_config_1.GAME_CONFIG.SPRITES.STICK);
        this._origin = Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.STICK_ORIGIN);
    }
    get rotation() {
        return this._rotation;
    }
    get power() {
        return this._power;
    }
    set movable(value) {
        this._movable = value;
    }
    get visible() {
        return this._visible;
    }
    increasePower() {
        this._power += game_config_1.GAME_CONFIG.POWER_TO_ADD_PER_FRAME;
        this._origin.addToX(game_config_1.GAME_CONFIG.STICK_MOVEMENT_PER_FRAME);
    }
    decreasePower() {
        this._power -= game_config_1.GAME_CONFIG.POWER_TO_ADD_PER_FRAME;
        this._origin.addToX(-game_config_1.GAME_CONFIG.STICK_MOVEMENT_PER_FRAME);
    }
    isLessThanMaxDistance() {
        return this._power <= game_config_1.GAME_CONFIG.STICK_MAX_POWER;
    }
    isMoreThanMinDistance() {
        return this._power >= 0;
    }
    updateDistance() {
        if (Keyboard_1.Keyboard.isDown(game_config_1.GAME_CONFIG.INCREASE_SHOT_POWER_KEY) && this.isLessThanMaxDistance()) {
            this.increasePower();
        }
        else if (Keyboard_1.Keyboard.isDown(game_config_1.GAME_CONFIG.DECREASE_SHOT_POWER_KEY) && this.isMoreThanMinDistance()) {
            this.decreasePower();
        }
    }
    updateRotation() {
        const opposite = Mouse_1.Mouse.posY - this._position.y;
        const adjacent = Mouse_1.Mouse.posX - this._position.x;
        this._rotation = Math.atan2(opposite, adjacent);
    }
    hide() {
        this._power = 0;
        this._visible = false;
    }
    shoot() {
        this._origin = Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.STICK_SHOT_ORIGIN);
    }
    relocate(position) {
        this._position = position;
        this._origin = Vector2_1.Vector2.copy(game_config_1.GAME_CONFIG.STICK_ORIGIN);
        this._movable = true;
        this._visible = true;
    }
    update() {
        if (this._movable) {
            this.updateRotation();
            this.updateDistance();
        }
    }
    draw() {
        if (this._visible) {
            Canvas_1.Canvas2D.drawImage(this._sprite, this._position, this._rotation, this._origin);
        }
    }
}
exports.Stick = Stick;


/***/ }),

/***/ "./src/game.config.ts":
/*!****************************!*\
  !*** ./src/game.config.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_CONFIG = {
    GAME_WIDTH: 1500,
    GAME_HEIGHT: 825,
    RED_BALLS_POSITIONS: [
        { x: 1056, y: 433 },
        { x: 1090, y: 374 },
        { x: 1126, y: 393 },
        { x: 1126, y: 472 },
        { x: 1162, y: 335 },
        { x: 1162, y: 374 },
        { x: 1162, y: 452 },
    ],
    YELLOW_BALLS_POSITIONS: [
        { x: 1022, y: 413 },
        { x: 1056, y: 393 },
        { x: 1090, y: 452 },
        { x: 1126, y: 354 },
        { x: 1126, y: 433 },
        { x: 1162, y: 413 },
        { x: 1162, y: 491 },
    ],
    CUE_BALL_POSITION: { x: 413, y: 413 },
    EIGHT_BALL_POSITION: { x: 1090, y: 413 },
    SPRITES_BASE_PATH: 'assets/sprites/',
    SPRITES: {
        MAIN_MENU_BACKGROUND: "main_menu_background.png",
        TABLE: "spr_background4.png",
        CUE_BALL: "spr_ball2.png",
        RED_BALL: "spr_redBall2.png",
        YELLOW_BALL: "spr_yellowBall2.png",
        BLACK_BALL: "spr_blackBall2.png",
        STICK: "spr_stick.png",
        TWO_PLAYERS_BUTTON: "2_players_button.png",
        TWO_PLAYERS_BUTTON_HOVERED: "2_players_button_hover.png",
        ONE_PLAYER_BUTTON: "1_player_button.png",
        ONE_PLAYER_BUTTON_HOVERED: "1_player_button_hover.png",
        MUTE_BUTTON: "mute_button.png",
        MUTE_BUTTON_HOVERED: "mute_button_hover.png",
        MUTE_BUTTON_PRESSED: "mute_button_pressed.png",
        MUTE_BUTTON_PRESSED_HOVERED: "mute_button_pressed_hover.png",
        EASY_BUTTON: "easy_button.png",
        EASY_BUTTON_HOVERED: "easy_button_hover.png",
        MEDIUM_BUTTON: "medium_button.png",
        MEDIUM_BUTTON_HOVERED: "medium_button_hover.png",
        HARD_BUTTON: "hard_button.png",
        HARD_BUTTON_HOVERED: "hard_button_hover.png",
        BACK_BUTTON: "back_button.png",
        BACK_BUTTON_HOVERED: "back_button_hover.png",
        CONTINUE_BUTTON: "continue_button.png",
        CONTINUE_BUTTON_HOVERED: "continue_button_hover.png",
        INSANE_BUTTON: "insane_button.png",
        INSANE_BUTTON_HOVERED: "insane_button_hover.png",
        ABOUT_BUTTON: "about_button.png",
        ABOUT_BUTTON_HOVERED: "about_button_hover.png",
        CONTROLS: "controls.png",
    },
    AUDIO_BASE_PATH: 'assets/sounds/',
    FRICTION: 0.0208,
    COLLISION_LOSS: 0.0208,
    CUSHION_WIDTH: 60,
    POCKET_RADIUS: 48,
    POCKETS_POSITIONS: [
        { x: 62, y: 62 },
        { x: 750, y: 32 },
        { x: 1435, y: 62 },
        { x: 62, y: 762 },
        { x: 750, y: 794 },
        { x: 1435, y: 762 },
    ],
    BALL_DIAMETER: 38,
    BALL_ORIGIN: { x: 25, y: 25 },
    BALL_MIN_VELOCITY_LENGTH: 0.05,
    STICK_ORIGIN: { x: 970, y: 11 },
    STICK_SHOT_ORIGIN: { x: 950, y: 11 },
    POWER_TO_ADD_PER_FRAME: 1,
    STICK_MOVEMENT_PER_FRAME: 2,
    STICK_MAX_POWER: 70,
    SHOOT_MOUSE_BUTTON: 0,
    INCREASE_SHOT_POWER_KEY: 87,
    DECREASE_SHOT_POWER_KEY: 83,
    TIMEOUT_TO_HIDE_STICK_AFTER_SHOT: 500,
    TIMOUT_TO_HIDE_BALL_AFTER_POCKET: 100,
};


/***/ }),

/***/ "./src/geom/Vector2.ts":
/*!*****************************!*\
  !*** ./src/geom/Vector2.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    get length() {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }
    static copy(vector) {
        return new Vector2(vector.x, vector.y);
    }
    addX(x) {
        return new Vector2(this._x, this._y).addToX(x);
    }
    addY(y) {
        return new Vector2(this._x, this._y).addToY(y);
    }
    addToX(x) {
        this._x += x;
        return this;
    }
    addToY(y) {
        this._y += y;
        return this;
    }
    addTo(vector) {
        return this.addToX(vector.x).addToY(vector.y);
    }
    add(vector) {
        return new Vector2(this._x, this._y).addTo(vector);
    }
    subtractTo(vector) {
        this._x -= vector.x;
        this._y -= vector.y;
        return this;
    }
    subtract(vector) {
        return new Vector2(this._x, this._y).subtractTo(vector);
    }
    mult(v) {
        return new Vector2(this._x, this._y).multBy(v);
    }
    multBy(v) {
        this._x *= v;
        this._y *= v;
        return this;
    }
    dot(vector) {
        return this._x * vector.x + this._y * vector.y;
    }
    distFrom(vector) {
        return this.subtract(vector).length;
    }
}
exports.Vector2 = Vector2;


/***/ }),

/***/ "./src/input/ButtonState.ts":
/*!**********************************!*\
  !*** ./src/input/ButtonState.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ButtonState {
    constructor() {
        this.down = false;
        this.pressed = false;
    }
}
exports.ButtonState = ButtonState;


/***/ }),

/***/ "./src/input/Keyboard.ts":
/*!*******************************!*\
  !*** ./src/input/Keyboard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ButtonState_1 = __webpack_require__(/*! ./ButtonState */ "./src/input/ButtonState.ts");
class Keyboard_Singleton {
    constructor() {
        this._keyStates = [];
        for (let i = 0; i < 256; i++) {
            this._keyStates[i] = new ButtonState_1.ButtonState();
        }
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }
    handleKeyUp(event) {
        this._keyStates[event.keyCode].down = false;
    }
    handleKeyDown(event) {
        this._keyStates[event.keyCode].pressed = false;
        this._keyStates[event.keyCode].down = true;
    }
    reset() {
        for (let i = 0; i < 256; i++) {
            this._keyStates[i].pressed = false;
        }
    }
    isDown(keyCode) {
        return this._keyStates[keyCode].down;
    }
    isPressed(keyCode) {
        return this._keyStates[keyCode].pressed;
    }
}
exports.Keyboard = new Keyboard_Singleton();


/***/ }),

/***/ "./src/input/Mouse.ts":
/*!****************************!*\
  !*** ./src/input/Mouse.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ButtonState_1 = __webpack_require__(/*! ./ButtonState */ "./src/input/ButtonState.ts");
const Canvas_1 = __webpack_require__(/*! ./../Canvas */ "./src/Canvas.ts");
const Vector2_1 = __webpack_require__(/*! ./../geom/Vector2 */ "./src/geom/Vector2.ts");
class Mouse_Singleton {
    constructor() {
        this._buttonStates = [];
        for (let i = 0; i < 3; i++) {
            this._buttonStates[i] = new ButtonState_1.ButtonState();
        }
        this._position = Vector2_1.Vector2.zero;
        document.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        document.addEventListener('mousedown', (event) => this.handleMouseDown(event));
        document.addEventListener('mouseup', (event) => this.handleMouseUp(event));
    }
    get posX() {
        return this._position.x;
    }
    get posY() {
        return this._position.y;
    }
    handleMouseMove(event) {
        const mouseX = (event.pageX - Canvas_1.Canvas2D.offsetX) / Canvas_1.Canvas2D.scaleX;
        const mouseY = (event.pageY - Canvas_1.Canvas2D.offsetY) / Canvas_1.Canvas2D.scaleY;
        this._position = new Vector2_1.Vector2(mouseX, mouseY);
    }
    handleMouseDown(event) {
        this._buttonStates[event.button].down = true;
        this._buttonStates[event.button].pressed = true;
    }
    handleMouseUp(event) {
        this._buttonStates[event.button].down = false;
    }
    reset() {
        for (let i = 0; i < 3; i++) {
            this._buttonStates[i].pressed = false;
        }
    }
    isDown(button) {
        return this._buttonStates[button].down;
    }
    isPressed(button) {
        return this._buttonStates[button].pressed;
    }
}
exports.Mouse = new Mouse_Singleton();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fzc2V0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ29sb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtb2JqZWN0cy9CYWxsLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLW9iamVjdHMvR2FtZVdvcmxkLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLW9iamVjdHMvU3RpY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL1ZlY3RvcjIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lucHV0L0J1dHRvblN0YXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnB1dC9LZXlib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5wdXQvTW91c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7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LFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUcsYUFBYSxJQUFJLHlCQUFXLENBQUMsVUFBVSxHQUFHLHlCQUFXLENBQUMsYUFBYSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlCQUFXLENBQUMsVUFBVSxHQUFHLHlCQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUcsY0FBYyxJQUFJLHlCQUFXLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsYUFBYSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlCQUFXLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzNHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7SUFFTSxlQUFlLENBQUMsSUFBVTtRQUU3QixJQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDaEMsT0FBTztTQUNWO1FBRUQsTUFBTSxDQUFDLEdBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNELE1BQU0sSUFBSSxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFOUIsSUFBRyxJQUFJLEdBQUcseUJBQVcsQ0FBQyxhQUFhLEVBQUM7WUFDaEMsT0FBTztTQUNWO1FBRUQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLHlCQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV0RCxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsTUFBTSxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsTUFBTSxHQUFHLEdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUMsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdB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QUNsRCxDQUFDO0lBRU0sS0FBSztRQUNSLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUc7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFjO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBRVksYUFBSyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvR2FtZS50c1wiKTtcbiIsImltcG9ydCB7IEdBTUVfQ09ORklHIH0gZnJvbSAnLi9nYW1lLmNvbmZpZyc7XG5cbmNsYXNzIEFzc2V0c19TaW5nbGV0b24ge1xuXG4gICAgc3ByaXRlczogTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbWFnZUVsZW1lbnQ+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGxvYWRHYW1lQXNzZXRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRHYW1lU3ByaXRlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTcHJpdGUoa2V5OiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50e1xuICAgICAgICByZXR1cm4gdGhpcy5zcHJpdGVzLmdldChrZXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZFNwcml0ZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5zZXQocGF0aCwgaW1nKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IEdBTUVfQ09ORklHLlNQUklURVNfQkFTRV9QQVRIICsgcGF0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgYXN5bmMgbG9hZEdhbWVTcHJpdGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsb2FkUHJvbWlzZXMgPSBPYmplY3QudmFsdWVzKEdBTUVfQ09ORklHLlNQUklURVMpLm1hcCh0aGlzLmxvYWRTcHJpdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZFByb21pc2VzKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IEFzc2V0cyA9IG5ldyBBc3NldHNfU2luZ2xldG9uKCk7IiwiaW1wb3J0IHsgR0FNRV9DT05GSUcgfSBmcm9tICcuL2dhbWUuY29uZmlnJztcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tICcuL2dlb20vVmVjdG9yMic7XG5cbmNsYXNzIENhbnZhczJEX1NpbmdsZXRvbiB7XG5cblxuICAgIHByaXZhdGUgX2NhbnZhc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY29udGV4dCA6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9kcGk6IG51bWJlcjtcbiAgICBwcml2YXRlIF9zY2FsZTogVmVjdG9yMjtcbiAgICBwcml2YXRlIF9vZmZzZXQ6IFZlY3RvcjI7XG5cbiAgICBwdWJsaWMgZ2V0IHNjYWxlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlLng7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzY2FsZVkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZS55O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldC54O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb2Zmc2V0WSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldC55O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IoY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQsIGNhbnZhc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzQ29udGFpbmVyID0gY2FudmFzQ29udGFpbmVyO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyByZXNpemVDYW52YXMoKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvcmlnaW5hbENhbnZhc1dpZHRoID0gR0FNRV9DT05GSUcuR0FNRV9XSURUSDtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDYW52YXNIZWlnaHQgPSBHQU1FX0NPTkZJRy5HQU1FX0hFSUdIVDtcbiAgICAgICAgY29uc3Qgd2lkdGhUb0hlaWdodDogbnVtYmVyID0gb3JpZ2luYWxDYW52YXNXaWR0aCAvIG9yaWdpbmFsQ2FudmFzSGVpZ2h0O1xuXG4gICAgICAgIGxldCBuZXdIZWlnaHQ6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgbGV0IG5ld1dpZHRoOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICBcbiAgICAgICAgY29uc3QgbmV3V2lkdGhUb0hlaWdodDogbnVtYmVyID0gbmV3V2lkdGggLyBuZXdIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG5ld1dpZHRoVG9IZWlnaHQgPiB3aWR0aFRvSGVpZ2h0KSB7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IG5ld0hlaWdodCAqIHdpZHRoVG9IZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBuZXdXaWR0aCAvIHdpZHRoVG9IZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NhbnZhc0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5fY2FudmFzQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhc0NvbnRhaW5lci5zdHlsZS5tYXJnaW5Ub3AgPSAod2luZG93LmlubmVySGVpZ2h0IC0gbmV3SGVpZ2h0KSAvIDIgKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXNDb250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIG5ld1dpZHRoKSAvIDIgKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXNDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIG5ld0hlaWdodCkgLyAyICsgJ3B4JztcbiAgICAgICAgdGhpcy5fY2FudmFzQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gbmV3V2lkdGgpIC8gMiArICdweCc7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gbmV3IFZlY3RvcjIobmV3V2lkdGggLyBvcmlnaW5hbENhbnZhc1dpZHRoLCBuZXdIZWlnaHQgLyBvcmlnaW5hbENhbnZhc0hlaWdodCk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY2FudmFzLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFZlY3RvcjIodGhpcy5fY2FudmFzLm9mZnNldExlZnQsIHRoaXMuX2NhbnZhcy5vZmZzZXRUb3ApO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIHB1YmxpYyBjbGVhcigpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdJbWFnZShcbiAgICAgICAgICAgIHNwcml0ZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBWZWN0b3IyID0gVmVjdG9yMi56ZXJvLCBcbiAgICAgICAgICAgIHJvdGF0aW9uOiBudW1iZXIgPSAwLCBcbiAgICAgICAgICAgIG9yaWdpbjogVmVjdG9yMiA9IFZlY3RvcjIuemVyb1xuICAgICAgICApIHsgICAgXG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNjYWxlKHRoaXMuX3NjYWxlLngsIHRoaXMuX3NjYWxlLnkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZShwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yb3RhdGUocm90YXRpb24pO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmRyYXdJbWFnZShzcHJpdGUsIDAsIDAsIHNwcml0ZS53aWR0aCwgc3ByaXRlLmhlaWdodCwgLW9yaWdpbi54LCAtb3JpZ2luLnksIHNwcml0ZS53aWR0aCwgc3ByaXRlLmhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGRyYXdUZXh0KHRleHQ6IHN0cmluZywgZm9udDpzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIHBvc2l0aW9uOiBWZWN0b3IyLCB0ZXh0QWxpZ246IHN0cmluZyA9ICdsZWZ0Jyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5mb250ID0gZm9udDtcbiAgICAgICAgdGhpcy5fY29udGV4dC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ24gYXMgQ2FudmFzVGV4dEFsaWduO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxUZXh0KHRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmNvbnN0IGNhbnZhcyA6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udGFpbmVyIDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUFyZWEnKSBhcyBIVE1MRWxlbWVudDtcbmV4cG9ydCBjb25zdCBDYW52YXMyRCA9IG5ldyBDYW52YXMyRF9TaW5nbGV0b24oY2FudmFzLCBjb250YWluZXIpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgQ2FudmFzMkQucmVzaXplQ2FudmFzLmJpbmQoQ2FudmFzMkQpKTtcbiIsImltcG9ydCB7IEFzc2V0cyB9IGZyb20gJy4vQXNzZXRzJztcbmltcG9ydCB7IEdhbWVXb3JsZCB9IGZyb20gJy4vZ2FtZS1vYmplY3RzL0dhbWVXb3JsZCc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vaW5wdXQvS2V5Ym9hcmQnO1xuaW1wb3J0IHsgQ2FudmFzMkQgfSBmcm9tICcuL0NhbnZhcyc7XG5pbXBvcnQgeyBNb3VzZSB9IGZyb20gJy4vaW5wdXQvTW91c2UnO1xuXG5sZXQgcG9vbEdhbWU6IEdhbWVXb3JsZDtcblxuYXN5bmMgZnVuY3Rpb24gaW5pdEdhbWUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgQXNzZXRzLmxvYWRHYW1lQXNzZXRzKCk7XG5cbiAgICBwb29sR2FtZSA9IG5ldyBHYW1lV29ybGQoKTtcbiAgICBnYW1lTG9vcCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKTogdm9pZCB7XG4gICAgcG9vbEdhbWUudXBkYXRlKCk7XG4gICAgS2V5Ym9hcmQucmVzZXQoKTtcbiAgICBNb3VzZS5yZXNldCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3KCk6IHZvaWQge1xuICAgIENhbnZhczJELmNsZWFyKCk7XG4gICAgcG9vbEdhbWUuZHJhdygpO1xufVxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpOiB2b2lkIHtcbiAgICB1cGRhdGUoKTtcbiAgICBkcmF3KCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbn1cblxuaW5pdEdhbWUoKTsiLCJcbmV4cG9ydCBlbnVtIENvbG9yIHtcbiAgICB3aGl0ZSA9IDAsXG4gICAgYmxhY2sgPSAxLFxuICAgIHJlZCA9IDIsXG4gICAgeWVsbG93ID0gM1xufSIsImltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tICcuL0dhbWVPYmplY3QnO1xuaW1wb3J0IHsgR0FNRV9DT05GSUcgfSBmcm9tICcuLy4uL2dhbWUuY29uZmlnJztcbmltcG9ydCB7IENhbnZhczJEIH0gZnJvbSAnLi8uLi9DYW52YXMnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLy4uL2NvbW1vbi9Db2xvcic7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnLi8uLi9nZW9tL1ZlY3RvcjInO1xuaW1wb3J0IHsgQXNzZXRzIH0gZnJvbSAnLi4vQXNzZXRzJztcblxuZXhwb3J0IGNsYXNzIEJhbGwgaW1wbGVtZW50cyBHYW1lT2JqZWN0IHtcblxuICAgIHByaXZhdGUgX3Nwcml0ZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwcml2YXRlIF92ZWxvY2l0eTogVmVjdG9yMiA9IFZlY3RvcjIuemVybztcbiAgICBwcml2YXRlIF9tb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgcHJvdGVjdGVkIGdldCB2ZWxvY2l0eSgpOiBWZWN0b3IyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXQgdmVsb2NpdHkodmFsdWU6IFZlY3RvcjIpIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IFZlY3RvcjIge1xuICAgICAgICByZXR1cm4gVmVjdG9yMi5jb3B5KHRoaXMuX3Bvc2l0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldCBwb3NpdGlvbih2YWx1ZTogVmVjdG9yMikge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbW92aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW92aW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IyLCBjb2xvcjogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlU3ByaXRlKGNvbG9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc29sdmVTcHJpdGUoY29sb3I6IENvbG9yKSB7XG4gICAgICAgIHN3aXRjaChjb2xvcikge1xuICAgICAgICAgICAgY2FzZSBDb2xvci53aGl0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSBBc3NldHMuZ2V0U3ByaXRlKEdBTUVfQ09ORklHLlNQUklURVMuQ1VFX0JBTEwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIENvbG9yLmJsYWNrOlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZSA9IEFzc2V0cy5nZXRTcHJpdGUoR0FNRV9DT05GSUcuU1BSSVRFUy5CTEFDS19CQUxMKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBDb2xvci5yZWQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlID0gQXNzZXRzLmdldFNwcml0ZShHQU1FX0NPTkZJRy5TUFJJVEVTLlJFRF9CQUxMKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBDb2xvci55ZWxsb3c6XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlID0gQXNzZXRzLmdldFNwcml0ZShHQU1FX0NPTkZJRy5TUFJJVEVTLllFTExPV19CQUxMKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQmFsbEluUG9ja2V0KCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGluUG9ja2V0OiBib29sZWFuID0gR0FNRV9DT05GSUcuUE9DS0VUU19QT1NJVElPTlNcbiAgICAgICAgICAgIC5zb21lKChwb2NrZXRQb3M6IFZlY3RvcjIpID0+IHRoaXMuX3Bvc2l0aW9uLmRpc3RGcm9tKHBvY2tldFBvcykgPD0gR0FNRV9DT05GSUcuUE9DS0VUX1JBRElVUyk7XG5cbiAgICAgICAgaWYoaW5Qb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0gVmVjdG9yMi56ZXJvO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgR0FNRV9DT05GSUcuVElNT1VUX1RPX0hJREVfQkFMTF9BRlRFUl9QT0NLRVQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ29sbGlzaW9uV2l0aEN1c2hpb24oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgYmFsbFJhZGl1czogbnVtYmVyID0gR0FNRV9DT05GSUcuQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIGNvbnN0IHRvcEJhbGxFZGdlOiBudW1iZXIgPSB0aGlzLnBvc2l0aW9uLnkgLSBiYWxsUmFkaXVzO1xuICAgICAgICBjb25zdCBsZWZ0QmFsbEVkZ2U6IG51bWJlciA9IHRoaXMucG9zaXRpb24ueCAtIGJhbGxSYWRpdXM7XG4gICAgICAgIGNvbnN0IHJpZ2h0QmFsbEVkZ2U6IG51bWJlciA9IHRoaXMucG9zaXRpb24ueCArIGJhbGxSYWRpdXM7XG4gICAgICAgIGNvbnN0IGJvdHRvbUJhbGxFZGdlOiBudW1iZXIgPSB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsUmFkaXVzO1xuXG4gICAgICAgIGlmKHRvcEJhbGxFZGdlIDw9IEdBTUVfQ09ORklHLkNVU0hJT05fV0lEVEgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uLmFkZFRvWShHQU1FX0NPTkZJRy5DVVNISU9OX1dJRFRIIC0gdGhpcy5fcG9zaXRpb24ueSArIGJhbGxSYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IyKHRoaXMudmVsb2NpdHkueCwgLXRoaXMudmVsb2NpdHkueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdEJhbGxFZGdlIDw9IEdBTUVfQ09ORklHLkNVU0hJT05fV0lEVEgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uLmFkZFRvWChHQU1FX0NPTkZJRy5DVVNISU9OX1dJRFRIIC0gdGhpcy5fcG9zaXRpb24ueCArIGJhbGxSYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IyKC10aGlzLnZlbG9jaXR5LngsIHRoaXMudmVsb2NpdHkueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocmlnaHRCYWxsRWRnZSA+PSBHQU1FX0NPTkZJRy5HQU1FX1dJRFRIIC0gR0FNRV9DT05GSUcuQ1VTSElPTl9XSURUSCkge1xuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb24uYWRkVG9YKEdBTUVfQ09ORklHLkdBTUVfV0lEVEggLSBHQU1FX0NPTkZJRy5DVVNISU9OX1dJRFRIIC0gdGhpcy5fcG9zaXRpb24ueCAtIGJhbGxSYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IyKC10aGlzLnZlbG9jaXR5LngsIHRoaXMudmVsb2NpdHkueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYm90dG9tQmFsbEVkZ2UgPj0gR0FNRV9DT05GSUcuR0FNRV9IRUlHSFQgLSBHQU1FX0NPTkZJRy5DVVNISU9OX1dJRFRIKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbi5hZGRUb1koR0FNRV9DT05GSUcuR0FNRV9IRUlHSFQgLSBHQU1FX0NPTkZJRy5DVVNISU9OX1dJRFRIIC0gdGhpcy5fcG9zaXRpb24ueSAtIGJhbGxSYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IyKHRoaXMudmVsb2NpdHkueCwgLXRoaXMudmVsb2NpdHkueSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29sbGlkZVdpdGhCYWxsKGJhbGw6IEJhbGwpOiB2b2lkIHtcblxuICAgICAgICBpZighdGhpcy5fdmlzaWJsZSB8fCAhYmFsbC5fdmlzaWJsZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgbjogVmVjdG9yMiA9IHRoaXMuX3Bvc2l0aW9uLnN1YnRyYWN0KGJhbGwuX3Bvc2l0aW9uKTtcbiAgICBcbiAgICAgICAgY29uc3QgZGlzdDogbnVtYmVyID0gbi5sZW5ndGg7XG4gICAgXG4gICAgICAgIGlmKGRpc3QgPiBHQU1FX0NPTkZJRy5CQUxMX0RJQU1FVEVSKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBtdGQgPSBuLm11bHQoKEdBTUVfQ09ORklHLkJBTExfRElBTUVURVIgLSBkaXN0KSAvIGRpc3QpO1xuICAgIFxuICAgICAgICB0aGlzLl9wb3NpdGlvbi5hZGRUbyhtdGQubXVsdCgwLjUpKTtcbiAgICAgICAgYmFsbC5wb3NpdGlvbiA9IGJhbGwucG9zaXRpb24uc3VidHJhY3QobXRkLm11bHQoMC41KSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHVuID0gbi5tdWx0KDEvbi5sZW5ndGgpO1xuICAgIFxuICAgICAgICBjb25zdCB1dCA9IG5ldyBWZWN0b3IyKC11bi55LCB1bi54KTtcbiAgICBcbiAgICAgICAgY29uc3QgdjFuOiBudW1iZXIgPSB1bi5kb3QodGhpcy5fdmVsb2NpdHkpO1xuICAgICAgICBjb25zdCB2MXQ6IG51bWJlciA9IHV0LmRvdCh0aGlzLl92ZWxvY2l0eSk7XG4gICAgICAgIGNvbnN0IHYybjogbnVtYmVyID0gdW4uZG90KGJhbGwudmVsb2NpdHkpO1xuICAgICAgICBjb25zdCB2MnQ6IG51bWJlciA9IHV0LmRvdChiYWxsLnZlbG9jaXR5KTtcbiAgICBcbiAgICAgICAgY29uc3QgdjFuVGFnOiBWZWN0b3IyID0gdW4ubXVsdCh2Mm4pO1xuICAgICAgICBjb25zdCB2MXRUYWc6IFZlY3RvcjIgPSB1dC5tdWx0KHYxdCk7XG4gICAgICAgIGNvbnN0IHYyblRhZzogVmVjdG9yMiA9IHVuLm11bHQodjFuKTtcbiAgICAgICAgY29uc3QgdjJ0VGFnOiBWZWN0b3IyID0gdXQubXVsdCh2MnQpO1xuICAgIFxuICAgICAgICB0aGlzLl92ZWxvY2l0eSA9IHYxblRhZy5hZGQodjF0VGFnKTtcbiAgICAgICAgYmFsbC52ZWxvY2l0eSA9IHYyblRhZy5hZGQodjJ0VGFnKTtcbiAgICBcbiAgICAgICAgdGhpcy5fbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgYmFsbC5fbW92aW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnZlbG9jaXR5Lm11bHRCeSgxIC0gR0FNRV9DT05GSUcuQ09MTElTSU9OX0xPU1MpO1xuICAgICAgICBiYWxsLnZlbG9jaXR5ID0gYmFsbC52ZWxvY2l0eS5tdWx0KDEgLSBHQU1FX0NPTkZJRy5DT0xMSVNJT05fTE9TUyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob290KHBvd2VyOiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHkgPSBuZXcgVmVjdG9yMihwb3dlciAqIE1hdGguY29zKGFuZ2xlKSwgcG93ZXIgKiBNYXRoLnNpbihhbmdsZSkpO1xuICAgICAgICB0aGlzLl9tb3ZpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuX21vdmluZykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVCYWxsSW5Qb2NrZXQoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29sbGlzaW9uV2l0aEN1c2hpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3ZlbG9jaXR5Lm11bHRCeSgxIC0gR0FNRV9DT05GSUcuRlJJQ1RJT04pO1xuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb24uYWRkVG8odGhpcy5fdmVsb2NpdHkpO1xuXG4gICAgICAgICAgICBpZih0aGlzLl92ZWxvY2l0eS5sZW5ndGggPCBHQU1FX0NPTkZJRy5CQUxMX01JTl9WRUxPQ0lUWV9MRU5HVEgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gVmVjdG9yMi56ZXJvO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuX3Zpc2libGUpe1xuICAgICAgICAgICAgQ2FudmFzMkQuZHJhd0ltYWdlKHRoaXMuX3Nwcml0ZSwgdGhpcy5fcG9zaXRpb24sIDAsIEdBTUVfQ09ORklHLkJBTExfT1JJR0lOKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBTdGljayB9IGZyb20gJy4vU3RpY2snO1xuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4vR2FtZU9iamVjdCc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJy4uL2NvbW1vbi9Db2xvcic7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnLi4vZ2VvbS9WZWN0b3IyJztcbmltcG9ydCB7IEdBTUVfQ09ORklHIH0gZnJvbSAnLi4vZ2FtZS5jb25maWcnO1xuaW1wb3J0IHsgQXNzZXRzIH0gZnJvbSAnLi4vQXNzZXRzJztcbmltcG9ydCB7IENhbnZhczJEIH0gZnJvbSAnLi4vQ2FudmFzJztcbmltcG9ydCB7IEJhbGwgfSBmcm9tICcuL0JhbGwnO1xuaW1wb3J0IHsgTW91c2UgfSBmcm9tICcuLi9pbnB1dC9Nb3VzZSc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lV29ybGQgaW1wbGVtZW50cyBHYW1lT2JqZWN0IHtcblxuICAgIF9zdGljazogU3RpY2s7XG4gICAgX3JlZEJhbGxzOiBCYWxsW107XG4gICAgX3llbGxvd0JhbGxzOiBCYWxsW107XG4gICAgX2N1ZUJhbGw6IEJhbGw7XG4gICAgXzhCYWxsOiBCYWxsO1xuICAgIF9iYWxsczogQmFsbFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3JlZEJhbGxzID0gR0FNRV9DT05GSUcuUkVEX0JBTExTX1BPU0lUSU9OU1xuICAgICAgICAgICAgLm1hcCgocG9zaXRpb246IFZlY3RvcjIpID0+IG5ldyBCYWxsKFZlY3RvcjIuY29weShwb3NpdGlvbiksIENvbG9yLnllbGxvdykpO1xuXG4gICAgICAgIHRoaXMuX3llbGxvd0JhbGxzID0gR0FNRV9DT05GSUcuWUVMTE9XX0JBTExTX1BPU0lUSU9OU1xuICAgICAgICAgICAgLm1hcCgocG9zaXRpb246IFZlY3RvcjIpID0+IG5ldyBCYWxsKFZlY3RvcjIuY29weShwb3NpdGlvbiksIENvbG9yLnJlZCkpO1xuXG4gICAgICAgIHRoaXMuX2N1ZUJhbGwgPSBuZXcgQmFsbChWZWN0b3IyLmNvcHkoR0FNRV9DT05GSUcuQ1VFX0JBTExfUE9TSVRJT04pLCBDb2xvci53aGl0ZSk7XG4gICAgICAgIHRoaXMuXzhCYWxsID0gbmV3IEJhbGwoVmVjdG9yMi5jb3B5KEdBTUVfQ09ORklHLkVJR0hUX0JBTExfUE9TSVRJT04pLCBDb2xvci5ibGFjayk7XG5cbiAgICAgICAgdGhpcy5fc3RpY2sgPSBuZXcgU3RpY2soVmVjdG9yMi5jb3B5KEdBTUVfQ09ORklHLkNVRV9CQUxMX1BPU0lUSU9OKSk7XG5cbiAgICAgICAgdGhpcy5fYmFsbHMgPSBbXG4gICAgICAgICAgICB0aGlzLl9jdWVCYWxsLCBcbiAgICAgICAgICAgIC4uLnRoaXMuX3JlZEJhbGxzLCBcbiAgICAgICAgICAgIC4uLiB0aGlzLl95ZWxsb3dCYWxscywgXG4gICAgICAgICAgICB0aGlzLl84QmFsbF0uc29ydCgoYTogQmFsbCwgYjogQmFsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24ueCAtIGIucG9zaXRpb24ueDtcbiAgICAgICAgfSk7O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2JhbGxzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob290Q3VlQmFsbCgpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5fc3RpY2sucG93ZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGljay5zaG9vdCgpO1xuICAgICAgICAgICAgdGhpcy5fY3VlQmFsbC5zaG9vdCh0aGlzLl9zdGljay5wb3dlciwgdGhpcy5fc3RpY2sucm90YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fc3RpY2subW92YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zdGljay5oaWRlKCksIEdBTUVfQ09ORklHLlRJTUVPVVRfVE9fSElERV9TVElDS19BRlRFUl9TSE9UKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlSW5wdXQoKTogdm9pZCB7XG4gICAgICAgIGlmIChNb3VzZS5pc1ByZXNzZWQoR0FNRV9DT05GSUcuU0hPT1RfTU9VU0VfQlVUVE9OKSkge1xuICAgICAgICAgICAgdGhpcy5zaG9vdEN1ZUJhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ29sbGlzaW9ucygpOiB2b2lkIHtcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCB0aGlzLl9iYWxscy5sZW5ndGggOyBpKysgKXsgXG4gICAgICAgICAgICBmb3IobGV0IGogPSBpKzEgOyBqIDwgdGhpcy5fYmFsbHMubGVuZ3RoIDsgaisrICl7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RCYWxsID0gdGhpcy5fYmFsbHNbaV07XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kQmFsbCA9IHRoaXMuX2JhbGxzW2pdO1xuICAgICAgICAgICAgICAgIGZpcnN0QmFsbC5jb2xsaWRlV2l0aEJhbGwoc2Vjb25kQmFsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBiYWxsc01vdmluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhbGxzLnNvbWUoYmFsbCA9PiBiYWxsLm1vdmluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBuZXh0VHVybigpIHtcbiAgICAgICAgdGhpcy5fc3RpY2sucmVsb2NhdGUodGhpcy5fY3VlQmFsbC5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oYW5kbGVDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXQoKTtcbiAgICAgICAgdGhpcy5fc3RpY2sudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX2JhbGxzLmZvckVhY2goKGJhbGw6IEJhbGwpID0+IGJhbGwudXBkYXRlKCkpO1xuXG4gICAgICAgIGlmKCF0aGlzLmJhbGxzTW92aW5nKCkgJiYgIXRoaXMuX3N0aWNrLnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3KCk6IHZvaWQge1xuICAgICAgICBDYW52YXMyRC5kcmF3SW1hZ2UoQXNzZXRzLmdldFNwcml0ZShHQU1FX0NPTkZJRy5TUFJJVEVTLlRBQkxFKSk7XG4gICAgICAgIHRoaXMuX3JlZEJhbGxzLmZvckVhY2goKGJhbGw6IEJhbGwpID0+IGJhbGwuZHJhdygpKTtcbiAgICAgICAgdGhpcy5feWVsbG93QmFsbHMuZm9yRWFjaCgoYmFsbDogQmFsbCkgPT4gYmFsbC5kcmF3KCkpO1xuICAgICAgICB0aGlzLl84QmFsbC5kcmF3KCk7XG4gICAgICAgIHRoaXMuX2N1ZUJhbGwuZHJhdygpO1xuICAgICAgICB0aGlzLl9zdGljay5kcmF3KCk7XG4gICAgfVxufSIsImltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi8uLi9pbnB1dC9LZXlib2FyZCc7XG5pbXBvcnQgeyBNb3VzZSB9IGZyb20gJy4vLi4vaW5wdXQvTW91c2UnO1xuaW1wb3J0IHsgR0FNRV9DT05GSUcgfSBmcm9tICcuLy4uL2dhbWUuY29uZmlnJztcbmltcG9ydCB7IEFzc2V0cyB9IGZyb20gJy4vLi4vQXNzZXRzJztcbmltcG9ydCB7IENhbnZhczJEIH0gZnJvbSAnLi8uLi9DYW52YXMnO1xuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gJy4vLi4vZ2VvbS9WZWN0b3IyJztcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tICcuL0dhbWVPYmplY3QnO1xuXG5leHBvcnQgY2xhc3MgU3RpY2sgaW1wbGVtZW50cyBHYW1lT2JqZWN0IHtcblxuICAgIHByaXZhdGUgX3Nwcml0ZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwcml2YXRlIF9yb3RhdGlvbjogbnVtYmVyO1xuICAgIHByaXZhdGUgX29yaWdpbjogVmVjdG9yMjtcbiAgICBwcml2YXRlIF9wb3dlcjogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHB1YmxpYyBnZXQgcm90YXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcG93ZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvd2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbW92YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tb3ZhYmxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yMikge1xuICAgICAgICB0aGlzLl9zcHJpdGUgPSBBc3NldHMuZ2V0U3ByaXRlKEdBTUVfQ09ORklHLlNQUklURVMuU1RJQ0spO1xuICAgICAgICB0aGlzLl9vcmlnaW4gPSBWZWN0b3IyLmNvcHkoR0FNRV9DT05GSUcuU1RJQ0tfT1JJR0lOKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluY3JlYXNlUG93ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Bvd2VyICs9IEdBTUVfQ09ORklHLlBPV0VSX1RPX0FERF9QRVJfRlJBTUU7XG4gICAgICAgIHRoaXMuX29yaWdpbi5hZGRUb1goR0FNRV9DT05GSUcuU1RJQ0tfTU9WRU1FTlRfUEVSX0ZSQU1FKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3JlYXNlUG93ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Bvd2VyIC09IEdBTUVfQ09ORklHLlBPV0VSX1RPX0FERF9QRVJfRlJBTUU7XG4gICAgICAgIHRoaXMuX29yaWdpbi5hZGRUb1goLUdBTUVfQ09ORklHLlNUSUNLX01PVkVNRU5UX1BFUl9GUkFNRSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgaXNMZXNzVGhhbk1heERpc3RhbmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG93ZXIgPD0gR0FNRV9DT05GSUcuU1RJQ0tfTUFYX1BPV0VSO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNNb3JlVGhhbk1pbkRpc3RhbmNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG93ZXIgPj0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZURpc3RhbmNlKCk6IHZvaWQge1xuXG4gICAgICAgIGlmIChLZXlib2FyZC5pc0Rvd24oR0FNRV9DT05GSUcuSU5DUkVBU0VfU0hPVF9QT1dFUl9LRVkpICYmIHRoaXMuaXNMZXNzVGhhbk1heERpc3RhbmNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VQb3dlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEtleWJvYXJkLmlzRG93bihHQU1FX0NPTkZJRy5ERUNSRUFTRV9TSE9UX1BPV0VSX0tFWSkgJiYgdGhpcy5pc01vcmVUaGFuTWluRGlzdGFuY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5kZWNyZWFzZVBvd2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVJvdGF0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvcHBvc2l0ZTogbnVtYmVyID0gTW91c2UucG9zWSAtIHRoaXMuX3Bvc2l0aW9uLnk7XG4gICAgICAgIGNvbnN0IGFkamFjZW50OiBudW1iZXIgPSBNb3VzZS5wb3NYIC0gdGhpcy5fcG9zaXRpb24ueDtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSBNYXRoLmF0YW4yKG9wcG9zaXRlLCBhZGphY2VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Bvd2VyID0gMDtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG9vdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb3JpZ2luID0gVmVjdG9yMi5jb3B5KEdBTUVfQ09ORklHLlNUSUNLX1NIT1RfT1JJR0lOKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zaXRpb246IFZlY3RvcjIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5fb3JpZ2luID0gVmVjdG9yMi5jb3B5KEdBTUVfQ09ORklHLlNUSUNLX09SSUdJTik7XG4gICAgICAgIHRoaXMuX21vdmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLl9tb3ZhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvdGF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3RhbmNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhdygpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgQ2FudmFzMkQuZHJhd0ltYWdlKHRoaXMuX3Nwcml0ZSwgdGhpcy5fcG9zaXRpb24sIHRoaXMuX3JvdGF0aW9uLCB0aGlzLl9vcmlnaW4pO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGNvbnN0IEdBTUVfQ09ORklHIDogYW55ID0ge1xuXG4gICAgR0FNRV9XSURUSDogMTUwMCxcbiAgICBHQU1FX0hFSUdIVDogODI1LFxuXG4gICAgUkVEX0JBTExTX1BPU0lUSU9OUzogW1xuICAgICAgICB7IHg6IDEwNTYsIHk6IDQzMyB9LFxuICAgICAgICB7IHg6IDEwOTAsIHk6IDM3NCB9LFxuICAgICAgICB7IHg6IDExMjYsIHk6IDM5MyB9LFxuICAgICAgICB7IHg6IDExMjYsIHk6IDQ3MiB9LFxuICAgICAgICB7IHg6IDExNjIsIHk6IDMzNSB9LFxuICAgICAgICB7IHg6IDExNjIsIHk6IDM3NCB9LFxuICAgICAgICB7IHg6IDExNjIsIHk6IDQ1MiB9LFxuICAgIF0sXG4gICAgWUVMTE9XX0JBTExTX1BPU0lUSU9OUzogW1xuICAgICAgICB7IHg6IDEwMjIsIHk6IDQxMyB9LFxuICAgICAgICB7IHg6IDEwNTYsIHk6IDM5MyB9LFxuICAgICAgICB7IHg6IDEwOTAsIHk6IDQ1MiB9LFxuICAgICAgICB7IHg6IDExMjYsIHk6IDM1NCB9LFxuICAgICAgICB7IHg6IDExMjYsIHk6IDQzMyB9LFxuICAgICAgICB7IHg6IDExNjIsIHk6IDQxMyB9LFxuICAgICAgICB7IHg6IDExNjIsIHk6IDQ5MSB9LFxuICAgIF0sXG4gICAgQ1VFX0JBTExfUE9TSVRJT046IHsgeDogNDEzLCB5OiA0MTMgfSxcbiAgICBFSUdIVF9CQUxMX1BPU0lUSU9OOiB7IHg6IDEwOTAsIHk6IDQxMyB9LFxuXG4gICAgU1BSSVRFU19CQVNFX1BBVEg6ICdhc3NldHMvc3ByaXRlcy8nLFxuICAgIFNQUklURVM6IHtcbiAgICAgICAgTUFJTl9NRU5VX0JBQ0tHUk9VTkQgOiBcIm1haW5fbWVudV9iYWNrZ3JvdW5kLnBuZ1wiLFxuICAgICAgICBUQUJMRSA6IFwic3ByX2JhY2tncm91bmQ0LnBuZ1wiLFxuICAgICAgICBDVUVfQkFMTCA6IFwic3ByX2JhbGwyLnBuZ1wiLFxuICAgICAgICBSRURfQkFMTCA6IFwic3ByX3JlZEJhbGwyLnBuZ1wiLFxuICAgICAgICBZRUxMT1dfQkFMTCA6IFwic3ByX3llbGxvd0JhbGwyLnBuZ1wiLFxuICAgICAgICBCTEFDS19CQUxMIDogXCJzcHJfYmxhY2tCYWxsMi5wbmdcIixcbiAgICAgICAgU1RJQ0sgOiBcInNwcl9zdGljay5wbmdcIixcbiAgICAgICAgVFdPX1BMQVlFUlNfQlVUVE9OIDogXCIyX3BsYXllcnNfYnV0dG9uLnBuZ1wiLFxuICAgICAgICBUV09fUExBWUVSU19CVVRUT05fSE9WRVJFRCA6IFwiMl9wbGF5ZXJzX2J1dHRvbl9ob3Zlci5wbmdcIixcbiAgICAgICAgT05FX1BMQVlFUl9CVVRUT04gOiBcIjFfcGxheWVyX2J1dHRvbi5wbmdcIixcbiAgICAgICAgT05FX1BMQVlFUl9CVVRUT05fSE9WRVJFRCA6IFwiMV9wbGF5ZXJfYnV0dG9uX2hvdmVyLnBuZ1wiLFxuICAgICAgICBNVVRFX0JVVFRPTiA6IFwibXV0ZV9idXR0b24ucG5nXCIsXG4gICAgICAgIE1VVEVfQlVUVE9OX0hPVkVSRUQgOiBcIm11dGVfYnV0dG9uX2hvdmVyLnBuZ1wiLFxuICAgICAgICBNVVRFX0JVVFRPTl9QUkVTU0VEIDogXCJtdXRlX2J1dHRvbl9wcmVzc2VkLnBuZ1wiLFxuICAgICAgICBNVVRFX0JVVFRPTl9QUkVTU0VEX0hPVkVSRUQgOiBcIm11dGVfYnV0dG9uX3ByZXNzZWRfaG92ZXIucG5nXCIsXG4gICAgICAgIEVBU1lfQlVUVE9OIDogXCJlYXN5X2J1dHRvbi5wbmdcIixcbiAgICAgICAgRUFTWV9CVVRUT05fSE9WRVJFRCA6IFwiZWFzeV9idXR0b25faG92ZXIucG5nXCIsXG4gICAgICAgIE1FRElVTV9CVVRUT04gOiBcIm1lZGl1bV9idXR0b24ucG5nXCIsXG4gICAgICAgIE1FRElVTV9CVVRUT05fSE9WRVJFRCA6IFwibWVkaXVtX2J1dHRvbl9ob3Zlci5wbmdcIixcbiAgICAgICAgSEFSRF9CVVRUT04gOiBcImhhcmRfYnV0dG9uLnBuZ1wiLFxuICAgICAgICBIQVJEX0JVVFRPTl9IT1ZFUkVEIDogXCJoYXJkX2J1dHRvbl9ob3Zlci5wbmdcIixcbiAgICAgICAgQkFDS19CVVRUT04gOiBcImJhY2tfYnV0dG9uLnBuZ1wiLFxuICAgICAgICBCQUNLX0JVVFRPTl9IT1ZFUkVEIDogXCJiYWNrX2J1dHRvbl9ob3Zlci5wbmdcIixcbiAgICAgICAgQ09OVElOVUVfQlVUVE9OIDogXCJjb250aW51ZV9idXR0b24ucG5nXCIsXG4gICAgICAgIENPTlRJTlVFX0JVVFRPTl9IT1ZFUkVEIDogXCJjb250aW51ZV9idXR0b25faG92ZXIucG5nXCIsXG4gICAgICAgIElOU0FORV9CVVRUT04gOiBcImluc2FuZV9idXR0b24ucG5nXCIsXG4gICAgICAgIElOU0FORV9CVVRUT05fSE9WRVJFRCA6IFwiaW5zYW5lX2J1dHRvbl9ob3Zlci5wbmdcIixcbiAgICAgICAgQUJPVVRfQlVUVE9OIDogXCJhYm91dF9idXR0b24ucG5nXCIsXG4gICAgICAgIEFCT1VUX0JVVFRPTl9IT1ZFUkVEIDogXCJhYm91dF9idXR0b25faG92ZXIucG5nXCIsXG4gICAgICAgIENPTlRST0xTIDogXCJjb250cm9scy5wbmdcIixcbiAgICB9LFxuICAgIEFVRElPX0JBU0VfUEFUSDogJ2Fzc2V0cy9zb3VuZHMvJyxcblxuICAgIEZSSUNUSU9OOiAwLjAyMDgsXG4gICAgQ09MTElTSU9OX0xPU1M6IDAuMDIwOCxcblxuICAgIENVU0hJT05fV0lEVEg6IDYwLFxuICAgIFBPQ0tFVF9SQURJVVM6IDQ4LFxuICAgIFBPQ0tFVFNfUE9TSVRJT05TOiBbXG4gICAgICAgIHsgeDogNjIsIHk6IDYyIH0sXG4gICAgICAgIHsgeDogNzUwLCB5OiAzMiB9LFxuICAgICAgICB7IHg6IDE0MzUsIHk6IDYyIH0sXG4gICAgICAgIHsgeDogNjIsIHk6IDc2MiB9LFxuICAgICAgICB7IHg6IDc1MCwgeTogNzk0IH0sXG4gICAgICAgIHsgeDogMTQzNSwgeTogNzYyIH0sXG4gICAgXSxcblxuICAgIEJBTExfRElBTUVURVI6IDM4LFxuICAgIEJBTExfT1JJR0lOOiB7IHg6IDI1LCB5OiAyNSB9LFxuICAgIEJBTExfTUlOX1ZFTE9DSVRZX0xFTkdUSDogMC4wNSxcblxuICAgIFNUSUNLX09SSUdJTjogeyB4OiA5NzAsIHk6IDExIH0sXG4gICAgU1RJQ0tfU0hPVF9PUklHSU46IHsgeDogOTUwLCB5OiAxMSB9LFxuICAgIFBPV0VSX1RPX0FERF9QRVJfRlJBTUU6IDEsXG4gICAgU1RJQ0tfTU9WRU1FTlRfUEVSX0ZSQU1FOiAyLFxuICAgIFNUSUNLX01BWF9QT1dFUjogNzAsXG5cbiAgICBTSE9PVF9NT1VTRV9CVVRUT046IDAsXG4gICAgSU5DUkVBU0VfU0hPVF9QT1dFUl9LRVk6IDg3LFxuICAgIERFQ1JFQVNFX1NIT1RfUE9XRVJfS0VZOiA4MyxcblxuICAgIFRJTUVPVVRfVE9fSElERV9TVElDS19BRlRFUl9TSE9UOiA1MDAsXG4gICAgVElNT1VUX1RPX0hJREVfQkFMTF9BRlRFUl9QT0NLRVQ6IDEwMCxcbn07IiwiXG5leHBvcnQgY2xhc3MgVmVjdG9yMiB7XG5cblxuICAgIHByaXZhdGUgX3g6IG51bWJlcjtcbiAgICBwcml2YXRlIF95OiBudW1iZXI7XG5cblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICB9XG5cblxuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgemVybygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKDAsIDApO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLl94LCAyKSArIE1hdGgucG93KHRoaXMuX3ksIDIpKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgY29weSh2ZWN0b3I6IFZlY3RvcjIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHZlY3Rvci54LCB2ZWN0b3IueSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFgoeDogbnVtYmVyKTogVmVjdG9yMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95KS5hZGRUb1goeCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFkoeTogbnVtYmVyKTogVmVjdG9yMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95KS5hZGRUb1koeSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFRvWCh4OiBudW1iZXIpOiBWZWN0b3IyIHtcbiAgICAgICAgdGhpcy5feCArPSB4O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkVG9ZKHk6IG51bWJlcik6IFZlY3RvcjIge1xuICAgICAgICB0aGlzLl95ICs9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRUbyh2ZWN0b3I6IFZlY3RvcjIpOiBWZWN0b3IyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVG9YKHZlY3Rvci54KS5hZGRUb1kodmVjdG9yLnkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGQodmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95KS5hZGRUbyh2ZWN0b3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdWJ0cmFjdFRvKHZlY3RvcjogVmVjdG9yMik6IFZlY3RvcjIge1xuICAgICAgICB0aGlzLl94IC09IHZlY3Rvci54O1xuICAgICAgICB0aGlzLl95IC09IHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3VidHJhY3QodmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95KS5zdWJ0cmFjdFRvKHZlY3Rvcik7XG4gICAgfVxuXG4gICAgcHVibGljIG11bHQodjogbnVtYmVyKTogVmVjdG9yMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95KS5tdWx0Qnkodik7XG4gICAgfVxuXG4gICAgcHVibGljIG11bHRCeSh2OiBudW1iZXIpOiBWZWN0b3IyIHtcbiAgICAgICAgdGhpcy5feCAqPSB2O1xuICAgICAgICB0aGlzLl95ICo9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb3QodmVjdG9yOiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiB2ZWN0b3IueCArIHRoaXMuX3kgKiB2ZWN0b3IueTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzdEZyb20odmVjdG9yOiBWZWN0b3IyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VidHJhY3QodmVjdG9yKS5sZW5ndGg7XG4gICAgfVxufSIsIlxuZXhwb3J0IGNsYXNzIEJ1dHRvblN0YXRlIHtcbiAgICBcbiAgICBwdWJsaWMgZG93biA9IGZhbHNlO1xuICAgIHB1YmxpYyBwcmVzc2VkID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBCdXR0b25TdGF0ZSB9IGZyb20gJy4vQnV0dG9uU3RhdGUnO1xuXG5jbGFzcyBLZXlib2FyZF9TaW5nbGV0b24ge1xuXG5cblxuICAgIF9rZXlTdGF0ZXMgOiBCdXR0b25TdGF0ZVtdID0gW107XG4gICAgXG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDI1NiA7IGkrKyApIHtcbiAgICAgICAgICAgIHRoaXMuX2tleVN0YXRlc1tpXSA9ICBuZXcgQnV0dG9uU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHRoaXMuaGFuZGxlS2V5VXAoZXZlbnQpKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4gdGhpcy5oYW5kbGVLZXlEb3duKGV2ZW50KSk7XG4gICAgfVxuXG5cblxuICAgIHByaXZhdGUgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fa2V5U3RhdGVzW2V2ZW50LmtleUNvZGVdLmRvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fa2V5U3RhdGVzW2V2ZW50LmtleUNvZGVdLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5U3RhdGVzW2V2ZW50LmtleUNvZGVdLmRvd24gPSB0cnVlO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgcmVzZXQoKSA6IHZvaWQge1xuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDI1NiA7IGkrKyApIHtcbiAgICAgICAgICAgIHRoaXMuX2tleVN0YXRlc1tpXS5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEb3duKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5U3RhdGVzW2tleUNvZGVdLmRvd247XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBpc1ByZXNzZWQoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXlTdGF0ZXNba2V5Q29kZV0ucHJlc3NlZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBLZXlib2FyZCA9IG5ldyBLZXlib2FyZF9TaW5nbGV0b24oKTsiLCJpbXBvcnQgeyBCdXR0b25TdGF0ZSB9IGZyb20gJy4vQnV0dG9uU3RhdGUnO1xuaW1wb3J0IHsgQ2FudmFzMkQgfSBmcm9tICcuLy4uL0NhbnZhcyc7XG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAnLi8uLi9nZW9tL1ZlY3RvcjInO1xuXG5jbGFzcyBNb3VzZV9TaW5nbGV0b24ge1xuXG4gICAgcHJpdmF0ZSBfYnV0dG9uU3RhdGVzOiBCdXR0b25TdGF0ZVtdID0gW107XG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvcjI7XG5cbiAgICBwdWJsaWMgZ2V0IHBvc1goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbi54O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcG9zWSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uLnk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAzIDsgaSArKyApIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvblN0YXRlc1tpXSA9IG5ldyBCdXR0b25TdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBWZWN0b3IyLnplcm87XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZU1vdXNlTW92ZShldmVudCkpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VVcChldmVudCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1vdXNlWDogbnVtYmVyID0gKGV2ZW50LnBhZ2VYIC0gQ2FudmFzMkQub2Zmc2V0WCkgLyBDYW52YXMyRC5zY2FsZVg7XG4gICAgICAgIGNvbnN0IG1vdXNlWTogbnVtYmVyID0gKGV2ZW50LnBhZ2VZIC0gQ2FudmFzMkQub2Zmc2V0WSkgLyBDYW52YXMyRC5zY2FsZVk7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gbmV3IFZlY3RvcjIobW91c2VYLCBtb3VzZVkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2J1dHRvblN0YXRlc1tldmVudC5idXR0b25dLmRvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9idXR0b25TdGF0ZXNbZXZlbnQuYnV0dG9uXS5wcmVzc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fYnV0dG9uU3RhdGVzW2V2ZW50LmJ1dHRvbl0uZG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpIDogdm9pZCB7XG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMyA7IGkrKyApIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvblN0YXRlc1tpXS5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEb3duKGJ1dHRvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25TdGF0ZXNbYnV0dG9uXS5kb3duO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgaXNQcmVzc2VkKGJ1dHRvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25TdGF0ZXNbYnV0dG9uXS5wcmVzc2VkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1vdXNlID0gbmV3IE1vdXNlX1NpbmdsZXRvbigpOyJdLCJzb3VyY2VSb290IjoiIn0=