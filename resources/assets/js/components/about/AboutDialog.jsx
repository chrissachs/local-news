import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinkButton from './LinkButton'

const AboutDialog = ({onClose, open}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Wo bin ich hier gelandet?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Eine kleine Demo App, die das Zusammenspiel von
                    <LinkButton url='https://laravel.com/'>Laravel</LinkButton>,
                    <LinkButton url="https://reactjs.org/">ReactJS</LinkButton>
                    demonstrieren soll.<br/>

                    Die App sucht nach Artikeln auf Twitter, versucht mit Hilfe von
                    <LinkButton url="https://dandelion.eu/">Dandelion</LinkButton>,
                    <LinkButton url="https://cloud.google.com/maps-platform/?hl=de">GoogleMaps</LinkButton> und
                    <LinkButton url="https://de.wikipedia.org/wiki/Wikipedia:Technik/Labs/Tools/geohack">Wikipedia</LinkButton>

                    herauszufinden, um welchen Ort es in der News geht, und zeigt es dann entsprechend auf der Karte an.

                </DialogContentText>
            </DialogContent>
            <DialogTitle id="alert-dialog-title">Und wie funktioniert das genau?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Der Source Code kann auf
                    <LinkButton url='https://github.com/chrissachs/local-news'>GitHub</LinkButton>
                    angeschaut werden.


                </DialogContentText>
            </DialogContent>
            <DialogTitle id="alert-dialog-title">Und wer bist du?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Mehr Infos über mich gibt es auf
                    <LinkButton url='https://chris-sachs.info'>meiner Seite</LinkButton>
                        oder bei
                    <LinkButton url='https://www.linkedin.com/in/chris-sachs-6899b498/'>LinkedIn</LinkButton>.


                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    OK, Danke
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AboutDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}

export default AboutDialog