import { Game } from './Game';

class GameInitializer {
    private static _instance: GameInitializer | null = null;
    private _initialized: boolean = false;
    private _game: Game | null = null;

    private constructor() {}

    public static getInstance(): GameInitializer {
        if (!GameInitializer._instance) {
            GameInitializer._instance = new GameInitializer();
        }
        return GameInitializer._instance;
    }

    public async initialize(): Promise<void> {
        if (this._initialized) return;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            await new Promise<void>((resolve) => {
                document.addEventListener('DOMContentLoaded', () => resolve());
            });
        }

        // Create and initialize game
        this._game = new Game();
        await this._game.init();
        this._initialized = true;

        // Add Controls button logic
        const controlsBtn = document.getElementById('controls-btn');
        if (controlsBtn && this._game) {
            controlsBtn.addEventListener('click', () => {
                // Show controls overlay for 3 seconds
                (this._game as any)._showControlsSplash = true;
                setTimeout(() => {
                    (this._game as any)._showControlsSplash = false;
                }, 3000);
            });
        }
    }

    public get game(): Game {
        if (!this._game) {
            throw new Error('Game not initialized');
        }
        return this._game;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    GameInitializer.getInstance().initialize();
});

export const gameInitializer = GameInitializer.getInstance(); 