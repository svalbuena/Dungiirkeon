import {Coordinate} from "./coordinate";

export class Area {
    topLeftCorner: Coordinate
    botRightCorner: Coordinate

    constructor(topLeftCorner: Coordinate, botRightCorner: Coordinate) {
        this.topLeftCorner = topLeftCorner
        this.botRightCorner = botRightCorner
    }

    isOutsideOf(area: Area): boolean {
        return this.botRightCorner.x < area.topLeftCorner.x ||
               this.topLeftCorner.x > area.botRightCorner.x ||
               this.botRightCorner.y < area.topLeftCorner.y ||
               this.topLeftCorner.y > area.botRightCorner.y
    }

    isInsideOf(area: Area): boolean {
        return this.botRightCorner.x <= area.botRightCorner.x &&
               this.topLeftCorner.x >= area.topLeftCorner.x &&
               this.botRightCorner.y <= area.botRightCorner.y &&
               this.topLeftCorner.y >= area.topLeftCorner.y
    }

    toString(): string {
        return `[topLeft=${this.topLeftCorner.toString()}, botRight=${this.botRightCorner.toString()}]`
    }
}