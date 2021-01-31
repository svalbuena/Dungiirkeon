import {Vector2D} from '../dimension/vector2D.js'
import {Component} from './component.js'

export class Wall extends Component {
    constructor(name: string, position: Vector2D, size: Vector2D) {
        super(name, position, size, 0)
    }

    draw(context: CanvasRenderingContext2D) {
        const topLeft = this.topLeft()
        context.fillStyle = "brown"
        context.fillRect(topLeft.x, topLeft.y, this.size.x + 1, this.size.y + 1)
    }
}