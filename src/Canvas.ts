import { IVector2 } from './game.config.type';
import { GameConfig } from './game.config';
import { Vector2 } from './geom/vector2';

class Canvas2D_Singleton {

    //------Members------//

    private _canvasContainer: HTMLElement;
    private _canvas : HTMLCanvasElement;
    private _context : CanvasRenderingContext2D;
    private _scale: Vector2;
    private _offset: Vector2;

    //------Properties------//
    
    public get scaleX() {
        return this._scale.x;
    }

    public get scaleY() {
        return this._scale.y;
    }

    public get offsetX() {
        return this._offset.x;
    }

    public get offsetY() {
        return this._offset.y;
    }

    public get width() {
        return this._canvas.width;
    }

    public get height() {
        return this._canvas.height;
    }

    public get context() {
        return this._context;
    }

    public get canvas() {
        return this._canvas;
    }

    //------Constructor------//

    constructor() {
        const container = document.getElementById('canvasContainer');
        if (!container) {
            throw new Error('Canvas container element not found');
        }
        this._canvasContainer = container;

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas element not found');
        }
        this._canvas = canvas;

        const context = this._canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this._context = context;

        this._scale = new Vector2(1, 1);
        this._offset = new Vector2(0, 0);

        // Initialize canvas size
        this.resizeCanvas();
    }

    //------Public Methods------//

    public resizeCanvas(): void {
        
        const originalCanvasWidth = GameConfig.gameSize.x;
        const originalCanvasHeight = GameConfig.gameSize.y;
        const widthToHeight: number = originalCanvasWidth / originalCanvasHeight;

        let newHeight: number = window.innerHeight;
        let newWidth: number = window.innerWidth;
       
        const newWidthToHeight: number = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }
        
        this._canvasContainer.style.width = newWidth + 'px';
        this._canvasContainer.style.height = newHeight + 'px';
        this._canvasContainer.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
        this._canvasContainer.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
        this._canvasContainer.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
        this._scale = new Vector2(newWidth / originalCanvasWidth, newHeight / originalCanvasHeight);

        this._canvas.width = newWidth;
        this._canvas.height = newHeight;
        
        if (this._canvas.offsetParent) {
            this._offset = new Vector2(this._canvas.offsetLeft, this._canvas.offsetTop);
        }
    }


    public clear() : void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawImage(
            sprite: HTMLImageElement,
            position: IVector2 = { x: 0, y: 0 }, 
            rotation: number = 0, 
            origin: IVector2 = { x: 0, y: 0 }
        ) {    
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.translate(position.x, position.y);
        this._context.rotate(rotation);
        this._context.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
        this._context.restore();
    }


    public drawText(text: string, font:string, color: string, position: IVector2, textAlign: string = 'left'): void {
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.fillStyle = color;
        this._context.font = font;
        this._context.textAlign = textAlign as CanvasTextAlign;
        this._context.fillText(text, position.x, position.y);
        this._context.restore();
    }

    public changeCursor(cursor: string): void {
        this._canvas.style.cursor = cursor;
    }
}

export const Canvas2D = new Canvas2D_Singleton();

window.addEventListener('resize', () => Canvas2D.resizeCanvas());
