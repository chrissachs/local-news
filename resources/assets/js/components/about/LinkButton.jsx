import React from 'react'
import Button from '@material-ui/core/Button'

export default (props) => {
    const styles = {
        linkButton: {
            padding: '0',
            minHeight:0,
            textTransform: 'none'
        }
    }
    return (
        <Button
            href={props.url}
            target="_blank"
            style={styles.linkButton}
        >
            {props.text}
        </Button>
    )
}