import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../../utils/shapes'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Color from 'color'
import {shortenString} from "../../utils/string"
import { withTheme } from '@material-ui/core/styles'


const Article = ({item, highlight, activeArticleId, onMouseOver, onMouseOut, setActiveArticleId, theme}) => {

    const style = {margin:'0.5em',padding:'0.5em 1em'}
    if(highlight) {
        style.backgroundColor = Color(theme.palette.primary.light).lighten(0.8)
    }

    const isActive = item.id === activeArticleId

    if(!isActive) {
        style.cursor = 'pointer'
    }

    return (
        <Paper
            onMouseEnter={() => onMouseOver(item)}
            onMouseLeave={() => onMouseOut(item)}
            style={style}
            elevation={highlight ? 3 : 1}
            onClick={() => setActiveArticleId(item.id)}
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
                            color={'secondary'}
                            target={'_blank'}
                        >
                          zum Artikel
                        </Button>
                    )}
                </Grid>
                <Grid item xs={8}>
                    <Typography gutterBottom>
                        {isActive ? item.description : shortenString(item.description)}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

Article.propTypes = {
    item: shapes.article.isRequired,
    highlight: PropTypes.bool,
    activeArticleId: PropTypes.arrayOf(PropTypes.number),
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    setActiveArticleId: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withTheme()(Article)

