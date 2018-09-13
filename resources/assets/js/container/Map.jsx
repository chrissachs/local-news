import { connect } from 'react-redux'
import {fetchArticles} from "../actions/articleApi"
import MapWithMarker from '../components/MapWithMarkers'

const mapStateToProps = (state) => {
    return {
        locations: state.locations.locations || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles: (center, distance) => {
            dispatch(fetchArticles(center, distance))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapWithMarker)
