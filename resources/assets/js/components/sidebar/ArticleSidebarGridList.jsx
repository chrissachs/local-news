import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'


export default class ArticleSidebarGridList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            locations: [],
            activeItemId: null,
            activeEntityId: null,
        }
    }
    // TODO: use https://material-ui.com/api/grid-list-tile/ ?
    listItems() {
        const displayed = []
        return this.props.articles.map((item) => {
            if(displayed.indexOf(item.id) > -1) {
                return // FIXME: get articles only once from api
            }
            const {hoverLocation, leaveLocation} = this.props
            displayed.push(item.id)
            const highlight = item.location.entity.id === this.props.activeEntityId
            return (
                    <GridListTile key={item.id}
                                  onMouseEnter={() => {hoverLocation(item.location.entity.id)}}
                                  onMouseLeave={() => {leaveLocation(item.location.entity.id)}}

                    >
                        <img src={item.image} alt={item.title} />
                        <GridListTileBar
                            title={item.title}
                            subtitle={<span>by: TODO</span>}
                            actionIcon={
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
            )
        })
    }

    render() {
        return (
            <GridList cellHeight={120} cols={2}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">TODO: some nice wording</ListSubheader>
                </GridListTile>
                {this.listItems()}

            </GridList>

    )
    }
}
ArticleSidebarGridList.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    hoverLocation: PropTypes.func.isRequired,
    leaveLocation: PropTypes.func.isRequired,
    activeEntityId: PropTypes.number

}
