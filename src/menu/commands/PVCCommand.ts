import { IMenuCommand } from './IMenuCommand';
import { Game } from '../../Game';

export class PVCCommand implements IMenuCommand {
    constructor(private game: Game) {}

    execute(): void {
        this.game.startPVCGame();
    }
} 