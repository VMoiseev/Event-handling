import GamePlay from './GamePlay';
import GameController from './GameController';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#field'));

const gameCtrl = new GameController(gamePlay);
gameCtrl.init();
