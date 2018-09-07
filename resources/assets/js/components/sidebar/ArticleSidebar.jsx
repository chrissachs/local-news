import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from './Article'

export default class ArticleSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            locations: [],
            activeEntityIds: [],
        }
    }

    static getLocationIds(item) {
        const locationIds = []
        item.locations.forEach((location) => {
            locationIds.push(location.entity.id)
        })
        return locationIds

    }


    listItems() {
        return this.props.articles.map((item) => {
            const {hoverLocation, leaveLocation, activeEntityIds} = this.props
            const locationIds = ArticleSidebar.getLocationIds(item)
            const intersect = locationIds.filter((id) => {
                return activeEntityIds.indexOf(id) >= 0
            })
            console.log(intersect)
            const highlight = intersect.length > 0
            return (
                <Article
                    item={item}
                    style={{marginBottom:'1rem'}}
                    onMouseOver={() => {
                        hoverLocation(locationIds)
                    }}
                    onMouseOut={() => {
                        leaveLocation(locationIds)
                    }
                    }
                    key={item.id}
                    highlight={(highlight)}
                />
            )
        })
    }

    render() {
        return this.listItems()
    }
}
ArticleSidebar.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    hoverLocation: PropTypes.func.isRequired,
    leaveLocation: PropTypes.func.isRequired,
    activeEntityIds: PropTypes.arrayOf(PropTypes.number).isRequired,

}
