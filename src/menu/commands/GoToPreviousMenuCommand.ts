import { IMenuCommand } from './IMenuCommand';
import { Game } from '../../Game';

export class GoToPreviousMenuCommand implements IMenuCommand {
    constructor(private game: Game) {}

    execute(): void {
        this.game.goToPreviousMenu();
    }
} 