import { IVector2 } from './game.config.type';
import { GameConfig } from './game.config';
import { Vector2 } from './geom/vector2';

class Canvas2D_Singleton {
    //------Members------//
    private static _instance: Canvas2D_Singleton | null = null;
    private _canvasContainer: HTMLElement | null = null;
    private _canvas: HTMLCanvasElement | null = null;
    private _context: CanvasRenderingContext2D | null = null;
    private _scale: Vector2 = new Vector2(1, 1);
    private _offset: Vector2 = new Vector2(0, 0);
    private _initialized: boolean = false;

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
        return this._canvas?.width ?? 0;
    }

    public get height() {
        return this._canvas?.height ?? 0;
    }

    public get context() {
        if (!this._context) {
            throw new Error('Canvas context not initialized');
        }
        return this._context;
    }

    public get canvas() {
        if (!this._canvas) {
            throw new Error('Canvas not initialized');
        }
        return this._canvas;
    }

    //------Constructor------//
    private constructor() {}

    //------Public Methods------//
    public static getInstance(): Canvas2D_Singleton {
        if (!Canvas2D_Singleton._instance) {
            Canvas2D_Singleton._instance = new Canvas2D_Singleton();
        }
        return Canvas2D_Singleton._instance;
    }

    public async initialize(): Promise<void> {
        if (this._initialized) return;

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
        this._initialized = true;
    }

    public resizeCanvas(): void {
        if (!this._canvasContainer || !this._canvas) return;

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

    public clear(): void {
        if (!this._context || !this._canvas) return;
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawImage(
        sprite: HTMLImageElement,
        position: IVector2 = { x: 0, y: 0 }, 
        rotation: number = 0, 
        origin: IVector2 = { x: 0, y: 0 }
    ) {    
        if (!this._context) return;
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.translate(position.x, position.y);
        this._context.rotate(rotation);
        this._context.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
        this._context.restore();
    }

    public drawText(text: string, font: string, color: string, position: IVector2, textAlign: string = 'left'): void {
        if (!this._context) return;
        this._context.save();
        this._context.scale(this._scale.x, this._scale.y);
        this._context.fillStyle = color;
        this._context.font = font;
        this._context.textAlign = textAlign as CanvasTextAlign;
        this._context.fillText(text, position.x, position.y);
        this._context.restore();
    }

    public changeCursor(cursor: string): void {
        if (!this._canvas) return;
        this._canvas.style.cursor = cursor;
    }
}

// Create and export the singleton instance
export const Canvas2D = Canvas2D_Singleton.getInstance();

// Add resize event listener
window.addEventListener('resize', () => Canvas2D.resizeCanvas());
