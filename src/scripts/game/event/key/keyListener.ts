import {Key} from "./key.js";

export class KeyListener {
    private readonly pressedKeys: Set<Key> = new Set()

    constructor() {
        document.addEventListener('keydown', event => this.keyPressedListener(event))
        document.addEventListener('keyup', event => this.keyReleasesListener(event))
    }

    getPressedKeys(): Set<Key> {
        return this.pressedKeys
    }

    private keyPressedListener(event) {
        const key = KeyListener.getEventKey(event)
        this.pressedKeys.add(key)
    }

    private keyReleasesListener(event) {
        const key = KeyListener.getEventKey(event)
        this.pressedKeys.delete(key)
    }

    private static getEventKey(event) {
        const eventKey = event.key
        if (KeyListener.isUpKey(eventKey)) {
            return Key.Up
        } else if (KeyListener.isDownKey(eventKey)) {
            return Key.Down
        } else if (KeyListener.isLeftKey(eventKey)) {
            return Key.Left
        } else if (KeyListener.isRightKey(eventKey)) {
            return Key.Right
        }
        return Key.Unknown
    }

    private static isUpKey(key: string): boolean {
        return key == 'ArrowUp' || key == 'w'
    }
    private static isDownKey(key: string): boolean {
        return key == 'ArrowDown' || key == 's'
    }
    private static isLeftKey(key: string): boolean {
        return key == 'ArrowLeft' || key == 'a'
    }
    private static isRightKey(key: string): boolean {
        return key == 'ArrowRight' || key == 'd'
    }
}