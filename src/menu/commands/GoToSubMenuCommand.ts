import { IMenuCommand } from './IMenuCommand';
import { Game } from '../../Game';

export class GoToSubMenuCommand implements IMenuCommand {
    constructor(private game: Game) {}

    execute(): void {
        this.game.goToSubMenu();
    }
} 