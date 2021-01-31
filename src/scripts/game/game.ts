import {World} from "./component/world.js"
import {KeyListener} from "./event/key/keyListener.js"
import {KeyToActionMovementConverter, MovementAction} from "./action/movement/movementAction.js"
import {GravityApplier} from "./physics/gravity/gravityApplier.js"
import {ComponentMover} from "./physics/movement/componentMover.js"
import {Vector2D} from './dimension/vector2D.js'
import {CollisionDetector} from './physics/collision/collisionDetector.js'
import {Component} from './component/component.js'
import {MainCharacter} from './component/mainCharacter.js'

export class Game {
    private static readonly CANVAS_WIDTH: number = 400
    private static readonly CANVAS_HEIGHT: number = 300
    private static readonly FRAMES_PER_SECOND: number = 60
    private static readonly MILLIS_PER_FRAME: number = 1 / Game.FRAMES_PER_SECOND * 1000
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D
    private readonly world: World
    private readonly keyListener: KeyListener

    constructor() {
        this.canvas = Game.createHtmlCanvas('canvas', Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT)
        this.context = this.canvas.getContext('2d')
        this.world = new World('World', Vector2D.of(Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT))
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
        const mainCharacter = this.world.getMainCharacter()
        this.getMovementActions().forEach(movementAction => {
            const force: Vector2D = ComponentMover.movementActionToForce(movementAction, mainCharacter, this.world.getComponents())
            mainCharacter.applyForce(force)
        })

        this.world.getComponents().forEach(component => {
            const aboveComponent = CollisionDetector.isOnGround(component, this.world.getComponents())
            if (component instanceof MainCharacter) {
                component.applyForce(Game.gravity(component))
            }
            component.applyForce(Game.friction(component, aboveComponent))
            component.velocity = component.velocity.add(component.acceleration).limit(10)
            ComponentMover.move(component, this.world.getComponents(), Game.MILLIS_PER_FRAME)
            component.acceleration = component.acceleration.mul(0)
        })

        this.world.draw(this.context)
    }

    private getMovementActions(): Set<MovementAction> {
        const pressedKeys = this.keyListener.getPressedKeys()
        return KeyToActionMovementConverter.convert(pressedKeys)
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

    private static gravity(component: Component): Vector2D {
        const yForce = 0.5 * component.mass
        return Vector2D.of(0, yForce)
    }

    private static friction(component: Component, aboveComponent: Component): Vector2D {
        if (aboveComponent == null) return Vector2D.of(0, 0)

        const c = aboveComponent.friction
        const normalForce = 1
        const friction = component.velocity
            .normalize()
            .mul(-1)
            .mul(c)
            .mul(normalForce)
        return friction.limit(component.velocity.magnitude())
    }
}