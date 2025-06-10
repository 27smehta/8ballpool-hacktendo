import { Canvas2D } from '../Canvas';
import { Assets } from '../Assets';
import { Vector2 } from '../geom/Vector2';

export class HomeScreen {
    private canvas: typeof Canvas2D;
    private assets: typeof Assets;
    private startButton: { x: number; y: number; width: number; height: number };

    constructor(canvas: typeof Canvas2D, assets: typeof Assets) {
        this.canvas = canvas;
        this.assets = assets;
        
        // Calculate button position and size
        const buttonWidth = 200;
        const buttonHeight = 60;
        this.startButton = {
            x: (window.innerWidth - buttonWidth) / 2,
            y: (window.innerHeight - buttonHeight) / 2,
            width: buttonWidth,
            height: buttonHeight
        };
    }

    public draw(): void {
        // Draw background
        this.canvas.clear();
        
        // Draw title
        this.canvas.drawText(
            '8 Ball Pool',
            '48px Arial',
            '#ffffff',
            new Vector2(window.innerWidth / 2, 150),
            'center'
        );

        // Draw start button
        this.canvas.drawRect(
            this.startButton.x,
            this.startButton.y,
            this.startButton.width,
            this.startButton.height,
            '#4CAF50'
        );
        
        // Draw button text
        this.canvas.drawText(
            'Start Game',
            '24px Arial',
            '#ffffff',
            new Vector2(window.innerWidth / 2, this.startButton.y + this.startButton.height / 2 + 8),
            'center'
        );
    }

    public handleClick(x: number, y: number): boolean {
        // Check if click is within start button bounds
        if (x >= this.startButton.x && 
            x <= this.startButton.x + this.startButton.width &&
            y >= this.startButton.y && 
            y <= this.startButton.y + this.startButton.height) {
            return true;
        }
        return false;
    }
} 