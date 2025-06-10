import { AI } from './ai/ai-trainer';
import { GoToPreviousMenuCommand } from './menu/commands/go-to-previous-menu-command';
import { GoToSubMenuCommand } from './menu/commands/go-to-sub-menu-command';
import { ToggleSoundCommand } from './menu/commands/toggle-sound-command';
import { PVCCommand } from './menu/commands/pvc-command';
import { PVPCommand } from './menu/commands/pvp-command';
import { IMenuCommand } from './menu/commands/menu-command';
import { GameConfig } from './game.config';
import { MenuActionType } from './menu/menu-action-type';
import { Menu } from './menu/menu';
import { Assets } from './assets';
import { GameWorld } from './game-objects/game-world';
import { Keyboard } from './input/keyboard';
import { Canvas2D } from './canvas';
import { Mouse } from './input/mouse';
import { IAssetsConfig, IInputConfig, IMenuConfig } from './game.config.type';
import { gameInitializer } from './game-init';

//------Configurations------//

const sprites: IAssetsConfig = GameConfig.sprites;
const inputConfig: IInputConfig = GameConfig.input;

export class Game {
    private static _instance: Game | null = null;
    private _menuActionsMap: Map<MenuActionType, IMenuCommand> = new Map();
    private _previousMenus: Menu[] = [];
    private _menu: Menu = new Menu();
    private _poolGame: GameWorld = new GameWorld();
    private _isLoading: boolean = false;
    private _inGame: boolean = false;
    private _initialized: boolean = false;

    private constructor() {}

    public static getInstance(): Game {
        if (!Game._instance) {
            Game._instance = new Game();
        }
        return Game._instance;
    }

    public async init(): Promise<void> {
        if (this._initialized) return;
        await Canvas2D.initialize();
        this.initMenuActions();
        this._menu.init(this._menuActionsMap, GameConfig.mainMenu);
        this._initialized = true;
        this.gameLoop();
    }

    private initMenuActions(): void {
        this._menuActionsMap = new Map<MenuActionType, IMenuCommand>();
        this._menuActionsMap.set(MenuActionType.PVP, new PVPCommand(this));
        this._menuActionsMap.set(MenuActionType.PVC, new PVCCommand(this));
        this._menuActionsMap.set(MenuActionType.ToggleSound, new ToggleSoundCommand());
        this._menuActionsMap.set(MenuActionType.GoToSubMenu, new GoToSubMenuCommand(this));
        this._menuActionsMap.set(MenuActionType.GoToPreviousMenu, new GoToPreviousMenuCommand(this));
    }

    private handleInput(): void {
        if(this._inGame && Keyboard.isPressed(inputConfig.toggleMenuKey)) {
            if(this._menu.active) {
                this._menu.active = false;
            }
            else {
                this._menu.active = true;
            }
        }
    }

    private updateInternal(): void {
        if (!this._initialized || this._isLoading) return;
        this.handleInput();
        this._menu.active ? this._menu.update() : this._poolGame.update();
        Keyboard.reset();
        Mouse.reset();
    }

    private drawInternal(): void {
        if (!this._initialized || this._isLoading) return;
        if(AI.finishedSession){
            Canvas2D.clear();
            this._menu.active ? this._menu.draw() : this._poolGame.draw();
        }
    }

    private gameLoop(): void {
        this.updateInternal();
        this.drawInternal();
        window.requestAnimationFrame(() => {
            this.gameLoop();
        });
    }

    public goToSubMenu(index: number): void {
        setTimeout(() => {
            if(this._menu){
                this._menu.active = false;
                this._previousMenus.push(this._menu);
            }
            const subMenu = this._menu.getSubMenu(index);
            if (subMenu) {
                this._menu = subMenu;
                this._menu.active = true;
            }
        }, GameConfig.timeoutToLoadSubMenu);
    }
    
    public goToPreviousMenu(): void {
        if(this._previousMenus.length > 0) {
            setTimeout(() => {
                this._menu.active = false;
                const previousMenu = this._previousMenus.pop();
                if (previousMenu) {
                    this._menu = previousMenu;
                    this._menu.active = true;
                }
            }, GameConfig.timeoutToLoadSubMenu);
        }
    }

    public start(): void {
        this.displayLoadingScreen().then(() => {
            this._menu.active = false;
            this._inGame = true;
            this._poolGame = new GameWorld();
            this._poolGame.initMatch();
        });
    }

    private displayLoadingScreen(): Promise<void> {
        return new Promise((resolve) => {
            this._isLoading = true;
            Canvas2D.clear();
            Canvas2D.drawImage(
                Assets.getSprite(sprites.paths.controls),
                GameConfig.loadingScreenImagePosition
                );
            setTimeout(() => {
                this._isLoading = false;
                resolve();
            }, GameConfig.loadingScreenTimeout);
        });
    }
}

// Initialize the game when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const game = Game.getInstance();
    await game.init();
});