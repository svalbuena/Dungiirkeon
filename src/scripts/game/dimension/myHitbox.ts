import {Vector2D} from './vector2D.js'

export class Hitbox {
    readonly center: Vector2D
    readonly topLeft: Vector2D
    readonly botRight: Vector2D

    constructor(center: Vector2D, topLeft: Vector2D, botRight: Vector2D) {
        this.center = center
        this.topLeft = topLeft
        this.botRight = botRight
    }

    static of(center: Vector2D, topLeft: Vector2D, botRight: Vector2D): Hitbox {
        return new Hitbox(center, topLeft, botRight)
    }

    isOutsideOf(hitbox: Hitbox): boolean {
        return this.botRight.x < hitbox.topLeft.x  ||
               this.topLeft.x  > hitbox.botRight.x ||
               this.botRight.y < hitbox.topLeft.y  ||
               this.topLeft.y  > hitbox.botRight.y
    }

    isInsideOf(hitbox: Hitbox): boolean {
        return this.botRight.x <= hitbox.botRight.x  &&
               this.topLeft.x  >= hitbox.topLeft.x   &&
               this.botRight.y <= hitbox.botRight.y  &&
               this.topLeft.y  >= hitbox.topLeft.y
    }

    isJustAbove(that: Hitbox): boolean {
        //console.log('this = ' + this + ' that = ' + that)
        const difference = that.topLeft.sub(this.botRight)
        return 0 <= difference.y && difference.y <= 1
    }

    isOnInnerBase(that: Hitbox): boolean {
        return this.botY() == that.botY()
    }

    toString(): string {
        return `[topLeft=${this.topLeft.toString()}, botRight=${this.botRight.toString()}]`
    }

    translate(position: Vector2D): Hitbox {
        const vector = position.sub(this.center)
        return Hitbox.of(position, this.topLeft.add(vector), this.botRight.add(vector))
    }

    private isOnNextY(that: Hitbox): boolean {
        return this.botY() + 1 == that.topY()
    }

    private isAnyXSame(that: Hitbox): boolean {
        return this.leftX() >= that.leftX() && this.leftX() <= that.rightX() ||
               this.rightX() <= that.rightX() && this.rightX() >= that.leftX()
    }

    private leftX(): number {
        return this.topLeft.x
    }

    private rightX(): number {
        return this.botRight.x
    }

    private topY(): number {
        return this.topLeft.y
    }

    private botY(): number {
        return this.botRight.y
    }
}