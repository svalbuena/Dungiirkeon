import {World} from "./component/static/world.js";
import {KeyListener} from "./event/key/keyListener.js";
import {Key} from "./event/key/key.js";
import {KeyToActionMovementConverter, MovementAction} from "./action/movement/movementAction.js";
import {Size} from "./dimension/size.js";

export class Game {
    private static readonly CANVAS_WIDTH: number = 400
    private static readonly CANVAS_HEIGHT: number = 300
    private static readonly FRAMES_PER_SECOND: number = 120
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D
    private readonly world: World
    private readonly keyListener: KeyListener

    constructor() {
        this.canvas = Game.createHtmlCanvas('canvas', Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT)
        this.context = this.canvas.getContext('2d')
        this.world = new World('World', new Size(Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT))
        this.keyListener = new KeyListener()
        this.drawFrame()
    }

    getHtmlCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    start() {
        setInterval(() => this.drawFrame(), Game.getRefreshTimeInMilliseconds(Game.FRAMES_PER_SECOND))
    }

    private drawFrame(): void {
        this.clear()
        const pressedKeys: Set<Key> = this.keyListener.getPressedKeys()
        this.processKeys(pressedKeys)
        this.world.draw(this.context)
    }

    private processKeys(pressedKeys: Set<Key>): void {
        const movementActions: Set<MovementAction> = KeyToActionMovementConverter.convert(pressedKeys)
        movementActions.forEach(movementAction => this.world.moveMainCharacter(movementAction))
    }

    private clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private static createHtmlCanvas(id: string, width: number, height: number): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        canvas.id = id
        canvas.width = width
        canvas.height = height
        return canvas
    }

    private static getRefreshTimeInMilliseconds(framesPerSecond: number): number {
        return 1000 / framesPerSecond
    }
}