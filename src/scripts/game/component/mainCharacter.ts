import {Vector2D} from '../dimension/vector2D.js'
import {Pixel} from '../display/pixel.js'
import {Component} from './component.js'

export class MainCharacter extends Component {
    private static readonly BASE_SPEED: number = 0.01

    constructor(name: string, position: Vector2D, size: Vector2D) {
        super(name, position, size, MainCharacter.BASE_SPEED)
    }

    draw(context: CanvasRenderingContext2D) {
        const topLeft = Pixel.closestPosition(this.topLeft())

        context.fillStyle = "green"
        context.fillRect(topLeft.x, topLeft.y, this.size.x + 1, this.size.y + 1)

        const position = Pixel.closestPosition(this.position)
        const lineTo = Pixel.closestPosition(this.velocity.add(this.position))
        context.beginPath()
        context.lineWidth = 2
        context.moveTo(position.x, position.y)
        context.lineTo(lineTo.x, lineTo.y)
        context.closePath()
        context.stroke()
    }
}