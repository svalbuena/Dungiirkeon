import {World} from "../../component/static/world.js";
import {ComponentMover} from "../movement/componentMover.js";
import {DynamicComponent} from "../../component/dynamic/dynamicComponent.js";
import {MovementAction} from "../../action/movement/movementAction.js";

export class GravityApplier {
    static apply(component: DynamicComponent, world: World) {
        ComponentMover.move(component, MovementAction.MoveDown, world, world.gravityAcceleration)
    }
}