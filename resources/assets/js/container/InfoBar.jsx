import { connect } from 'react-redux'
import { toggleMenu, toggleDialog } from '../actions/about'
import InfoBar from '../components/InfoBar'

const mapStateToProps = (state) => {
    return {
        openDialog: state.infoMenu.openDialog || null,
        menuRef: state.infoMenu.menuRef || null,
        loading: state.articles.loading || false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: (ref) => {
            dispatch(toggleMenu(ref))
        },
        closeMenu: () => {
            dispatch(toggleMenu(null))
        },
        closeDialog: () => {
            dispatch(toggleDialog())
            dispatch(toggleMenu(null))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoBar)
