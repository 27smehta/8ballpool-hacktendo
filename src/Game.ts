import { GAME_CONFIG } from './game.config';
import { MenuAction } from './menu/MenuAction';
import { MainMenu } from './menu/MainMenu';
import { Assets } from './Assets';
import { GameWorld } from './game-objects/GameWorld';
import { Keyboard } from './input/Keyboard';
import { Canvas2D } from './Canvas';
import { Mouse } from './input/Mouse';

let menuActionsMap: Map<MenuAction, () => void>;
let menu: MainMenu;
let poolGame: GameWorld;
let isLoading: boolean;
let showingControls: boolean = false;

const loadingScreen = () => {
    return new Promise<void>((resolve) => {
        isLoading = true;
        Canvas2D.clear();
        Canvas2D.drawImage(
            Assets.getSprite(GAME_CONFIG.SPRITES.CONTROLS),
            GAME_CONFIG.LOADING_SCREEN_IMAGE_POSITION
        );
        setTimeout(() => {
            isLoading = false;
            resolve();
        }, GAME_CONFIG.LOADING_SCREEN_TIMEOUT);
    });
}

const pvp = () => {
    loadingScreen().then(() => {
        menu.active = false;
        poolGame.initMatch();
    });
}

const pvc = () => {
    loadingScreen().then(() => {
        menu.active = false;
        poolGame.initMatch();
    });
}

const toggleSound = () => {
    GAME_CONFIG.SOUND_ON = !GAME_CONFIG.SOUND_ON;
}

const showControls = () => {
    showingControls = true;
    menu.active = false;
}

const showTheme = () => {
    // TODO: Implement theme functionality
    console.log("Theme feature coming soon!");
}

const initMenuActions = () => {
    menuActionsMap = new Map<MenuAction, () => void>();
    menuActionsMap.set(MenuAction.PVP, pvp);
    menuActionsMap.set(MenuAction.PVC, pvc);
    menuActionsMap.set(MenuAction.ToggleSound, toggleSound);
    menuActionsMap.set(MenuAction.Controls, showControls);
    menuActionsMap.set(MenuAction.Theme, showTheme);
}

const initGame = async () => {
    await Assets.loadGameAssets();
    initMenuActions();
    menu = new MainMenu(menuActionsMap);
    menu.active = true;
    poolGame = new GameWorld();
    Keyboard.init();
    gameLoop();
}

const handleInput = () => {
    if (!menu.active && Keyboard.isPressed(GAME_CONFIG.BACK_TO_MENU_KEY)) {
        menu.active = true;
        showingControls = false;
    }
}

const update = () => {
    if (isLoading) return;
    handleInput();
    if (showingControls) {
        if (Mouse.isPressed(GAME_CONFIG.SELECT_MOUSE_BUTTON)) {
            showingControls = false;
            menu.active = true;
        }
    } else {
        menu.active ? menu.update() : poolGame.update();
    }
    Keyboard.reset();
    Mouse.reset();
}

const draw = () => {
    if (isLoading) return;
    Canvas2D.clear();
    if (showingControls) {
        Canvas2D.drawImage(Assets.getSprite(GAME_CONFIG.SPRITES.CONTROLS));
    } else {
        menu.active ? menu.draw() : poolGame.draw();
    }
}

const gameLoop = () => {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

initGame();