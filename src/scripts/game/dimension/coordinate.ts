export class Coordinate {
    x: number
    y: number

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
}