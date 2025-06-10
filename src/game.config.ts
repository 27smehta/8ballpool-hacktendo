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
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    LOADING_SCREEN_TIMEOUT: 2000,
    LOADING_SCREEN_IMAGE_POSITION: new Vector2(0, 0),
    STICK_ORIGIN: new Vector2(0, 0),
    STICK_SHOT_ORIGIN: new Vector2(0, 0),
    STICK_MAX_POWER: 100,
    BALL_DIAMETER: 20,
    CUSHION_WIDTH: 10,
    FRICTION: 0.99,
    COLLISION_LOSS: 0.8,
    BALL_MIN_VELOCITY_LENGTH: 0.1,
    MAX_BALL_EXPECTED_COLLISION_FORCE: 10,
    POCKET_RADIUS: 15,
    TIMEOUT_TO_HIDE_STICK_AFTER_SHOT: 1000,
    SELECT_MOUSE_BUTTON: 0,
    PLACE_BALL_IN_HAND_MOUSE_BUTTON: 2,
    MATCH_SCORE_MARGIN: 20,
    BALL_ORIGIN: new Vector2(0, 0),
    CUE_BALL_POSITION: new Vector2(200, 300),
    EIGHT_BALL_POSITION: new Vector2(400, 300),
    POCKETS_POSITIONS: [
        new Vector2(0, 0),
        new Vector2(400, 0),
        new Vector2(800, 0),
        new Vector2(0, 600),
        new Vector2(400, 600),
        new Vector2(800, 600)
    ],
    RED_BALLS_POSITIONS: [
        new Vector2(500, 300),
        new Vector2(520, 280),
        new Vector2(540, 260),
        new Vector2(560, 240),
        new Vector2(580, 220),
        new Vector2(600, 200),
        new Vector2(620, 180)
    ],
    YELLOW_BALLS_POSITIONS: [
        new Vector2(500, 320),
        new Vector2(520, 340),
        new Vector2(540, 360),
        new Vector2(560, 380),
        new Vector2(580, 400),
        new Vector2(600, 420),
        new Vector2(620, 440)
    ],
    MATCH_SCORE_POSITIONS: [
        new Vector2(20, 20),
        new Vector2(780, 20)
    ],
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
        MUTE_BUTTON: 'mute_button',
        MUTE_BUTTON_PRESSED: 'mute_button_pressed',
        CUE_BALL: 'cue_ball',
        BLACK_BALL: 'black_ball',
        RED_BALL: 'red_ball',
        YELLOW_BALL: 'yellow_ball',
        RED_SCORE: 'red_score',
        YELLOW_SCORE: 'yellow_score'
    },
    SOUNDS: {
        STRIKE: 'strike',
        BALL_COLLISION: 'ball_collision',
        POCKET: 'pocket',
        MENU_MUSIC: 'menu_music',
        GAME_MUSIC: 'game_music',
        RAIL: 'rail',
        BALLS_COLLIDE: 'balls_collide'
    },
    MAIN_MENU_CONFIG: {
        LABELS: [
            {
                text: 'Classic 8-Ball',
                position: new Vector2(100, 100),
                font: '100px Bookman',
                color: 'white',
                alignment: 'left' as CanvasTextAlign
            },
            {
                text: `© ${new Date().getFullYear()} Chen Shmilovich`,
                position: new Vector2(1250, 800),
                font: '20px Bookman',
                color: 'white',
                alignment: 'left' as CanvasTextAlign
            }
        ],
        BUTTONS: [
            {
                action: 'PVP',
                position: new Vector2(400, 250),
                sprite: 'TWO_PLAYERS_BUTTON',
                spriteOnHover: 'TWO_PLAYERS_BUTTON_HOVERED'
            },
            {
                action: 'PVC',
                position: new Vector2(400, 350),
                sprite: 'ONE_PLAYER_BUTTON',
                spriteOnHover: 'ONE_PLAYER_BUTTON_HOVERED'
            }
        ],
        SUB_MENUS: [] as Array<{
            LABELS: Array<{
                text: string;
                position: Vector2;
                font: string;
                color: string;
                alignment: CanvasTextAlign;
            }>;
            BUTTONS: Array<{
                action: string;
                position: Vector2;
                sprite: string;
                spriteOnHover: string;
            }>;
            SUB_MENUS: any[];
        }>
    }
};