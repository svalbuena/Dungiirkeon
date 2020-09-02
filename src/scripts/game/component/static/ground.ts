import {StaticComponent} from "./staticComponent.js";
import {Coordinate} from "../../dimension/coordinate";
import {Size} from "../../dimension/size";

export class Ground extends StaticComponent {
    constructor(name: string, position: Coordinate, size: Size) {
        super(name, position, size)
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "black"
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        context.fill()
    }
}