import { Vector2 } from '../geom/Vector2';
import { GAME_CONFIG } from '../game.config';
import { Assets } from '../Assets';
import { Canvas2D } from '../Canvas';
import { Mouse } from '../input/mouse';

export class Stick {
    private _position: Vector2;
    private _rotation: number;
    private _power: number;
    private _visible: boolean;
    private _movable: boolean;

    constructor() {
        this._position = new Vector2(0, 0);
        this._rotation = 0;
        this._power = 0;
        this._visible = true;
        this._movable = true;
    }

    public update(): void {
        if (this._movable) {
            this._position = Mouse.position;
            this._rotation = Math.atan2(Mouse.position.y - this._position.y, Mouse.position.x - this._position.x);
        }
    }

    public draw(): void {
        if (this._visible) {
            Canvas2D.drawImage(Assets.getSprite(GAME_CONFIG.SPRITES.STICK as keyof typeof GAME_CONFIG.SPRITES), this._position, this._rotation, GAME_CONFIG.STICK_ORIGIN);
        }
    }

    public shoot(): void {
        this._power = GAME_CONFIG.STICK_MAX_POWER;
        this._movable = false;
    }

    public get movable(): boolean {
        return this._movable;
    }

    public set visible(value: boolean) {
        this._visible = value;
    }
}