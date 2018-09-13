import {TOGGLE_ACTIVE_LOCATION, TOGGLE_SELECT_LOCATION} from "../actions/locations";
import {RECEIVE_ARTICLES} from '../actions/articleApi'

const getUniqueLocationsFromArticles= (data) => {
    const entities = []
    const entityIds = []
    data.forEach((item) => {
        item.locations.forEach((location) => {
            if(entityIds.indexOf(location.entity.id) > -1) {
                return
            }
            entityIds.push(location.entity.id)
            entities.push(location)
        })
    })
    return entities
}

const getLocationIds =(locations) => {
    return locations.map((location) => {
        return location.entity.id}
    )
}

const filterExisting =(ids, existingIds) => {
    return ids.filter((id) => existingIds.indexOf(id) >= 0)
}


const reducers = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ARTICLES:
            const {articles} = action
            const locations = getUniqueLocationsFromArticles(articles)
            let newState = {
                locations
            }

            if(state.hasOwnProperty('selected')) {
                newState.selected = filterExisting(state.selected, getLocationIds(locations))
            }

            if(state.hasOwnProperty('active')) {
                newState.active= filterExisting(state.active, getLocationIds(locations))
            }
            return Object.assign({},state, newState)
        case TOGGLE_ACTIVE_LOCATION:
            return Object.assign(
                {},
                state,
                {
                    active: action.locationIds || []
                }
            )
        case TOGGLE_SELECT_LOCATION:
            let selected = state.selected
            if(typeof selected === 'undefined') {
                selected = []
            } else {
                selected = [...selected]
            }

            const {locationId} = action
            const index = selected.indexOf(locationId)
            if(index >= 0) {
                selected.splice(index,1)
            } else {
                selected.push(locationId)
            }
            return Object.assign({}, state, {selected})
        default:
            return state
    }
}

export default reducers