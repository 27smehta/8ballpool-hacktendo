import { IMenuCommand } from './IMenuCommand';
import { Assets } from '../../Assets';

export class ToggleSoundCommand implements IMenuCommand {
    execute(): void {
        Assets.toggleSound();
    }
} 