import { IMenuCommand } from './menu-command';
import { Game } from '../../game';

export class GoToPreviousMenuCommand implements IMenuCommand {

    constructor(private _game: Game) {}
    
    public execute(): void {
        this._game.goToPreviousMenu();
    }

}