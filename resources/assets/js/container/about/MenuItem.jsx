import { connect } from 'react-redux'
import { toggleDialog} from "../../actions/about";
import MenuItem from '@material-ui/core/MenuItem'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(toggleDialog(ownProps.target))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(MenuItem)
