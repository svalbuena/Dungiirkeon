import {MovementAction} from "../action/movement/movementAction.js";
import {Coordinate} from "../dimension/coordinate.js";
import {DynamicComponent} from "../component/dynamic/dynamicComponent.js";
import {AbstractComponent} from "../component/abstractComponent.js";
import {CollisionDetector} from "./collisionDetector.js";

export class ComponentMover {
    static moveComponent(component: DynamicComponent, movementAction: MovementAction, collidableComponents: AbstractComponent[], world: AbstractComponent) {
        const nextPosition = ComponentMover.getNextPosition(component, movementAction)
        const collision: [boolean, AbstractComponent] = CollisionDetector.doesCollide(component, nextPosition, collidableComponents, world)
        const doesCollide = collision[0]
        if (doesCollide) {
            const collidableComponent = collision[1]
            console.log(`Collision detected!\n component=${component.toString()}\n collidableComponent=${collidableComponent.toString()}\n desiredPosition=${nextPosition.toString()}`)

            const nextValidPosition = CollisionDetector.getClosestNonCollidablePosition(component, nextPosition, collidableComponent)
            component.setPosition(nextValidPosition)
        } else {
            component.setPosition(nextPosition)
        }
    }

    static getNextPosition(component: DynamicComponent, movementAction: MovementAction): Coordinate {
        switch (movementAction) {
            case MovementAction.MoveUp:
                return component.position.add(0, -1 * component.acceleration)
            case MovementAction.MoveDown:
                return component.position.add(0, 1 * component.acceleration)
            case MovementAction.MoveLeft:
                return component.position.add(-1 * component.acceleration, 0)
            case MovementAction.MoveRight:
                return component.position.add(1 * component.acceleration, 0)
            default:
                return component.position
        }
    }
}