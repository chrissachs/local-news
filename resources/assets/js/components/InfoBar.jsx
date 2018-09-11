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
import Imprint from './about/Imprint'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class InfoBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            aboutDialogOpen: false,
            imprintOpen: false,
        }
    }

    toggleMenu = event => {
        this.setState({anchorEl: event.currentTarget})
    }

    closeMenu = () => {
        this.setState({ anchorEl: null })
    }


    openAbout = () => {
        this.setState({aboutDialogOpen: true})
        this.closeMenu()
    }

    closeAbout = () => {
        this.setState({aboutDialogOpen: false})
    }

    openImprint = () => {
        this.setState({imprintOpen: true})
        this.closeMenu()
    }

    closeImprint = () => {
        this.setState({imprintOpen: false})
    }


    render() {
        const {anchorEl, aboutDialogOpen, imprintOpen} = this.state
        const {loading} = this.props
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
                        onClose={this.closeMenu}
                        style={{zIndex: 2050}}
                    >
                        <MenuItem onClick={this.openAbout}>Info</MenuItem>
                        <MenuItem onClick={this.openImprint}>Impressum</MenuItem>
                    </Menu>
                    <Typography variant="title" color="inherit" style={{flexGrow:1}}>
                        Local news
                    </Typography>
                    {loading && (
                        <CircularProgress
                            size={20}
                            thickness={5}
                            color={"secondary"}
                        />)
                    }
                </Toolbar>
                <AboutDialog
                    onClose={this.closeAbout}
                    open={aboutDialogOpen}
                />
                <Imprint
                    onClose={this.closeImprint}
                    open={imprintOpen}
                    />
            </AppBar>

        )
    }
}
