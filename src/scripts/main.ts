import {Game} from "./game/game.js";

const game = new Game()
document.body.appendChild(game.getHtmlCanvas())

game.start()



