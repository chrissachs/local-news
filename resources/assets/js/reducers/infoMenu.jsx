import {TOGGLE_DIALOG, TOGGLE_MENU} from "../actions/about";

const reducers = (state = [], action) => {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return {
                openDialog: action.dialog || null
            }
        case TOGGLE_MENU:
            return {
                menuRef: action.ref || null
            }
        default:
            return state

    }
}

export default reducers