import {AbstractComponent} from "../abstractComponent.js";
import {Coordinate} from "../../dimension/coordinate";
import {Size} from "../../dimension/size";

export abstract class StaticComponent extends AbstractComponent {
    protected constructor(name: string, position: Coordinate, size: Size) {
        super(name, position, size)
    }
}