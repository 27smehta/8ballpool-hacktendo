import { Ball } from './Ball';
import { Color } from "../common/Color";

export enum State {
    SHOOTING,
    MOVING,
    PLACING_BALL,
    GAME_OVER
}

export class State {
    public firstCollidedBallColor: Color;
    public pocketedBalls: Ball[] = [];
    public ballInHand = false;
    public isValid = false;
}