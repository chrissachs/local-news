import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import ArticleSidebar from './sidebar/ArticleSidebar'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './map/LocationMarker'

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            locations: [],
            activeEntityIds: [],
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        window.axios
            .get('news/geo?longitude='+ this.props.center.lng+'&latitude='+ this.props.center.lat+'&distance=10000')
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
            item.locations.forEach((location) => {
                if(entityIds.indexOf(location.entity.id) > -1) {
                    return
                }
                entityIds.push(location.entity.id)
                entities.push(location)
            })
        })
        return entities
    }



    hoverLocation(entityIds) {
        this.setState({activeEntityIds: entityIds})
    }

    leaveLocation(entityIds) {
        this.setState({activeEntityIds: []})
    }

    showLocationMarkers() {
        const {locations, activeEntityIds} = this.state
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
                    activeEntityIds={activeEntityIds}
                />
            )
        })
    }

    render() {
        const hoverLocation = this.hoverLocation.bind(this)
        const leaveLocation = this.leaveLocation.bind(this)

        return (
            <Grid container spacing={24} style={{height: '95vh', width: '100%'}}>
                <Grid item xs={9}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.props.apiKey }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        style={{position:'fixed', top:0, left:0, height:'100vh', width:'73vw'}}

                    >
                        {!this.state.isLoading &&
                        this.showLocationMarkers()
                        }
                    </GoogleMapReact>

                </Grid>

                <Grid item xs={3}>
                    {this.state.isLoading ?
                        (<CircularProgress size={50} />) :
                        <ArticleSidebar
                            articles={this.state.data}
                            hoverLocation={hoverLocation}
                            leaveLocation={leaveLocation}
                            activeEntityIds={this.state.activeEntityIds}
                        />
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
