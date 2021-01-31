import {Component} from "./component.js";
import {MainCharacter} from "./mainCharacter.js";
import {Ground} from "./ground.js";
import {Wall} from "./wall.js";
import {Vector2D} from '../dimension/vector2D.js'

export class World extends Component {
    readonly gravity: Vector2D = Vector2D.fromDegrees(90, 0.1)
    private readonly mainCharacter: MainCharacter
    private readonly components: Component[] = []

    constructor(name: string, size: Vector2D) {
        super(name, size.div(2), size, 0)

        this.mainCharacter = new MainCharacter('Sergiirk', Vector2D.of(200, 200), Vector2D.of(50, 50))

        const ground1: Ground = new Ground('Ground1', Vector2D.of(this.size.x / 2, 20), Vector2D.of(this.size.x, this.size.y * 0.05))
        const ground2: Ground = new Ground('Ground2', Vector2D.of(this.size.x / 2, this.size.y - 20), Vector2D.of(this.size.x, this.size.y * 0.05))

        const wall1: Wall = new Wall('Wall1', Vector2D.of(20, this.size.y / 2), Vector2D.of(this.size.x * 0.1, this.size.y))
        const wall2: Wall = new Wall('Wall2', Vector2D.of(this.size.x - 20, this.size.y / 2), Vector2D.of(this.size.x * 0.1, this.size.y))

        console.log('position = ' + ground2.position + ' size = ' + ground2.size + ' hitbox= ' + ground2.hitbox())

        this.addComponent(this.mainCharacter)
        this.addComponent(ground1)
        this.addComponent(ground2)
        this.addComponent(wall1)
        this.addComponent(wall2)
    }

    draw(context: CanvasRenderingContext2D) {
        this.getComponents().forEach(component => component.draw(context))

        const topLeft = this.topLeft()
        context.lineWidth = 3
        context.strokeRect(topLeft.x, topLeft.y, this.size.x, this.size.y)

       /* const gPos = Vector2D.of(this.size.x / 2, 100)
        const gSize = Vector2D.of(50, 30)

        context.beginPath()
        context.lineWidth = 1
        context.strokeStyle = "blue"
        const from1 = Vector2D.of(gPos.x - gSize.x / 2 + 20, gPos.y + gSize.y / 2)
        const to1 = from1.add(Vector2D.of(gSize.x, 0))
        context.moveTo(from1.x, from1.y)
        context.lineTo(to1.x, to1.y)
        context.stroke()

        context.beginPath()
        context.lineWidth = 1
        context.strokeStyle = "yellow"
        const from2 = Vector2D.of(gPos.x + gSize.x / 2, gPos.y - gSize.y / 2 - 20)
        const to2 = from2.add(Vector2D.of(0, gSize.y))

        context.moveTo(from2.x, from2.y)
        context.lineTo(to2.x, to2.y)
        context.stroke()

        */
    }

    getComponents(): Component[] {
        return this.components
    }

    getNonCharacterComponents(): Component[] {
        return this.getComponents()
            .filter(component => component != this.mainCharacter)
    }

    getMainCharacter(): MainCharacter {
        return this.mainCharacter
    }

    private addComponent(component: Component): void {
        this.components.push(component)
    }
}