import {AbstractComponent} from "../abstractComponent.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {Size} from "../../dimension/size.js";

export abstract class DynamicComponent extends AbstractComponent {
    private readonly baseVelocity: number
    private velocity: number

    protected constructor(name: string, position: Coordinate, size: Size, baseVelocity: number) {
        super(name, position, size)
        this.baseVelocity = baseVelocity
        this.velocity = baseVelocity
    }

    updateStatus(): void {
       //console.log(`position=${this.position} lastPosition=${this.lastPosition} velocity=${this.velocity}`)

        if (this.position.equals(this.lastPosition)) {
            this.setVelocity(this.baseVelocity)
        }

       // console.log(`velocity=${this.velocity}`)
    }

    getVelocity(): number {
        return this.velocity
    }

    setVelocity(velocity: number): void {
        this.velocity = velocity
    }
}