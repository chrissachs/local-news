export const TOGGLE_ACTIVE_LOCATION = 'TOGGLE_ACTIVE_LOCATION'
export const TOGGLE_SELECT_LOCATION = 'TOGGLE_SELECT_LOCATION'

export const toggleActive = (ids) => {
    const locationIds = ids || []
    return {
        'type': TOGGLE_ACTIVE_LOCATION,
        locationIds
    }
}

export const toggleSelect = (locationId) => {
    return {
        'type': TOGGLE_SELECT_LOCATION,
        locationId,
    }
}