import {MovementAction} from "../../action/movement/movementAction.js";
import {CollisionDetector} from "../collision/collisionDetector.js";
import {Component} from '../../component/component.js'
import {Vector2D} from '../../dimension/vector2D.js'

export class ComponentMover {
    static move(component: Component, components: Component[], timeElapsed: number): void {
        this.moveUntilCollision(component, components, timeElapsed)
    }

    private static moveUntilCollision(component: Component, components: Component[], timeElapsed: number): void {
        const fromPosition = component.position
        const toPosition = ComponentMover.getNextPosition(component, timeElapsed)
        while (component.position.sub(fromPosition).magnitude() < toPosition.sub(fromPosition).magnitude()) {
            const step = ComponentMover.getValidStep(component, components)
            if (step.magnitude() == 0) {
                //A step with magnitude 0 means the component can't move
                break
            }
            component.setPosition(component.position.add(step))
        }
    }

    private static getValidStep(component: Component, components: Component[]): Vector2D {
        const fullStep = component.velocity.normalize().mul(1)
        if (!CollisionDetector.doesCollide(component, component.position.add(fullStep), components)) {
            return fullStep
        }
        const xStep = Vector2D.of(fullStep.x, 0)
        if (!CollisionDetector.doesCollide(component, component.position.add(xStep), components)) {
            return xStep
        }
        const yStep = Vector2D.of(0, fullStep.y)
        if (!CollisionDetector.doesCollide(component, component.position.add(yStep), components)) {
            return yStep
        }
        return Vector2D.of(0, 0)
    }

    private static getNextPosition(component: Component, timeElapsed: number): Vector2D {
        return component.position.add(component.velocity)
    }

    static movementActionToForce(action: MovementAction, component: Component, components: Component[]): Vector2D {
        switch (action) {
            case MovementAction.MoveLeft:
                return Vector2D.fromDegrees(180, 1)
            case MovementAction.MoveRight:
                return Vector2D.fromDegrees(0, 1)
            case MovementAction.MoveDown:
                return Vector2D.fromDegrees(90, 1)
            case MovementAction.MoveUp:
                return Vector2D.fromDegrees(270, 1)
            case MovementAction.Jump:
                if (CollisionDetector.isOnGround(component, components)) {
                    return Vector2D.fromDegrees(270, 12)
                }
                return Vector2D.fromDegrees(0, 0)
        }
    }
}