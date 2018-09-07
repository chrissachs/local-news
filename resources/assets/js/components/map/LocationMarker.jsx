import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModeComment from '@material-ui/icons/ModeComment'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
export default class LocationMarker extends Component {
    constructor(props) {
        super(props)
    }

    onMouseEnter() {
        if(typeof this.props.onMouseEnter === 'function') {
            this.props.onMouseEnter(this.props.entityId)
        }
    }

    onMouseLeave() {
        if(typeof this.props.onMouseLeave === 'function') {
            this.props.onMouseLeave(this.props.entityId)
        }
    }

    render() {
        const iconProps = {}

        if(this.props.entityId && this.props.activeEntityId === this.props.entityId) {
            iconProps.color = 'primary'
        }
        return (
            <div
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
            >
                <Tooltip title={this.props.title}>
                    <IconButton>
                        <ModeComment
                            {...iconProps}
                        />
                    </IconButton>
                </Tooltip>
            </div>

        )
    }
}

LocationMarker.propTypes = {
    title: PropTypes.string.isRequired,
    entityId: PropTypes.number,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    activeEntityId: PropTypes.number,
}