import {World} from "../../component/world.js";
import {Component} from '../../component/component.js'
import {CollisionDetector} from '../collision/collisionDetector.js'
import {Vector2D} from '../../dimension/vector2D.js'

export class GravityApplier {
    /*static apply(component: Component, world: World, elapsedTime: number) {
        if (!CollisionDetector.isOnGround(component, world)) {
            const gravity: Vector2D = world.gravity
            const dX = gravity.x * elapsedTime
            const dY = gravity.y * elapsedTime
        }
        //ComponentMover.move(component, MovementAction.MoveDown, world, world.gravity)
    }*/
}