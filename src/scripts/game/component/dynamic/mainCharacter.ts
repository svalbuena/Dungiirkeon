import {DynamicComponent} from "./dynamicComponent.js";
import {Coordinate} from "../../dimension/coordinate";
import {Size} from "../../dimension/size";

export class MainCharacter extends DynamicComponent {
    private static readonly BASE_VELOCITY: number = 2
    constructor(name: string, position: Coordinate, size: Size) {
        super(name, position, size, MainCharacter.BASE_VELOCITY)
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "green"
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        context.fill()
    }
}