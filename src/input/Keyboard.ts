import { MenuButton } from '../menu/MenuButton';
import { MenuAction } from '../menu/MenuAction';
import { Assets } from './../Assets';
import { Canvas2D } from './../Canvas';
import { GAME_CONFIG } from '../game.config';
import { Vector2 } from '../geom/Vector2';

export class Keyboard {
    private static _keys: { [key: string]: boolean } = {};

    private _buttons: MenuButton[]
    private _active: boolean;

    public set active(value: boolean) {
        this._active = value;
    }

    public get active(): boolean {
        return this._active;
    }

    constructor(actionsMap: Map<MenuAction, () => void>) {
        this._buttons = GAME_CONFIG.MAIN_MENU_BUTTONS.map((button: any) => {
            return new MenuButton(
                    actionsMap.get(button.action),
                    button.position, 
                    Assets.getSprite(GAME_CONFIG.SPRITES[button.sprite as keyof typeof GAME_CONFIG.SPRITES]), 
                    Assets.getSprite(GAME_CONFIG.SPRITES[button.spriteOnHover as keyof typeof GAME_CONFIG.SPRITES])
                );
        });
    }

    public update(): void {
        this._buttons.forEach((button: MenuButton) => button.update());
    }

    public draw(): void {
        Canvas2D.changeCursor(GAME_CONFIG.DEFAULT_CURSOR);
        Canvas2D.drawImage(Assets.getSprite(GAME_CONFIG.SPRITES.MAIN_MENU_BACKGROUND), Vector2.zero, 0, Vector2.zero);
        this._buttons.forEach((button: MenuButton) => button.draw());
    }

    public static isPressed(key: string): boolean {
        return this._keys[key] || false;
    }

    public static isDown(key: string): boolean {
        return this._keys[key] || false;
    }

    public static reset(): void {
        this._keys = {};
    }

    public static init(): void {
        window.addEventListener('keydown', (e) => {
            Keyboard._keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            Keyboard._keys[e.key] = false;
        });
    }
}
