import {AbstractComponent} from "../abstractComponent.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {Size} from "../../dimension/size.js";

export abstract class DynamicComponent extends AbstractComponent {
    private velocity: number
    private acceleration: number

    protected constructor(name: string, position: Coordinate, size: Size, velocity: number, acceleration: number) {
        super(name, position, size)
        this.velocity = velocity
        this.acceleration = acceleration
    }

    getVelocity(): number {
        return this.velocity
    }

    setVelocity(velocity: number): void {
        this.velocity = velocity
    }

    getAcceleration(): number {
        return this.acceleration
    }
}