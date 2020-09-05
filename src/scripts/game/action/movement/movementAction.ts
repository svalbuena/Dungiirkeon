import {Key} from "../../event/key/key.js";

export enum MovementAction {
    MoveUp,
    MoveDown,
    MoveLeft,
    MoveRight,
    Jump,
    None
}

export class KeyToActionMovementConverter {
    static convert(keys: Set<Key>): Set<MovementAction> {
        const actions: Set<MovementAction> = new Set()
        if (keys.has(Key.Up)) {
            actions.add(MovementAction.MoveUp)
        }
        if (keys.has(Key.Down)) {
            actions.add(MovementAction.MoveDown)
        }
        if (keys.has(Key.Left)) {
            actions.add(MovementAction.MoveLeft)
        }
        if (keys.has(Key.Right)) {
            actions.add(MovementAction.MoveRight)
        }
        if (keys.has(Key.Space)) {
            actions.add(MovementAction.Jump)
        }
        return actions
    }
}