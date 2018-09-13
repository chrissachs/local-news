import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../../utils/shapes'
import Chip from "@material-ui/core/Chip/Chip";
const EntityBadges = (props) => {
    const {entities, onDelete} = props
    return entities.map((entity) => {
        return (
            <Chip
                label={entity.name}
                color={"secondary"}
                key={entity.id}
                onDelete={() => {onDelete(entity.id)}}
                style={{margin:'0.3em'}}
            />)
    })
}

EntityBadges.propTypes = {
    entities: PropTypes.arrayOf(shapes.entity).isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default EntityBadges