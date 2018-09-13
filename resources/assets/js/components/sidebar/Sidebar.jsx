import React from 'react'
import PropTypes from 'prop-types'
import ArticleSidebar from './ArticleSidebar'
import EntiyBades from './EntityBadges'
import shapes from '../../utils/shapes'

const SideBar = ({articles, locations, activeEntityIds, selectedEntityIds, loading, toggleActiveLocations, toggleLocationSelect}) => {
    const styles = {
        sidebar: {
            width: '22vw',
            position: 'fixed',
            top: 0,
            right: 0,
            paddingRight: '0',
            paddingTop: '64px',
            zIndex: 20,
            height: '90vh',
            overflowY: 'scroll'
        },
    }

    const getSelectedEntities = () => {
        const locationEntities = locations.map((location) => {
            return location.entity
        })
        return locationEntities.filter((entity) => {
            return selectedEntityIds.indexOf(entity.id) >= 0
        })
    }

    return (
        <div style={styles.sidebar}>
            <EntiyBades
                entities={getSelectedEntities()}
                onDelete={(id) => toggleLocationSelect(id)}
            />
            <ArticleSidebar
                articles={articles}
                toggleActiveLocations={toggleActiveLocations}
                activeEntityIds={activeEntityIds}
                selectedEntityIds={selectedEntityIds}
                loading={loading}
            />
        </div>
    )
}

SideBar.propTypes = {
    articles: PropTypes.arrayOf(shapes.article).isRequired,
    locations: PropTypes.arrayOf(shapes.location).isRequired,
    activeEntityIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedEntityIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    loading: PropTypes.bool.isRequired,
    toggleActiveLocations: PropTypes.func.isRequired,
    toggleLocationSelect: PropTypes.func.isRequired,
}

export default SideBar