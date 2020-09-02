import {Coordinate} from "./coordinate.js";

export class Hitbox {
    topLeftCorner: Coordinate
    botRightCorner: Coordinate

    constructor(topLeftCorner: Coordinate, botRightCorner: Coordinate) {
        this.topLeftCorner = topLeftCorner
        this.botRightCorner = botRightCorner
    }

    isOutsideOf(hitbox: Hitbox): boolean {
        return this.botRightCorner.x < hitbox.topLeftCorner.x ||
               this.topLeftCorner.x > hitbox.botRightCorner.x ||
               this.botRightCorner.y < hitbox.topLeftCorner.y ||
               this.topLeftCorner.y > hitbox.botRightCorner.y
    }

    isInsideOf(hitbox: Hitbox): boolean {
        return this.botRightCorner.x <= hitbox.botRightCorner.x &&
               this.topLeftCorner.x >= hitbox.topLeftCorner.x &&
               this.botRightCorner.y <= hitbox.botRightCorner.y &&
               this.topLeftCorner.y >= hitbox.topLeftCorner.y
    }

    toString(): string {
        return `[topLeft=${this.topLeftCorner.toString()}, botRight=${this.botRightCorner.toString()}]`
    }
}