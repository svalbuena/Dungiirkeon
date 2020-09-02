import {AbstractComponent} from "../abstractComponent.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {Size} from "../../dimension/size.js";

export abstract class DynamicComponent extends AbstractComponent {
    acceleration: number

    protected constructor(name: string, position: Coordinate, size: Size, acceleration: number) {
        super(name, position, size)
        this.acceleration = acceleration
    }
}