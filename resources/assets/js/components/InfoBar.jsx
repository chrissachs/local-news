import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AboutDialog from './about/AboutDialog'
import Imprint from './about/Imprint'
import LinearProgress from '@material-ui/core/LinearProgress'

import MenuItem from '../container/about/MenuItem'

const InfoBar = ({loading, openDialog, closeDialog, toggleMenu, closeMenu, menuRef}) => {
    const open = Boolean(menuRef)
    return (
        <AppBar position="static" style={{zIndex:2049}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Menu"
                    onClick={(event) => {toggleMenu(event.currentTarget)}}
                >
                    <MenuIcon />

                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={menuRef}
                    open={open}
                    onClose={closeMenu}
                    style={{zIndex: 2050}}
                >
                    <MenuItem target={"about"}>Info</MenuItem>
                    <MenuItem target={"imprint"}>Impressum</MenuItem>
                </Menu>
                <Typography variant="title" color="inherit" style={{flexGrow:1}}>
                    Local news
                </Typography>
            </Toolbar>
            <AboutDialog
                onClose={closeDialog}
                open={openDialog === 'about'}
            />
            <Imprint
                onClose={closeDialog}
                open={openDialog === 'imprint'}
            />
            {loading && <LinearProgress color="secondary" />}
        </AppBar>
    )
}

InfoBar.propTypes = {
    loading: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    openDialog: PropTypes.string,
    menuRef: PropTypes.object,
}

export default InfoBar