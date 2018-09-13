import React from 'react'
import InfoBar from "../container/InfoBar"
import Map from "../container/Map"
import Sidebar from "../container/Sidebar"
import ThemeProvider from '../ColorTheme'

export default () => {
    return (
        <ThemeProvider>
            <div id={'wrapper'} style={{display:'flex'}}>
                <InfoBar/>
                <Map/>
                <Sidebar/>
            </div>
        </ThemeProvider>
    )
}