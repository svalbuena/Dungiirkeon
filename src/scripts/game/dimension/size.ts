export class Size {
    readonly width: number
    readonly height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    add(dWidth: number, dHeight: number): Size {
        return new Size(this.width + dWidth, this.height + dHeight)
    }
}