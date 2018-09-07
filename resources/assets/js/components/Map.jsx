import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import Article from './sidebar/Article'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './map/LocationMarker'

import { createMuiTheme } from '@material-ui/core/styles';


/**
 * TODO: display icons per entity
 * TODO: selected entity
 * TODO: code cleanup
 * TODO: config
 */

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            locations: [],
            activeItemId: null,
            activeEntityId: null,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        window.axios
            .get('news/geo?longitude='+ this.props.center.lng+'&latitude='+ this.props.center.lat+'&distance=5000')
            .then((response) => {
                let {data} = response
                this.setState({
                    isLoading: false,
                    data,
                    locations: Map.getUniqueLocationsFromResponse(data),

                })
            })
    }

    static getUniqueLocationsFromResponse(data) {
        const entities = []
        const entityIds = []
        data.forEach((item) => {
            let {location} = item
            if(entityIds.indexOf(location.entity.id) > -1) {
                return
            }
            entityIds.push(location.entity.id)
            entities.push(location)
        })
        return entities
    }

    listItems() {
        const displayed = []
        return this.state.data.map((item) => {
            if(displayed.indexOf(item.id) > -1) {
                return // FIXME: get articles only once from api
            }
            displayed.push(item.id)
            const highlight = item.location.entity.id === this.state.activeEntityId || item.id === this.state.activeItemId
            const hoverLocation = this.hoverLocation.bind(this)
            const leaveLocation = this.leaveLocation.bind(this)

            return (
                <Article
                    item={item}
                    width={'100%'}
                    style={{marginBottom:'1rem'}}
                    onMouseOver={(item) => {
                        this.setState({
                            activeItemId: item.id
                        })
                        hoverLocation(item.location.entity.id)
                    }}
                    onMouseOut={(item) => {
                            if(this.state.activeItemId === item.id) {
                                this.setState({activeItemId: null})
                            }
                            leaveLocation(item.location.entity.id)
                        }
                    }
                    key={item.id}
                    highlight={(highlight)}
                />
            )
        })
    }

    hoverLocation(entityId) {
        this.setState({activeEntityId: entityId})
    }

    leaveLocation(entityId) {
        if(this.state.activeEntityId === entityId) {
            this.setState({activeEntityId: null})
        }
    }

    showLocationMarkers() {
        const {locations, activeEntityId} = this.state
        const hoverLocation = this.hoverLocation.bind(this)
        const leaveLocation = this.leaveLocation.bind(this)
        return locations.map((location) => {
            return (
                <LocationMarker
                    key={location.entity.id}
                    entityId={location.entity.id}
                    lat={location.geo.coordinates[1]}
                    lng={location.geo.coordinates[0]}
                    title={location.entity.name}
                    onMouseEnter={hoverLocation}
                    onMouseLeave={leaveLocation}
                    activeEntityId={activeEntityId}
                />
            )
        })
    }

    render() {
        return (
            <Grid container spacing={24} style={{height: '100vh', width: '100%'}}>
                <Grid item xs={9}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.props.apiKey }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        style={{position:'fixed', top:0, left:0, height:'100vh', width:'75vw'}}

                    >
                        {!this.state.isLoading &&
                            this.showLocationMarkers()
                        }
                    </GoogleMapReact>

                </Grid>

                <Grid item xs={3}>
                    {this.state.isLoading ?
                        (<CircularProgress size={50} />) :
                        this.listItems()
                    }
                </Grid>
            </Grid>
        );
    }
}
Map.defaultProps = { // TODO
    center: {
        lat: 52.494965,
        lng: 13.470839
    },
    zoom: 11,
    apiKey: window.googleApiKey
}

if (document.getElementById('map')) {
    ReactDOM.render(<Map />, document.getElementById('map'));
}
