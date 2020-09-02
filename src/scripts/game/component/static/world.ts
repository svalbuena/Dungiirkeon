import {AbstractComponent} from "../abstractComponent.js";
import {MainCharacter} from "../dynamic/mainCharacter.js";
import {Ground} from "./ground.js";
import {MovementAction} from "../../action/movement/movementAction.js";
import {Size} from "../../dimension/size.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {StaticComponent} from "./staticComponent.js";
import {ComponentMover} from "../../physics/componentMover.js";
import {Wall} from "./wall.js";

export class World extends StaticComponent {
    readonly gravity: number = 1
    private readonly mainCharacter: MainCharacter
    private readonly components: AbstractComponent[] = []

    constructor(name: string, size: Size) {
        super(name, new Coordinate(0, 0), size)
        this.mainCharacter = new MainCharacter('Sergiirk', this.position.add(40, 40), new Size(50, 50))
        const ground1: Ground = new Ground('Ground1', this.position, new Size(this.size.width, this.size.height * 0.05))
        const ground2: Ground = new Ground('Ground2', this.position.add(0, this.size.height * 0.8), new Size(this.size.width, this.size.height * 0.05))
        const wall1: Wall = new Wall('Wall1', this.position, new Size(this.size.width * 0.1, this.size.height))
        const wall2: Wall = new Wall('Wall2', this.position.add(this.size.width * 0.8, 0), new Size(this.size.width * 0.1, this.size.height))

        this.addComponent(this.mainCharacter)
        this.addComponent(ground1)
        this.addComponent(ground2)
        this.addComponent(wall1)
        this.addComponent(wall2)
    }

    moveMainCharacter(movementAction: MovementAction): void {
        ComponentMover.moveComponent(this.mainCharacter, movementAction, this)
    }

    draw(context: CanvasRenderingContext2D) {
        this.components.forEach(component => component.draw(context))
    }

    getComponents(): AbstractComponent[] {
        return this.components
    }

    private addComponent(component: AbstractComponent): void {
        this.components.push(component)
    }
}