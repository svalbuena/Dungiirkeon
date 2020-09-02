import {AbstractComponent} from "../component/abstractComponent.js";
import {Coordinate} from "../dimension/coordinate.js";
import {Area} from "../dimension/area.js";

export class CollisionDetector {
    static doesCollide(component: AbstractComponent, position: Coordinate, collidableComponents: AbstractComponent[], world: AbstractComponent): [boolean, AbstractComponent] {
        const componentArea = component.getAreaAt(position)
        if (this.isOutsideTheWorld(component, position, world)) return [true, world]
        for (const collidableComponent of collidableComponents) {
            if (component != collidableComponent) {
                if (!componentArea.isOutsideOf(collidableComponent.getArea())) {
                    return [true, collidableComponent]
                }
            }
        }
        return [false, null]
    }

    static getClosestNonCollidablePosition(component: AbstractComponent, desiredPosition: Coordinate, collidableComponent: AbstractComponent): Coordinate {
        const desiredDX: number = desiredPosition.x - component.position.x
        const desiredDY: number = desiredPosition.y - component.position.y
        const componentArea: Area = component.getArea()
        const collidableComponentArea: Area = collidableComponent.getArea()

        let validDX: number = 0
        let validDY: number = 0
        if (componentArea.isOutsideOf(collidableComponentArea)) {
            if (desiredDX > 0) {
                validDX = collidableComponentArea.topLeftCorner.x - componentArea.botRightCorner.x - 1
            } else if (desiredDX < 0) {
                validDX = collidableComponentArea.botRightCorner.x - componentArea.topLeftCorner.x + 1
            } else if (desiredDY > 0) {
                validDY = collidableComponentArea.topLeftCorner.y - componentArea.botRightCorner.y - 1
            } else if (desiredDY < 0) {
                validDY = collidableComponentArea.botRightCorner.y - componentArea.topLeftCorner.y + 1
            }
        } else if (componentArea.isInsideOf(collidableComponentArea)) {
            if (desiredDX > 0) {
                validDX = collidableComponentArea.botRightCorner.x - componentArea.botRightCorner.x
            } else if (desiredDX < 0) {
                validDX = collidableComponentArea.topLeftCorner.x - componentArea.topLeftCorner.x
            } else if (desiredDY > 0) {
                validDY = collidableComponentArea.botRightCorner.y - componentArea.botRightCorner.y
            } else if (desiredDY < 0) {
                validDY = collidableComponentArea.topLeftCorner.y - componentArea.topLeftCorner.y
            }
        }

        return new Coordinate(component.position.x + validDX, component.position.y + validDY)
    }

    private static isOutsideTheWorld(component: AbstractComponent, position: Coordinate, world: AbstractComponent): boolean {
        const componentArea = component.getAreaAt(position)
        return !componentArea.isInsideOf(world.getArea())
    }
}