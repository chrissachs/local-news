export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'
export const TOGGLE_MENU = 'TOGGLE_MENU'

export const toggleDialog = (dialog = null) => {
    return {
        type: TOGGLE_DIALOG,
        dialog
    }
}

export const toggleMenu = (ref) => {
    return {
        type: TOGGLE_MENU,
        ref
    }
}