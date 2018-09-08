import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AboutDialog from './AboutDialog'

export default class InfoBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            aboutDialogOpen: false
        }
    }

    toggleMenu = event => {
        console.log('open')
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        console.log(this)
        console.log('clos')
        this.setState({ anchorEl: null })
    }


    openAbout = () => {
        this.setState({aboutDialogOpen: true})
        this.handleClose()
    }

    closeAbout = () => {
        this.setState({aboutDialogOpen: false})
    }

    render() {
        const {anchorEl, aboutDialogOpen} = this.state
        const open = Boolean(anchorEl)
        return (
            <AppBar position="static" style={{zIndex:2049}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={this.toggleMenu}
                    >
                        <MenuIcon />

                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        style={{zIndex: 2050}}
                    >
                        <MenuItem onClick={this.openAbout}>Info</MenuItem>
                        <MenuItem onClick={this.handleClose}>Impressum</MenuItem>
                    </Menu>
                    <Typography variant="title" color="inherit">
                        Local news
                    </Typography>
                </Toolbar>
                <AboutDialog
                    onClose={this.closeAbout}
                    open={aboutDialogOpen}
                />
            </AppBar>

        )
    }
}
