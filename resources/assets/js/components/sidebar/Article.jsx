import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ColorTheme from './../../ColorTheme'
import Color from 'color'

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
    }
    onMouseOver() {
        if(typeof this.props.onMouseOver === 'function') {
            this.props.onMouseOver(this.props.item)
        }
    }

    onMouseOut() {
        if(typeof this.props.onMouseOut === 'function') {
            this.props.onMouseOut(this.props.item)
        }
    }

    render() {
        const {item, highlight} = this.props
        const style = {margin:'0.5em',padding:'0.5em 1em'}
        if(highlight) {
            style.backgroundColor = Color(ColorTheme.palette.primary.light).lighten(0.8)
        }

        return (
            <Paper
                onMouseEnter={this.onMouseOver}
                onMouseLeave={this.onMouseOut}
                style={style}
                elevation={highlight ? 3 : 1}
            >
                <Grid
                    container
                    spacing={8}
                    alignItems={'flex-start'}
                >
                    <Grid item xs={12}>
                        <Typography variant="title">
                            {item.title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        style={{textAlign: 'center'}}
                    >
                        <img style={{width:'100%'}} src={item.image} alt={item.title}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {item.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
