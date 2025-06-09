import { IAssetsConfig } from './../../game.config.type';
import { IMenuCommand } from './menu-command';
import { GameConfig } from '../../game.config';

const sprites: IAssetsConfig = GameConfig.sprites;

export class ToggleSoundCommand implements IMenuCommand {
    private toggleMuteButtonSprite(): void {
        const currentMuteButtonPath: string = sprites.paths.muteButton;
        const currentMuteButtonHoveredPath: string = sprites.paths.muteButtonHovered;
        sprites.paths.muteButton = sprites.paths.muteButtonPressed;
        sprites.paths.muteButtonHovered = sprites.paths.muteButtonPressedHovered;
        sprites.paths.muteButtonPressed = currentMuteButtonPath;
        sprites.paths.muteButtonPressedHovered = currentMuteButtonHoveredPath;
    }

    public execute(): void {
        GameConfig.soundOn = !GameConfig.soundOn;
        this.toggleMuteButtonSprite();
    }
}