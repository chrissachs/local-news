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
            activeArticleId: null
        }
    }

    static getLocationIds(item) {
        const locationIds = []
        item.locations.forEach((location) => {
            locationIds.push(location.entity.id)
        })
        return locationIds

    }

    setActiveArticle = (activeArticleId) => {
        this.setState({activeArticleId})
    }

    getArticlesToShow() {
        let {articles} = this.props
        const {selectedEntityIds} = this.props
        if(selectedEntityIds.length  === 0) {
            return articles
        }
        return articles.filter((article) => {
            let isSelected = false
            article.locations.forEach((location) => {
                console.log(selectedEntityIds)
                if(!isSelected && (selectedEntityIds.indexOf(location.entity.id) >= 0)) {
                    isSelected = true
                }
            })
            return isSelected
        })

    }



    listItems() {
        return this.getArticlesToShow().map((item) => {
            const {hoverLocation, leaveLocation, activeEntityIds} = this.props
            const {activeArticleId} = this.state
            const locationIds = ArticleSidebar.getLocationIds(item)
            const intersect = locationIds.filter((id) => {
                return activeEntityIds.indexOf(id) >= 0
            })
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
                    setActiveArticleId={this.setActiveArticle}
                    key={item.id}
                    activeArticleId={activeArticleId}
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
