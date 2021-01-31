import {Vector2D} from '../dimension/vector2D.js'

export class Pixel {
    static closestPosition(position: Vector2D): Vector2D {
        return Vector2D.of(Pixel.closestPixel(position.x), Pixel.closestPixel(position.y))
    }

    static closestPixel(number: number): number {
        if (number < 0) {
            return Math.floor(number)
        } else {
            return Math.ceil(number)
        }
    }
}