import {Coordinate} from "../dimension/coordinate.js";
import {Size} from "../dimension/size.js";
import {Area} from "../dimension/area.js";

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

    getArea(): Area {
        return this.getAreaAt(this.position)
    }

    getAreaAt(position: Coordinate) {
        const topLeftCorner = position
        const botRightCorner = new Coordinate(topLeftCorner.x + this.size.width - 1, topLeftCorner.y + this.size.height - 1)
        return new Area(topLeftCorner, botRightCorner)
    }

    toString(): string {
        return `[${this.name}, area=${this.getArea().toString()}]`
    }
}