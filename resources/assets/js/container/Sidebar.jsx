import { connect } from 'react-redux'
import Sidebar from '../components/sidebar/Sidebar'
import {toggleActive, toggleSelect} from "../actions/locations"

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles || [],
        locations: state.locations.locations || [],
        activeEntityIds: state.locations.active || [],
        selectedEntityIds: state.locations.selected || [],
        loading: state.articles.loading || false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleActiveLocations: (locationIds) => {
            dispatch(toggleActive(locationIds))
        },
        toggleLocationSelect:(locationId) => {
            dispatch(toggleSelect(locationId))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)
