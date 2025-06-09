import { IInputConfig, IBallConfig, ITableConfig, IVector2, IPhysicsConfig, IAssetsConfig, ILabelsConfig, IMatchScoreConfig, IAIConfig } from './../game.config.type';
import { AI } from './../ai/ai-trainer';
import { mapRange } from '../common/helper';
import { Referee } from './referee';
import { Player } from './player';
import { Stick } from './stick';
import { Color } from '../common/color';
import { Vector2 } from '../geom/vector2';
import { GameConfig } from '../game.config';
import { Assets } from '../assets';
import { Canvas2D } from '../canvas';
import { Ball } from './ball';
import { Mouse } from '../input/mouse';
import { State } from './state';


const physicsConfig: IPhysicsConfig = GameConfig.physics;
const inputConfig: IInputConfig = GameConfig.input;
const ballConfig: IBallConfig = GameConfig.ball;
const tableConfig: ITableConfig = GameConfig.table;
const labelsConfig: ILabelsConfig = GameConfig.labels;
const matchScoreConfig: IMatchScoreConfig = GameConfig.matchScore;
const aiConfig: IAIConfig = GameConfig.ai;
const gameSize: IVector2 = GameConfig.gameSize;
const sprites: IAssetsConfig = GameConfig.sprites;
const sounds: IAssetsConfig = GameConfig.sounds;

export class GameWorld {


    private _stick: Stick;
    private _cueBall: Ball;
    private _8Ball: Ball;
    private _balls: Ball[];
    private _players: Player[] = [new Player(), new Player()];
    private _currentPlayerIndex = 0;
    private _turnState: State;
    private _referee: Referee;


    public get currentPlayer(): Player {
        return this._players[this._currentPlayerIndex];
    }

    public get nextPlayer(): Player {
        return this._players[(this._currentPlayerIndex + 1) % this._players.length];
    }

    public get balls(): Ball[] {
        return this._balls
    }

    public get isBallInHand(): boolean {
        return this._turnState.ballInHand;
    }

    public get isTurnValid(): boolean {
        return this._turnState.isValid;
    }

    public get isGameOver(): boolean {
        return this._referee.isGameOver(this.currentPlayer, this._cueBall, this._8Ball);
    }

    public get isBallsMoving(): boolean {
        return this._balls.some(ball => ball.moving);
    }

    public get numOfPocketedBallsOnTurn(): number {
        return this._turnState.pocketedBalls.length;
    }


    constructor() {
        this.initMatch();
    }


    private getBallsByColor(color: Color): Ball[] {
        return this._balls.filter((ball: Ball) => ball.color === color);
    }

    private handleInput(): void {
        if (AI.finishedSession && Mouse.isPressed(inputConfig.mouseShootButton)) {
            this.shootCueBall(this._stick.power, this._stick.rotation);
        }
    }

    private isBallPosOutsideTopBorder(position: Vector2): boolean {
        const topBallEdge: number = position.y - ballConfig.diameter / 2;
        return topBallEdge <= tableConfig.cushionWidth;
    }

    private isBallPosOutsideLeftBorder(position: Vector2): boolean {
        const leftBallEdge: number = position.x - ballConfig.diameter / 2;
        return leftBallEdge <= tableConfig.cushionWidth;
    }

    private isBallPosOutsideRightBorder(position: Vector2): boolean {
        const rightBallEdge: number = position.x + ballConfig.diameter / 2;
        return rightBallEdge >= gameSize.x - tableConfig.cushionWidth;
    }

    private isBallPosOutsideBottomBorder(position: Vector2): boolean {
        const bottomBallEdge: number = position.y + ballConfig.diameter / 2;
        return bottomBallEdge >= gameSize.y - tableConfig.cushionWidth;
    }

    private handleCollisionWithTopCushion(ball: Ball): void {
        ball.position = ball.position.addY(tableConfig.cushionWidth - ball.position.y + ballConfig.diameter / 2);
        ball.velocity = new Vector2(ball.velocity.x, -ball.velocity.y);
    }

    private handleCollisionWithLeftCushion(ball: Ball): void {
        ball.position = ball.position.addX(tableConfig.cushionWidth - ball.position.x + ballConfig.diameter / 2);
        ball.velocity = new Vector2(-ball.velocity.x, ball.velocity.y);
    }

    private handleCollisionWithRightCushion(ball: Ball): void {
        ball.position = ball.position.addX(gameSize.x - tableConfig.cushionWidth - ball.position.x - ballConfig.diameter / 2);
        ball.velocity = new Vector2(-ball.velocity.x, ball.velocity.y);
    }

    private handleCollisionWithBottomCushion(ball: Ball): void {
        ball.position = ball.position.addY(gameSize.y - tableConfig.cushionWidth - ball.position.y - ballConfig.diameter / 2);
        ball.velocity = new Vector2(ball.velocity.x, -ball.velocity.y);
    }

    private resolveBallCollisionWithCushion(ball: Ball): void {
        let collided: boolean = false;

        if(this.isBallPosOutsideTopBorder(ball.nextPosition)) {
            this.handleCollisionWithTopCushion(ball);
            collided = true;
        }
        if(this.isBallPosOutsideLeftBorder(ball.nextPosition)) {
            this.handleCollisionWithLeftCushion(ball);
            collided = true;
        }
        if(this.isBallPosOutsideRightBorder(ball.nextPosition)) {
            this.handleCollisionWithRightCushion(ball);
            collided = true;
        }
        if(this.isBallPosOutsideBottomBorder(ball.nextPosition)) {
            this.handleCollisionWithBottomCushion(ball);
            collided = true;
        }

        if(collided) {
            ball.velocity = ball.velocity.mult(1 - physicsConfig.collisionLoss);
        }
    }

    private resolveBallsCollision (first: Ball, second: Ball): boolean {
        if(!first.visible || !second.visible){
            return false;
        }
    
        const n: Vector2 = first.position.subtract(second.position);
        const dist: number = n.length;
    
        if(dist > ballConfig.diameter){
            return false;
        }
    
        const mtd = n.mult((ballConfig.diameter - dist) / dist);
    
        first.position = first.position.add(mtd.mult(0.5));
        second.position = second.position.subtract(mtd.mult(0.5));
    
        const un = n.mult(1/n.length);
        const ut = new Vector2(-un.y, un.x);
    
        const v1n: number = un.dot(first.velocity);
        const v1t: number = ut.dot(first.velocity);
        const v2n: number = un.dot(second.velocity);
        const v2t: number = ut.dot(second.velocity);
    
        const v1nTag: Vector2 = un.mult(v2n);
        const v1tTag: Vector2 = ut.mult(v1t);
        const v2nTag: Vector2 = un.mult(v1n);
        const v2tTag: Vector2 = ut.mult(v2t);
    
        first.velocity = v1nTag.add(v1tTag);
        second.velocity = v2nTag.add(v2tTag);
    
        first.velocity = first.velocity.mult(1 - physicsConfig.collisionLoss);
        second.velocity = second.velocity.mult(1 - physicsConfig.collisionLoss);
        
        return true;
    }

    private handleCollisions(): void {
        for(let i = 0 ; i < this._balls.length ; i++ ){ 
            this.resolveBallCollisionWithCushion(this._balls[i]);

            for(let j = i + 1 ; j < this._balls.length ; j++ ){
                const firstBall = this._balls[i];
                const secondBall = this._balls[j];
                const collided = this.resolveBallsCollision(firstBall, secondBall);
                
                if(collided){
                    const force: number = firstBall.velocity.length + secondBall.velocity.length
                    const volume: number = mapRange(force, 0, ballConfig.maxExpectedCollisionForce, 0, 1);
                    Assets.playSound(sounds.paths.ballsCollide, volume);

                    if(!this._turnState.firstCollidedBallColor) {
                        const color: Color = firstBall.color === Color.white ? secondBall.color : firstBall.color;
                        this._turnState.firstCollidedBallColor = color;
                    }
                }
            }
        }    
    }

    private isInsidePocket(position: Vector2): boolean {
        return tableConfig.pocketsPositions
            .some((pocketPos: IVector2) => position.distFrom(new Vector2(pocketPos.x, pocketPos.y)) <= tableConfig.pocketRadius);
    }

    private resolveBallInPocket(ball: Ball): void {
        if (this.isInsidePocket(ball.position)) {
            ball.hide();
        }
    }

    private isValidPlayerColor(color: Color): boolean {
        return color === Color.red || color === Color.yellow;
    }

    private handleBallsInPockets(): void {
        this._balls.forEach((ball: Ball) => {
            if(ball.visible) {
                this.resolveBallInPocket(ball);
                if(!ball.visible) {
                    this._turnState.pocketedBalls.push(ball);
                }
            }
        });
    }

    private handleBallInHand(): void {
        if(this._turnState.ballInHand) {
            if(Mouse.isPressed(inputConfig.mousePlaceBallButton)) {
                const position: Vector2 = Mouse.position;
                if(this.isValidPosToPlaceCueBall(position)) {
                    this.placeBallInHand(position);
                }
            }
        }
    }

    private handleGameOver(): void {
        if(this.isGameOver) {
            this._stick.hide();
            this._turnState.isValid = false;
        }
    }

    private nextTurn(): void {
        this._turnState = new State();
        this._stick.hide();

        if(this.isTurnValid) {
            this.currentPlayer.matchScore++;
        }
        else {
            this._turnState.ballInHand = true;
        }

        if(this.isGameOver) {
            if(this.currentPlayer.matchScore === 8) {
                this.currentPlayer.overallScore++;
            }
            else {
                this.nextPlayer.overallScore++;
            }
        }

        this._currentPlayerIndex = (this._currentPlayerIndex + 1) % this._players.length;
    }

    private drawCurrentPlayerLabel(): void {
        const label = labelsConfig.currentPlayer;
        Canvas2D.drawText(
            label.text + (this._currentPlayerIndex + 1),
            label.font,
            label.color,
            label.position,
            label.alignment
        );
    }

    private drawMatchScores(): void {
        this._players.forEach((player: Player, index: number) => {
            const position: Vector2 = new Vector2(matchScoreConfig.scoresPositions[index].x, matchScoreConfig.scoresPositions[index].y);
            Canvas2D.drawText(
                player.matchScore.toString(),
                '50px Impact',
                '#FFD700',
                position
            );
        });
    }

    private drawOverallScores(): void {
        this._players.forEach((player: Player, index: number) => {
            const label = labelsConfig.overalScores[index];
            Canvas2D.drawText(
                player.overallScore.toString(),
                label.font,
                label.color,
                label.position,
                label.alignment
            );
        });
    }

    private isInsideTableBoundaries(position: Vector2): boolean {
        return position.x > tableConfig.cushionWidth + ballConfig.diameter / 2 &&
               position.x < gameSize.x - tableConfig.cushionWidth - ballConfig.diameter / 2 &&
               position.y > tableConfig.cushionWidth + ballConfig.diameter / 2 &&
               position.y < gameSize.y - tableConfig.cushionWidth - ballConfig.diameter / 2;
    }

    private isAITurn(): boolean {
        return aiConfig.on && this._currentPlayerIndex === aiConfig.playerIndex;
    }

    //------Public Methods------//

    public initMatch(): void {
        this._stick = new Stick(Vector2.zero);
        this._cueBall = new Ball(new Vector2(GameConfig.cueBallPosition.x, GameConfig.cueBallPosition.y), Color.white);
        this._8Ball = new Ball(new Vector2(GameConfig.eightBallPosition.x, GameConfig.eightBallPosition.y), Color.black);
        this._balls = [
            this._cueBall,
            this._8Ball,
            ...GameConfig.redBallsPositions.map((position: IVector2) => new Ball(new Vector2(position.x, position.y), Color.red)),
            ...GameConfig.yellowBallsPositions.map((position: IVector2) => new Ball(new Vector2(position.x, position.y), Color.yellow))
        ];
        this._players.forEach((player: Player) => {
            player.matchScore = 0;
            player.color = null;
        });
        this._currentPlayerIndex = 0;
        this._turnState = new State();
        this._referee = new Referee();
    }

    public isValidPosToPlaceCueBall(position: Vector2): boolean {
        return this.isInsideTableBoundaries(position) &&
               !this._balls.some((ball: Ball) => 
                   ball.visible && ball.position.distFrom(position) < ballConfig.diameter
               );
    }

    public placeBallInHand(position: Vector2): void {
        this._cueBall.show(position);
        this._turnState.ballInHand = false;
    }

    public concludeTurn(): void {
        if(!this.isBallsMoving) {
            this._turnState.isValid = this._referee.isValidTurn(this.currentPlayer, this._turnState);
            this.nextTurn();
        }
    }

    public shootCueBall(power: number, rotation: number): void {
        if(!this.isBallInHand) {
            this._stick.shoot();
            this._cueBall.shoot(power, rotation);
        }
    }

    public update(): void {
        if(!this.isGameOver) {
            this.handleInput();
            this.handleBallInHand();
            this.handleCollisions();
            this.handleBallsInPockets();
            this.handleGameOver();

            this._balls.forEach((ball: Ball) => ball.update());
            this._stick.update();

            if(!this.isBallsMoving && !this.isBallInHand) {
                this.concludeTurn();
            }
        }
    }

    public draw(): void {
        Canvas2D.drawImage(Assets.getSprite(sprites.paths.table));
        this._balls.forEach((ball: Ball) => ball.draw());
        this._stick.draw();
        this.drawCurrentPlayerLabel();
        this.drawMatchScores();
        this.drawOverallScores();
    }
}