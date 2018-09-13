import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../../utils/shapes'
import ModeComment from '@material-ui/icons/ModeComment'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
const LocationMarker = ({location, activeEntityIds, toggleLocationActive, toggleLocationSelect}) => {
    const {entity} = location
    const iconProps = {color: 'primary'}
    const isActive = entity.id && activeEntityIds.indexOf(entity.id) >= 0

    if(isActive) {
        iconProps.color = 'secondary'
    }
    return (
        <div
            onMouseEnter={() => {toggleLocationActive([entity.id])}}
            onMouseLeave={() => {toggleLocationActive(null)}}
            onClick={() => toggleLocationSelect(entity.id)}
        >
            <Tooltip
                title={entity.name}
                open={isActive}
            >
                <IconButton>
                    <ModeComment
                        {...iconProps}
                    />
                </IconButton>
            </Tooltip>
        </div>

    )
}

LocationMarker.propTypes = {
    location: shapes.location.isRequired,
    toggleLocationActive: PropTypes.func.isRequired,
    toggleLocationSelect: PropTypes.func.isRequired,
    activeEntityIds: PropTypes.arrayOf(PropTypes.number),
}

export default LocationMarker