import {Coordinate} from "../dimension/coordinate.js";
import {Size} from "../dimension/size.js";
import {Hitbox} from "../dimension/myHitbox.js";

export abstract class AbstractComponent {
    name: string
    position: Coordinate
    lastPosition: Coordinate
    readonly size: Size

    protected constructor(name: string, position: Coordinate, size: Size) {
        this.name = name
        this.position = position
        this.lastPosition = position
        this.size = size
    }

    abstract draw(context: CanvasRenderingContext2D): void

    setPosition(position: Coordinate): void {
        this.position = position
    }

    setLastPosition(lastPosition: Coordinate): void {
        this.lastPosition = lastPosition
    }

    getHitbox(): Hitbox {
        return this.getHitboxAt(this.position)
    }

    getHitboxAt(position: Coordinate) {
        return new Hitbox(position, this.size.width, this.size.height)
    }

    toString(): string {
        return `[${this.name}, area=${this.getHitbox().toString()}]`
    }
}