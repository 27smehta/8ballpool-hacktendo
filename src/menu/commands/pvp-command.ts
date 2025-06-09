import { GameConfig } from './../../game.config';
import { Game } from '../../game';
import { IMenuCommand } from './menu-command';

export class PVPCommand implements IMenuCommand {
    
    constructor(private _game: Game) {}
    
    public execute(): void {
        GameConfig.ai.on = false;
        this._game.start();
    }

}