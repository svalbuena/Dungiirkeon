export class Coordinate {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(dX: number, dY: number): Coordinate {
        return new Coordinate(this.x + dX, this.y + dY)
    }

    toString(): string {
        return `[x=${this.x}, y=${this.y}]`
    }

    equals(that: Coordinate): boolean {
        return this.x == that.x && this.y == that.y
    }

    getDX(that: Coordinate): number {
        return that.x - this.x
    }

    getDY(that: Coordinate): number {
        return that.y - this.y
    }
}