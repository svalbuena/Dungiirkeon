import {Coordinate} from "../dimension/coordinate.js";
import {Size} from "../dimension/size.js";
import {Hitbox} from "../dimension/myHitbox.js";

export abstract class AbstractComponent {
    name: string
    position: Coordinate
    readonly size: Size

    protected constructor(name: string, position: Coordinate, size: Size) {
        this.name = name
        this.position = position
        this.size = size
    }

    abstract draw(context: CanvasRenderingContext2D): void

    setPosition(position: Coordinate): void {
        this.position = position
    }

    getHitbox(): Hitbox {
        return this.getHitboxAt(this.position)
    }

    getHitboxAt(position: Coordinate) {
        const topLeftCorner = position
        const botRightCorner = new Coordinate(topLeftCorner.x + this.size.width - 1, topLeftCorner.y + this.size.height - 1)
        return new Hitbox(topLeftCorner, botRightCorner)
    }

    toString(): string {
        return `[${this.name}, area=${this.getHitbox().toString()}]`
    }
}