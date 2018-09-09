import React from 'react'
import Chip from "@material-ui/core/Chip/Chip";
export default (props) => {
    const {entities, onDelete} = props
    return entities.map((entity) => {
        return (
            <Chip
                label={entity.name}
                color={"primary"}
                key={entity.id}
                onDelete={() => {onDelete(entity.id)}}
                style={{margin:'0.3em'}}
            />)
    })
}