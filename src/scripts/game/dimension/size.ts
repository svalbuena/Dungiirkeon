export class Size {
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    add(dWidth: number, dHeight: number): Size {
        return new Size(this.width + dWidth, this.height + dHeight)
    }
}