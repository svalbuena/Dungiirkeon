import {Component} from "../../component/component.js";
import {World} from "../../component/world.js";
import {Vector2D} from '../../dimension/vector2D.js'

export class CollisionDetector {
    static isOnGround(component: Component, components: Component[]): Component {
        return components
            .filter(otherComponent => otherComponent != component)
            .find(otherComponent => component.hitbox().isJustAbove(otherComponent.hitbox()))
    }

    static doesCollide(component: Component, position: Vector2D, components: Component[]): boolean {
        //if (this.isOutsideTheWorld(component, position, world)) return true
        const collidableComponent = components
            .filter(worldComponent => worldComponent != component)
            .find(otherComponent => !component.hitbox().translate(position).isOutsideOf(otherComponent.hitbox()))
        return collidableComponent != undefined
    }

    /*private static isOutsideTheWorld(component: Component, position: Vector2D, components: Component[]): boolean {
        return !component.hitbox().translate(position).isInsideOf(world.hitbox())
    }*/
}