import {MovementAction} from "../../action/movement/movementAction.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {DynamicComponent} from "../../component/dynamic/dynamicComponent.js";
import {CollisionDetector} from "../collision/collisionDetector.js";
import {World} from "../../component/static/world.js";
import {Path} from "./path.js";
import {Direction} from "./direction.js";

export class ComponentMover {
    private static readonly UNITS_PER_FRAME: number = 1

    static move(component: DynamicComponent, action: MovementAction, world: World, acceleration: number): void {
        switch (action) {
            case MovementAction.MoveLeft:
                this.moveUntilCollision(component, Direction.Left, world, acceleration)
                break
            case MovementAction.MoveRight:
                this.moveUntilCollision(component, Direction.Right, world, acceleration)
                break
            case MovementAction.MoveDown:
                this.moveUntilCollision(component, Direction.Down, world, acceleration)
                break
            case MovementAction.Jump:
                if (CollisionDetector.isOnGround(component, world)) {
                    this.moveUntilCollision(component, Direction.Up, world, 1)
                }
                break
        }
    }

    private static moveUntilCollision(component: DynamicComponent, direction: Direction, world: World, acceleration: number): void {
        const toPosition = ComponentMover.getNextPosition(component, direction)
        const path = new Path(component.position, toPosition)
        while (path.hasNext()) {
            const position = path.next()
            if (CollisionDetector.doesCollide(component, position, world)) break
            component.setPosition(position)
            component.setVelocity(ComponentMover.computeNewVelocity(component, acceleration))
        }
    }

    static getNextPosition(component: DynamicComponent, direction: Direction): Coordinate {
        const dX = Math.ceil(ComponentMover.UNITS_PER_FRAME * component.getVelocity())
        const dY = Math.ceil(ComponentMover.UNITS_PER_FRAME * component.getVelocity())
        switch (direction) {
            case Direction.Up:
                return component.position.add(0, -dY)
            case Direction.Down:
                return component.position.add(0, dY)
            case Direction.Left:
                return component.position.add(-dX, 0)
            case Direction.Right:
                return component.position.add(dX, 0)
            default:
                return component.position
        }
    }

    private static computeNewVelocity(component: DynamicComponent, acceleration: number): number {
        return component.getVelocity() + acceleration
    }
}