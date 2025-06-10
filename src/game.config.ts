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
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    LOADING_SCREEN_TIMEOUT: 3000,
    LOADING_SCREEN_IMAGE_POSITION: new Vector2(0, 0),
    STICK_ORIGIN: new Vector2(0, 0),
    STICK_SHOT_ORIGIN: new Vector2(0, 0),
    BALL_DIAMETER: 20,
    CUSHION_WIDTH: 10,
    GAME_WIDTH: 800,
    TIMEOUT_TO_HIDE_STICK_AFTER_SHOT: 1000,
    SHOOT_MOUSE_BUTTON: 0,
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
        MAIN_MENU_BACKGROUND: 'main_menu_background',
        TABLE: 'table',
        BALL: 'ball',
        STICK: 'stick',
        CONTROLS: 'controls',
        TWO_PLAYERS_BUTTON: 'two_players_button',
        TWO_PLAYERS_BUTTON_HOVERED: 'two_players_button_hovered',
        ONE_PLAYER_BUTTON: 'one_player_button',
        ONE_PLAYER_BUTTON_HOVERED: 'one_player_button_hovered',
        BACK_BUTTON: 'BACK_BUTTON',
        BACK_BUTTON_HOVERED: 'BACK_BUTTON_HOVERED',
        MUTE_BUTTON: 'mute_button',
        MUTE_BUTTON_HOVERED: 'mute_button_hovered',
        MUTE_BUTTON_PRESSED: 'mute_button_pressed'
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
    BUTTON_CURSOR: 'pointer',
    STICK_MAX_POWER: 100
};