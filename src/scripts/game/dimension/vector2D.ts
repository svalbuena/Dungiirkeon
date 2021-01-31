export class Vector2D {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = Vector2D.toThreeDecimalsNumber(x)
        this.y = Vector2D.toThreeDecimalsNumber(y)
    }

    static of(x: number, y: number): Vector2D {
        return new Vector2D(x, y)
    }

    static ofRadians(radians: number, magnitude: number): Vector2D {
        return Vector2D.of(Math.cos(radians) * magnitude, Math.sin(radians) * magnitude)
    }

    static fromDegrees(degrees: number, magnitude: number): Vector2D {
        const radians: number = degrees * Math.PI / 180
        return new Vector2D(Math.cos(radians) * magnitude, Math.sin(radians) * magnitude)
    }

    add(that: Vector2D): Vector2D {
        return Vector2D.of(this.x + that.x, this.y + that.y)
    }

    sub(that: Vector2D): Vector2D {
        return Vector2D.of(this.x - that.x, this.y - that.y)
    }

    mul(scalar: number): Vector2D {
        return Vector2D.of(this.x * scalar, this.y * scalar)
    }

    div(scalar: number): Vector2D {
        return Vector2D.of(this.x / scalar, this.y / scalar)
    }

    limit(magnitude: number): Vector2D {
        if (this.magnitude() > magnitude) {
            return Vector2D.ofRadians(this.radians(), magnitude)
        }
        return this
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    radians(): number {
        return Math.atan2(this.y, this.x)
    }

    degrees(): number {
        const degrees = 180 * this.radians() / Math.PI
        return (Math.round(degrees) + 360) % 360
    }

    normalize(): Vector2D {
        const magnitude = this.magnitude()
        if (magnitude == 0) {
            return this
        }
        return this.div(magnitude)
    }

    equals(that: Vector2D): boolean {
        return this.x == that.x && this.y == that.y
    }

    toString(): string {
        return `[x=${this.x}, y=${this.y}]`
    }

    private static toThreeDecimalsNumber(number: number): number {
        return Number.parseFloat(number.toFixed(3))
    }
}