import { Game } from './engine/game.js';

const game = new Game();
await game.init();
game.bindUI();
game.render();
