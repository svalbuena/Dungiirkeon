import {Coordinate} from "./coordinate.js";

export class Hitbox {
    readonly topLeftCorner: Coordinate
    readonly botRightCorner: Coordinate

    constructor(topLeftCorner: Coordinate, width: number, height: number) {
        this.topLeftCorner = topLeftCorner
        this.botRightCorner = new Coordinate(topLeftCorner.x + width - 1, topLeftCorner.y + height - 1)
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

    isJustAbove(that: Hitbox): boolean {
        return this.isOnNextY(that) && this.isAnyXSame(that)
    }

    isOnInnerBase(that: Hitbox): boolean {
        return this.botY() + 1 == that.botY()
    }

    toString(): string {
        return `[topLeft=${this.topLeftCorner.toString()}, botRight=${this.botRightCorner.toString()}]`
    }

    private isOnNextY(that: Hitbox): boolean {
        return this.botY() - 1 == that.topY()
    }

    private isAnyXSame(that: Hitbox): boolean {
        return this.leftX() >= that.leftX() && this.leftX() <= that.rightX() ||
               this.rightX() <= that.rightX() && this.rightX() >= that.leftX()
    }

    private leftX(): number {
        return this.topLeftCorner.x
    }

    private rightX(): number {
        return this.botRightCorner.x
    }

    private topY(): number {
        return this.topLeftCorner.y
    }

    private botY(): number {
        return this.botRightCorner.y
    }
}