import { connect } from 'react-redux'
import {toggleActive, toggleSelect} from '../../actions/locations'
import LocationMarker from '../../components/map/LocationMarker'

const mapStateToProps = (state) => {
    return {
        activeEntityIds: state.locations.active || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLocationActive: (locationIds) => {
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
)(LocationMarker)
