import { GameConfig } from './../../game.config';
import { IMenuCommand } from './menu-command';
import { Game } from '../../game';

export class PVCCommand implements IMenuCommand {
    constructor(private _game: Game) {}
    
    public execute(iterationsValue: number): void {
        GameConfig.ai.playerIndex = Math.floor(Math.random() * 2);
        GameConfig.ai.on = true;
        GameConfig.ai.trainIterations = iterationsValue;
        this._game.start();
    }
}