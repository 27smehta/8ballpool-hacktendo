import { Canvas2D } from './../Canvas';
import { Vector2 } from './../geom/Vector2';
import { Mouse } from '../input/Mouse';
import { GAME_CONFIG } from '../game.config';

export class MenuLabel {
    private _hovered: boolean = false;
    private _width: number = 0;
    private _height: number = 30;

    constructor(
        private _text: string,
        private _position: Vector2,
        private _font: string,
        private _color: string,
        private _alignment: CanvasTextAlign,
        private _onClick?: () => void
    ) {
        this._width = this._text.length * 15; // Approximate width based on text length
    }

    private isInsideLabel(position: Vector2): boolean {
        return position.x > this._position.x &&
               position.x < this._position.x + this._width &&
               position.y > this._position.y - this._height &&
               position.y < this._position.y;
    }

    public update(): void {
        if (this._onClick) {
            this._hovered = this.isInsideLabel(Mouse.position);
            if (this._hovered && Mouse.isPressed(GAME_CONFIG.SELECT_MOUSE_BUTTON)) {
                this._onClick();
            }
        }
    }

    public draw(): void {
        const color = this._hovered ? '#1a8c4a' : this._color;
        Canvas2D.drawText(
            this._text,
            this._font,
            color,
            this._position,
            this._alignment
        );
    }
} 