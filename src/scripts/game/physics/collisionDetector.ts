import {AbstractComponent} from "../component/abstractComponent.js";
import {Coordinate} from "../dimension/coordinate.js";
import {Hitbox} from "../dimension/myHitbox.js";

export class CollisionDetector {
    static doesCollide(component: AbstractComponent, position: Coordinate, collidableComponents: AbstractComponent[], world: AbstractComponent): [boolean, AbstractComponent] {
        const componentArea = component.getHitboxAt(position)
        if (this.isOutsideTheWorld(component, position, world)) return [true, world]
        for (const collidableComponent of collidableComponents) {
            if (component != collidableComponent) {
                if (!componentArea.isOutsideOf(collidableComponent.getHitbox())) {
                    return [true, collidableComponent]
                }
            }
        }
        return [false, null]
    }

    static getClosestNonCollidablePosition(component: AbstractComponent, desiredPosition: Coordinate, collidableComponent: AbstractComponent): Coordinate {
        const desiredDX: number = desiredPosition.x - component.position.x
        const desiredDY: number = desiredPosition.y - component.position.y
        const componentHitbox: Hitbox = component.getHitbox()
        const collidableComponentHitbox: Hitbox = collidableComponent.getHitbox()

        let validDX: number = 0
        let validDY: number = 0
        if (componentHitbox.isOutsideOf(collidableComponentHitbox)) {
            if (desiredDX > 0) {
                validDX = collidableComponentHitbox.topLeftCorner.x - componentHitbox.botRightCorner.x - 1
            } else if (desiredDX < 0) {
                validDX = collidableComponentHitbox.botRightCorner.x - componentHitbox.topLeftCorner.x + 1
            } else if (desiredDY > 0) {
                validDY = collidableComponentHitbox.topLeftCorner.y - componentHitbox.botRightCorner.y - 1
            } else if (desiredDY < 0) {
                validDY = collidableComponentHitbox.botRightCorner.y - componentHitbox.topLeftCorner.y + 1
            }
        } else if (componentHitbox.isInsideOf(collidableComponentHitbox)) {
            if (desiredDX > 0) {
                validDX = collidableComponentHitbox.botRightCorner.x - componentHitbox.botRightCorner.x
            } else if (desiredDX < 0) {
                validDX = collidableComponentHitbox.topLeftCorner.x - componentHitbox.topLeftCorner.x
            } else if (desiredDY > 0) {
                validDY = collidableComponentHitbox.botRightCorner.y - componentHitbox.botRightCorner.y
            } else if (desiredDY < 0) {
                validDY = collidableComponentHitbox.topLeftCorner.y - componentHitbox.topLeftCorner.y
            }
        }

        return new Coordinate(component.position.x + validDX, component.position.y + validDY)
    }

    private static isOutsideTheWorld(component: AbstractComponent, position: Coordinate, world: AbstractComponent): boolean {
        const componentHitbox = component.getHitboxAt(position)
        return !componentHitbox.isInsideOf(world.getHitbox())
    }
}