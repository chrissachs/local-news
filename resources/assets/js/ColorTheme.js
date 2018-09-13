import React from 'react'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles/index";

export const ColorTheme = createMuiTheme({
    palette: {
        primary: {main: '#008394'},
        secondary: {main: '#ff9505'},
    },
})

export default ({children}) => {
    return (
        <MuiThemeProvider theme={ColorTheme}>
            {children}
        </MuiThemeProvider>
    )
}
