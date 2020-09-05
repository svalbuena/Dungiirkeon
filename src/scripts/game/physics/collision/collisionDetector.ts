import {AbstractComponent} from "../../component/abstractComponent.js";
import {Coordinate} from "../../dimension/coordinate.js";
import {World} from "../../component/static/world.js";

export class CollisionDetector {
    static isOnGround(component: AbstractComponent, world: World): boolean {
        const componentHitbox = component.getHitbox()
        const isJustAboveAnotherComponent = world.getComponents()
            .filter(collidableComponent => collidableComponent != component)
            .map(collidableComponent => collidableComponent.getHitbox())
            .some(collidableHitbox => componentHitbox.isJustAbove(collidableHitbox))
        const isJustAboveWorldBase = componentHitbox.isOnInnerBase(world.getHitbox())
        if (isJustAboveWorldBase) {
            console.log("TRUEEE")
        }
        //console.log(`isJustAboveAnotherComponent=${isJustAboveAnotherComponent} isJustAboveWorldBase=${isJustAboveWorldBase}`)
        return isJustAboveAnotherComponent || isJustAboveWorldBase
    }

    static doesCollide(component: AbstractComponent, atPosition: Coordinate, world: World): boolean {
        const componentHitbox = component.getHitboxAt(atPosition)
        if (this.isOutsideTheWorld(component, atPosition, world)) return true
        const collidableComponent = world.getComponents()
            .filter(worldComponent => worldComponent != component)
            .find(otherComponent => !componentHitbox.isOutsideOf(otherComponent.getHitbox()))
        return collidableComponent != undefined
    }

    private static isOutsideTheWorld(component: AbstractComponent, position: Coordinate, world: AbstractComponent): boolean {
        const componentHitbox = component.getHitboxAt(position)
        return !componentHitbox.isInsideOf(world.getHitbox())
    }
}