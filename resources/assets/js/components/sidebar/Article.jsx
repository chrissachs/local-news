import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ColorTheme from './../../ColorTheme'
import Color from 'color'
import LinkIcon from '@material-ui/icons/Link'
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

    shortenString = (string) => {
        const cutFrom = 100
        if(string.length < cutFrom) {
            return string
        }

        const firstDot = string.indexOf('.', cutFrom) + 1
        if(firstDot < 0) {
            return string
        }
        return string.substring(0, firstDot)
    }

    onClick = () => {
        const {item, setActiveArticleId} = this.props
        setActiveArticleId(item.id)
    }

    render() {
        const {item, highlight, activeArticleId} = this.props
        const style = {margin:'0.5em',padding:'0.5em 1em'}
        if(highlight) {
            style.backgroundColor = Color(ColorTheme.palette.primary.light).lighten(0.8)
        }

        const isActive = item.id === activeArticleId

        if(!isActive) {
            style.cursor = 'pointer'
        }

        return (
            <Paper
                onMouseEnter={this.onMouseOver}
                onMouseLeave={this.onMouseOut}
                style={style}
                elevation={highlight ? 3 : 1}
                onClick={this.onClick}
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
                        {isActive && (
                            <Button
                                size={"small"}
                                variant={"contained"}
                                href={item.url}
                                color={'primary'}
                                target={'_blank'}
                            >
                                <LinkIcon/> zum Artikel
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <Typography gutterBottom>
                            {isActive ? item.description : this.shortenString(item.description)}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
