import {Coordinate} from "../../dimension/coordinate.js";

export class Path {
    private static readonly UNIT_INCREMENT: number = 1
    private readonly startPosition: Coordinate
    private readonly endPosition: Coordinate
    private readonly dX: number
    private readonly dY: number
    private readonly lineEquation: (x: number) => number
    private currentPosition: Coordinate

    constructor(startPosition: Coordinate, endPosition: Coordinate) {
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.currentPosition = startPosition
        this.dX = this.startPosition.getDX(this.endPosition)
        this.dY = this.startPosition.getDY(this.endPosition)
        if (this.isDXNotZero()) {
            this.lineEquation = Path.lineEquation(this.dX, this.dY, this.startPosition)
        }
    }

    hasNext(): boolean {
        return !this.currentPosition.equals(this.endPosition)
    }

    next(): Coordinate {
        if (this.isDXNotZero()) {
            const nextX = this.currentPosition.x + Path.UNIT_INCREMENT * Math.sign(this.dX)
            this.currentPosition = new Coordinate(nextX, this.lineEquation(nextX))
        } else {
            const nextY = this.currentPosition.y + Path.UNIT_INCREMENT * Math.sign(this.dY)
            this.currentPosition = new Coordinate(this.currentPosition.x, nextY)
        }
        return this.currentPosition
    }

    private isDXNotZero(): boolean {
        return this.startPosition.getDX(this.endPosition) != 0
    }

    private static lineEquation(dX: number, dY: number, startPosition: Coordinate): (x: number) => number {
        const slope = dY/dX
        return (x: number) => slope * (x - startPosition.x) + startPosition.y
    }
}