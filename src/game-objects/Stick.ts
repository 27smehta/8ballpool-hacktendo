import { Vector2 } from '../geom/Vector2';
import { GAME_CONFIG } from '../game.config';
import { Mouse } from '../input/Mouse';
import { Canvas2D } from '../Canvas';
import { Assets } from '../Assets';

export class Stick {
    private _rotation: number;
    private _power: number;
    private _origin: Vector2;
    private _visible: boolean;
    private _isDragging: boolean;
    private _dragStart: Vector2;
    private _isTouchDragging: boolean;
    private _touchStart: Vector2;
    private _touchId: number;

    constructor() {
        this._rotation = 0;
        this._power = 0;
        this._origin = GAME_CONFIG.STICK_ORIGIN;
        this._visible = false;
        this._isDragging = false;
        this._dragStart = Vector2.zero;
        this._isTouchDragging = false;
        this._touchStart = Vector2.zero;
        this._touchId = -1;
    }

    public get rotation(): number {
        return this._rotation;
    }

    public get power(): number {
        return this._power;
    }

    public get origin(): Vector2 {
        return this._origin;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public show(): void {
        this._visible = true;
        this._power = 0;
    }

    public hide(): void {
        this._visible = false;
        this._power = 0;
    }

    public update(): void {
        if (!this._visible) return;

        if (this._isTouchDragging) {
            this.updateTouchPower();
        } else if (this._isDragging) {
            this.updatePower();
        } else {
            this.updateRotation();
        }
    }

    private updateTouchPower(): void {
        const touch = this.getActiveTouch();
        if (!touch) {
            this._isTouchDragging = false;
            this._power = 0;
            return;
        }

        const currentPos = new Vector2(touch.clientX, touch.clientY);
        const dragVector = currentPos.subtract(this._touchStart);
        const dragDistance = dragVector.length;
        this._power = Math.min(dragDistance / 2, GAME_CONFIG.STICK_MAX_POWER);
    }

    private updatePower(): void {
        if (!Mouse.isDown(GAME_CONFIG.SELECT_MOUSE_BUTTON)) {
            this._isDragging = false;
            this._power = 0;
            return;
        }

        const currentPos = Mouse.position;
        const dragVector = currentPos.subtract(this._dragStart);
        const dragDistance = dragVector.length;
        this._power = Math.min(dragDistance / 2, GAME_CONFIG.STICK_MAX_POWER);
    }

    private updateRotation(): void {
        if (Mouse.isPressed(GAME_CONFIG.SELECT_MOUSE_BUTTON)) {
            this._isDragging = true;
            this._dragStart = Mouse.position;
            return;
        }

        const mousePos = Mouse.position;
        const direction = mousePos.subtract(this._origin);
        this._rotation = Math.atan2(direction.y, direction.x) + Math.PI;
    }

    private getActiveTouch(): Touch | null {
        const touches = Array.from(document.touches);
        return touches.find(touch => touch.identifier === this._touchId) || null;
    }

    public handleTouchStart(touch: Touch): void {
        if (this._isTouchDragging) return;

        const touchPos = new Vector2(touch.clientX, touch.clientY);
        const direction = touchPos.subtract(this._origin);
        this._rotation = Math.atan2(direction.y, direction.x) + Math.PI;

        this._isTouchDragging = true;
        this._touchStart = touchPos;
        this._touchId = touch.identifier;
    }

    public handleTouchEnd(touch: Touch): void {
        if (touch.identifier === this._touchId) {
            this._isTouchDragging = false;
            this._power = 0;
            this._touchId = -1;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this._visible) return;

        const stick = Assets.getSprite('STICK');
        if (!stick) return;

        ctx.save();
        ctx.translate(this._origin.x, this._origin.y);
        ctx.rotate(this._rotation);
        ctx.translate(-this._power, 0);
        ctx.drawImage(stick, -stick.width / 2, -stick.height / 2);
        ctx.restore();
    }
}