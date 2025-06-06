import { Mouse } from './../input/Mouse';
import { GAME_CONFIG } from './../game.config';
import { Assets } from './../Assets';
import { Canvas2D } from './../Canvas';
import { Vector2 } from './../geom/Vector2';
import { mapRange } from '../common/Helper';

export class Stick {
    private _sprite: HTMLImageElement = Assets.getSprite(GAME_CONFIG.SPRITES.STICK);
    private _rotation: number = 0;
    private _origin: Vector2 = Vector2.copy(GAME_CONFIG.STICK_ORIGIN);
    private _power: number = 0;
    private _movable: boolean = true;
    private _visible: boolean = true;
    private _isDragging: boolean = false;
    private _dragStartPosition: Vector2 = Vector2.zero;
    private _touchStartPosition: Vector2 = Vector2.zero;
    private _isTouching: boolean = false;

    public get position(): Vector2 {
        return Vector2.copy(this._position);
    }
    
    public get rotation(): number {
        return this._rotation;
    }

    public get power(): number {
        return this._power;
    }

    public set movable(value: boolean) {
        this._movable = value;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        this._visible = value;
    }

    constructor(private _position: Vector2) {
        this.setupTouchEvents();
    }

    private setupTouchEvents(): void {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        canvas.addEventListener('touchstart', (e: TouchEvent) => {
            e.preventDefault();
            if (!this._movable || !this._visible) return;
            
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left - Canvas2D.offsetX) / Canvas2D.scaleX;
            const y = (touch.clientY - rect.top - Canvas2D.offsetY) / Canvas2D.scaleY;
            
            this._isTouching = true;
            this._touchStartPosition = new Vector2(x, y);
        });

        canvas.addEventListener('touchmove', (e: TouchEvent) => {
            e.preventDefault();
            if (!this._isTouching) return;

            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left - Canvas2D.offsetX) / Canvas2D.scaleX;
            const y = (touch.clientY - rect.top - Canvas2D.offsetY) / Canvas2D.scaleY;
            
            const touchPosition = new Vector2(x, y);
            this.updateTouchPower(touchPosition);
            this.updateTouchRotation(touchPosition);
        });

        canvas.addEventListener('touchend', (e: TouchEvent) => {
            e.preventDefault();
            this._isTouching = false;
        });

        canvas.addEventListener('touchcancel', (e: TouchEvent) => {
            e.preventDefault();
            this._isTouching = false;
        });
    }

    private updateTouchPower(touchPosition: Vector2): void {
        const dragDistance = Math.sqrt(
            Math.pow(touchPosition.x - this._touchStartPosition.x, 2) + 
            Math.pow(touchPosition.y - this._touchStartPosition.y, 2)
        );
        const maxDragDistance = 200;
        this._power = Math.min(mapRange(dragDistance, 0, maxDragDistance, 0, GAME_CONFIG.STICK_MAX_POWER), GAME_CONFIG.STICK_MAX_POWER);
        
        this._origin = new Vector2(
            GAME_CONFIG.STICK_ORIGIN.x + (this._power / GAME_CONFIG.STICK_MAX_POWER) * 20,
            GAME_CONFIG.STICK_ORIGIN.y
        );
    }

    private updateTouchRotation(touchPosition: Vector2): void {
        const opposite: number = touchPosition.y - this._position.y;
        const adjacent: number = touchPosition.x - this._position.x;
        this._rotation = Math.atan2(opposite, adjacent) + Math.PI;
    }

    private updatePower(): void {
        if (Mouse.isDown(0)) {
            if (!this._isDragging) {
                this._isDragging = true;
                this._dragStartPosition = Vector2.copy(Mouse.position);
            }
            
            const dragDistance = Math.sqrt(
                Math.pow(Mouse.position.x - this._dragStartPosition.x, 2) + 
                Math.pow(Mouse.position.y - this._dragStartPosition.y, 2)
            );
            const maxDragDistance = 200;
            this._power = Math.min(mapRange(dragDistance, 0, maxDragDistance, 0, GAME_CONFIG.STICK_MAX_POWER), GAME_CONFIG.STICK_MAX_POWER);
        } else {
            this._isDragging = false;
            this._power = 0;
        }

        this._origin = new Vector2(
            GAME_CONFIG.STICK_ORIGIN.x + (this._power / GAME_CONFIG.STICK_MAX_POWER) * 20,
            GAME_CONFIG.STICK_ORIGIN.y
        );
    }

    private updateRotation(): void {
        if (!this._isTouching) {
            const opposite: number = Mouse.position.y - this._position.y;
            const adjacent: number = Mouse.position.x - this._position.x;
            this._rotation = Math.atan2(opposite, adjacent) + Math.PI;
        }
    }

    public hide(): void {
        this._power = 0;
        this._visible = false;
        this._movable = false;
        this._isDragging = false;
        this._isTouching = false;
    }

    public show(position: Vector2): void {
        this._position = position;
        this._origin = Vector2.copy(GAME_CONFIG.STICK_ORIGIN);
        this._movable = true;
        this._visible = true;
        this._isDragging = false;
        this._isTouching = false;
        this._power = 0;
    }

    public shoot(): void {
        this._origin = Vector2.copy(GAME_CONFIG.STICK_SHOT_ORIGIN);
        const volume: number = mapRange(this._power, 0, GAME_CONFIG.STICK_MAX_POWER, 0, 1);
        Assets.playSound(GAME_CONFIG.SOUNDS.STRIKE, volume);
    }

    public update(): void {
        if(this._movable) {
            this.updateRotation();
            this.updatePower();
        }
    }

    public draw(): void {
        if(this._visible) {
            Canvas2D.drawImage(this._sprite, this._position, this._rotation, this._origin);
        }
    }
}