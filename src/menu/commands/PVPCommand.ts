import { IMenuCommand } from './IMenuCommand';
import { Game } from '../../Game';

export class PVPCommand implements IMenuCommand {
    constructor(private game: Game) {}

    execute(): void {
        this.game.startPVPGame();
    }
} 