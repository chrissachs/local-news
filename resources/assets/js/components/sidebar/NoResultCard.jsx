import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

export default () => {
    return (
        <Card style={{marginTop: '4em', padding:'2em'}}>
            <Typography variant={"subheading"}>Sorry</Typography>
            <Typography>
                Für den Bereich gibt es aktuell keine News...
            </Typography>
        </Card>
    )
}