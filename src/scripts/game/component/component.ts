import {Hitbox} from "../dimension/myHitbox.js";
import {Vector2D} from '../dimension/vector2D.js'

export abstract class Component {
    name: string
    position: Vector2D
    readonly mass: number
    readonly friction: number
    readonly size: Vector2D
    readonly baseSpeed: number
    velocity: Vector2D
    acceleration: Vector2D

    protected constructor(name: string, position: Vector2D, size: Vector2D, baseSpeed: number) {
        this.mass = 1
        this.name = name
        this.position = position
        this.friction = 1
        this.size = size
        this.baseSpeed = baseSpeed
        this.velocity = Vector2D.of(0, 0)
        this.acceleration = Vector2D.of(0, 0)
    }

    abstract draw(context: CanvasRenderingContext2D): void

    applyForce(force: Vector2D): void {
        this.acceleration = this.acceleration.add(force).div(this.mass)
    }

    setPosition(position: Vector2D): void {
        this.position = position
    }

    hitbox(): Hitbox {
        return Hitbox.of(this.position, this.topLeft(), this.botRight())
    }

    topLeft(): Vector2D {
        return this.position.sub(this.size.div(2))
    }

    botRight(): Vector2D {
        return this.position.add(this.size.div(2))
    }

    toString(): string {
        return `[${this.name}, area=${this.hitbox().toString()}]`
    }
}