import {AbstractComponent} from "../component/abstractComponent.js";
import {Coordinate} from "../dimension/coordinate.js";
import {World} from "../component/static/world.js";

export class CollisionDetector {
    static isOnGround(component: AbstractComponent, world: World): boolean {
        const componentHitbox = component.getHitbox()
        const isJustAboveAnotherComponent = world.getComponents()
            .filter(collidableComponent => collidableComponent != component)
            .map(collidableComponent => collidableComponent.getHitbox())
            .some(collidableHitbox => componentHitbox.isJustAbove(collidableHitbox))
        const isJustAboveWorldBase = componentHitbox.isOnInnerBase(world.getHitbox())
        return isJustAboveAnotherComponent ||isJustAboveWorldBase
    }

    static doesCollide(component: AbstractComponent, atPosition: Coordinate, world: World): [boolean, AbstractComponent] {
        const componentHitbox = component.getHitboxAt(atPosition)
        if (this.isOutsideTheWorld(component, atPosition, world)) return [true, world]
        const collidableComponent = world.getComponents()
            .filter(worldComponent => worldComponent != component)
            .find(worldComponent => component != worldComponent && (!componentHitbox.isOutsideOf(worldComponent.getHitbox()) || componentHitbox.isPastOf(worldComponent.getHitbox())))
        if (collidableComponent == undefined) {
            return [false, null]
        } else {
            return [true, collidableComponent]
        }
    }

    static getClosestNonCollidablePosition(component: AbstractComponent, desiredPosition: Coordinate, collidableComponent: AbstractComponent): Coordinate {
        const desiredDX = desiredPosition.x - component.position.x
        const desiredDY = desiredPosition.y - component.position.y
        const componentHitbox = component.getHitbox()
        const collidableComponentHitbox = collidableComponent.getHitbox()

        let validDX = 0
        let validDY = 0
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

    private static collidesInTrajectory(component: AbstractComponent, collidableComponent: AbstractComponent, nextPosition: Coordinate): boolean {

    }

    private static isOutsideTheWorld(component: AbstractComponent, position: Coordinate, world: AbstractComponent): boolean {
        const componentHitbox = component.getHitboxAt(position)
        return !componentHitbox.isInsideOf(world.getHitbox())
    }
}