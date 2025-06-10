import { IMenuConfig, IButton, ILabel, ICursorConfig, IAssetsConfig } from './../game.config.type';
import { IMenuCommand } from './commands/menu-command';
import { MenuButton } from './menu-button';
import { Assets } from '../assets';
import { Canvas2D } from '../canvas';
import { GameConfig } from '../game.config';
import { MenuActionType } from './menu-action-type';
import { MenuLabel } from './menu-label';

//------Configurations------//

const cursorConfig: ICursorConfig = GameConfig.cursor;
const sprites: IAssetsConfig = GameConfig.sprites;

export class Menu {

    //------Members------//

    private _labels: MenuLabel[];
    private _buttons: MenuButton[]
    private _active: boolean;
    private _subMenus: Menu[]

    //------Properties------//

    public set active(value: boolean) {
        this._active = value;
    }

    public get active(): boolean {
        return this._active;
    }

    public get buttons(): MenuButton[] {
        return this._buttons;
    }

    public get labels(): MenuLabel[] {
        return this._labels;
    }

    public get subMenus(): Menu[] {
        return this._subMenus;
    }

    constructor() {
        this._labels = [];
        this._buttons = [];
        this._active = false;
        this._subMenus = [];
    }

    //------Public Methods------//

    public init(menuActionsMap: Map<MenuActionType, IMenuCommand>, menuConfig: IMenuConfig): void {
        this._labels = menuConfig.labels.map(labelConfig => new MenuLabel(labelConfig));
        this._buttons = menuConfig.buttons.map(buttonConfig => new MenuButton(buttonConfig, menuActionsMap));
        this._subMenus = (menuConfig.subMenus || []).map(subMenuConfig => {
            const subMenu = new Menu();
            subMenu.init(menuActionsMap, subMenuConfig);
            return subMenu;
        });
    }

    public getSubMenu(index: number) {
        return this._subMenus[index];
    }

    public update(): void {
        this._buttons.forEach(button => button.handleInput());
    }

    public draw(): void {
        this._labels.forEach(label => label.draw());
        this._buttons.forEach(button => button.draw());
        if(this._subMenus.length > 0) {
            this._subMenus.forEach(subMenu => subMenu.draw());
        }
    }
}