import {MovementAction} from "../action/movement/movementAction.js";
import {Coordinate} from "../dimension/coordinate.js";
import {DynamicComponent} from "../component/dynamic/dynamicComponent.js";
import {AbstractComponent} from "../component/abstractComponent.js";
import {CollisionDetector} from "./collisionDetector.js";
import {World} from "../component/static/world";

export class ComponentMover {
    private static readonly UNITS_PER_FRAME: number = 1

    static moveComponent(component: DynamicComponent, movementAction: MovementAction, world: World) {
        const nextPosition = ComponentMover.getNextPosition(component, movementAction)
        const collision: [boolean, AbstractComponent] = CollisionDetector.doesCollide(component, nextPosition, world)
        const doesCollide = collision[0]
        if (doesCollide) {
            const collidableComponent = collision[1]
            console.log(`Collision detected!\n component=${component.toString()}\n collidableComponent=${collidableComponent.toString()}\n desiredPosition=${nextPosition.toString()}`)

            const nextValidPosition = CollisionDetector.getClosestNonCollidablePosition(component, nextPosition, collidableComponent)
            component.setPosition(nextValidPosition)
        } else {
            component.setPosition(nextPosition)
            const newVelocity = component.getVelocity() + component.getAcceleration()
            component.setVelocity(newVelocity)
        }
    }

    static getNextPosition(component: DynamicComponent, movementAction: MovementAction): Coordinate {
        const dX = ComponentMover.UNITS_PER_FRAME * component.getVelocity()
        const dY = ComponentMover.UNITS_PER_FRAME * component.getVelocity()
        switch (movementAction) {
            case MovementAction.MoveUp:
                return component.position.add(0, -dY)
            case MovementAction.MoveDown:
                return component.position.add(0, dY)
            case MovementAction.MoveLeft:
                return component.position.add(-dX, 0)
            case MovementAction.MoveRight:
                return component.position.add(dX, 0)
            default:
                return component.position
        }
    }
}