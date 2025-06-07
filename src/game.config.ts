import { Vector2 } from './geom/Vector2';
import { MenuActionType } from './menu/MenuActionType';

interface MenuConfig {
    LABELS: Array<{
        text: string;
        position: { x: number; y: number };
        font: string;
        color: string;
        alignment: CanvasTextAlign;
    }>;
    BUTTONS: Array<{
        action: MenuActionType;
        value?: number;
        position: { x: number; y: number };
        sprite: string;
        spriteOnHover: string;
    }>;
    SUB_MENUS: MenuConfig[];
}

export const GAME_CONFIG = {
    CANVAS_WIDTH: 1600,
    CANVAS_HEIGHT: 900,
    LOADING_SCREEN_TIMEOUT: 2000,
    LOADING_SCREEN_IMAGE_POSITION: new Vector2(0, 0),
    STICK_ORIGIN: new Vector2(0, 0),
    STICK_SHOT_ORIGIN: new Vector2(0, 0),
    STICK_MAX_POWER: 100,
    SELECT_MOUSE_BUTTON: 0,
    BACK_TO_MENU_KEY: 27,
    SOUND_ON: true,
    SPRITES_BASE_PATH: './assets/sprites/',
    SOUNDS_BASE_PATH: './assets/sounds/',
    CURRENT_PLAYER_LABEL: 'Player ',
    CURRENT_PLAYER_LABEL_FONT: '30px Arial',
    CURRENT_PLAYER_LABEL_COLOR: 'white',
    CURRENT_PLAYER_LABEL_POSITION: new Vector2(800, 50),
    CURRENT_PLAYER_LABEL_ALIGNMENT: 'center' as CanvasTextAlign,
    OVERALL_SCORE_LABEL_FONT: '30px Arial',
    OVERALL_SCORE_LABEL_COLOR: 'white',
    OVERALL_SCORE_LABELS_POSITIONS: [
        new Vector2(400, 50),
        new Vector2(1200, 50)
    ],
    OVERALL_SCORE_LABELS_ALLIGNMENT: 'center' as CanvasTextAlign,
    SPRITES: {
        MAIN_MENU_BACKGROUND: 'MAIN_MENU_BACKGROUND',
        TABLE: 'TABLE',
        BALL: 'BALL',
        STICK: 'STICK',
        CONTROLS: 'CONTROLS',
        TWO_PLAYERS_BUTTON: 'TWO_PLAYERS_BUTTON',
        TWO_PLAYERS_BUTTON_HOVERED: 'TWO_PLAYERS_BUTTON_HOVERED',
        ONE_PLAYER_BUTTON: 'ONE_PLAYER_BUTTON',
        ONE_PLAYER_BUTTON_HOVERED: 'ONE_PLAYER_BUTTON_HOVERED',
        BACK_BUTTON: 'BACK_BUTTON',
        BACK_BUTTON_HOVERED: 'BACK_BUTTON_HOVERED',
        MUTE_BUTTON: 'MUTE_BUTTON',
        MUTE_BUTTON_HOVERED: 'MUTE_BUTTON_HOVERED',
        MUTE_BUTTON_PRESSED: 'MUTE_BUTTON_PRESSED'
    },
    SOUNDS: {
        STRIKE: 'STRIKE',
        BALL_COLLISION: 'BALL_COLLISION',
        POCKET: 'POCKET',
        MENU_MUSIC: 'MENU_MUSIC',
        GAME_MUSIC: 'GAME_MUSIC'
    },
    MAIN_MENU_CONFIG: {
        LABELS: [
            {
                text: 'Classic 8-Ball',
                position: { x: 100, y: 100 },
                font: '100px Bookman',
                color: 'white',
                alignment: 'left' as CanvasTextAlign
            },
            {
                text: `© ${new Date().getFullYear()} Chen Shmilovich`,
                position: { x: 1250, y: 800 },
                font: '20px Bookman',
                color: 'white',
                alignment: 'left' as CanvasTextAlign
            }
        ],
        BUTTONS: [
            {
                action: MenuActionType.PVP,
                position: { x: 200, y: 200 },
                sprite: 'TWO_PLAYERS_BUTTON',
                spriteOnHover: 'TWO_PLAYERS_BUTTON_HOVERED'
            },
            {
                action: MenuActionType.GoToSubMenu,
                value: 0,
                position: { x: 200, y: 400 },
                sprite: 'ONE_PLAYER_BUTTON',
                spriteOnHover: 'ONE_PLAYER_BUTTON_HOVERED'
            },
            {
                action: MenuActionType.ToggleSound,
                position: { x: 1430, y: 10 },
                sprite: 'MUTE_BUTTON',
                spriteOnHover: 'MUTE_BUTTON_HOVERED'
            }
        ],
        SUB_MENUS: [
            {
                LABELS: [
                    {
                        text: 'Choose Difficulty',
                        position: { x: 100, y: 100 },
                        font: '100px Bookman',
                        color: 'white',
                        alignment: 'left' as CanvasTextAlign
                    },
                    {
                        text: `© ${new Date().getFullYear()} Chen Shmilovich`,
                        position: { x: 1250, y: 800 },
                        font: '20px Bookman',
                        color: 'white',
                        alignment: 'left' as CanvasTextAlign
                    }
                ],
                BUTTONS: [
                    {
                        action: MenuActionType.GoToPreviousMenu,
                        position: { x: 100, y: 150 },
                        sprite: 'BACK_BUTTON',
                        spriteOnHover: 'BACK_BUTTON_HOVERED'
                    },
                    {
                        action: MenuActionType.ToggleSound,
                        position: { x: 1430, y: 10 },
                        sprite: 'MUTE_BUTTON',
                        spriteOnHover: 'MUTE_BUTTON_HOVERED'
                    }
                ],
                SUB_MENUS: []
            }
        ]
    } as MenuConfig,
    DEFAULT_CURSOR: 'default',
    BUTTON_CURSOR: 'pointer'
};