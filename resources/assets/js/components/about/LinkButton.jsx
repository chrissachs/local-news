import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const LinkButton = ({url, children}) => {
    const styles = {
        linkButton: {
            padding: '0',
            minHeight:0,
            textTransform: 'none'
        }
    }
    return (
        <Button
            href={url}
            target="_blank"
            style={styles.linkButton}
        >
            {children}
        </Button>
    )
}

LinkButton.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
}

export default LinkButton