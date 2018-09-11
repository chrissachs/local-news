import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ArticleSidebar from './sidebar/ArticleSidebar'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './map/LocationMarker'
import InfoBar from './InfoBar'
import EntiyBades from './sidebar/EntityBadges'
import calculateDistance from './geo/distance'
import debounce from 'lodash.debounce'

const styles = {
    sidebar: {
        width:'22vw',
        position:'fixed',
        top:0,
        right:0,
        paddingRight:'0',
        paddingTop:'64px',
        zIndex: 20,
        height: '90vh',
        overflowY:'scroll'
    },
    map: {
        position:'fixed',
        top:0,
        left:0,
        height:'100%',
        width:'100vw'
    },
}

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            locations: [],
            activeEntityIds: [],
            selectedEntities: []
        }
    }

    componentDidMount() {
        //const {center} = this.props
        //this.getArticles(center, 10000)
    }

    getArticles(center, distance) {
        this.setState({isLoading: true})
        window.axios
            .get('news/geo?longitude='+ center.lng+'&latitude='+ center.lat+'&distance='+distance)
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

    toggleEntity = (entityId) => {
        const {selectedEntities} = this.state

        const index = selectedEntities.indexOf(entityId)
        if(index >= 0) {
             selectedEntities.splice(index,1)
        } else {
            selectedEntities.push(entityId)
        }

        this.setState({selectedEntities})
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
                    onClick={() => this.toggleEntity(location.entity.id)}
                />
            )
        })
    }

    getSelectedEntities() {
        const {selectedEntities} = this.state
        const locationEntities = this.state.locations.map((location) => {
            return location.entity
        })
        return locationEntities.filter((entity) => {
            return selectedEntities.indexOf(entity.id) >= 0
        })
    }

    onMapViewChange = debounce((data) => {
        const {center} = data
        const distance = calculateDistance(data.center, data.bounds.nw)
        this.getArticles(center, distance)
    },200)

    render() {
        const hoverLocation = this.hoverLocation.bind(this)
        const leaveLocation = this.leaveLocation.bind(this)



        return (
            <div id={'wrapper'} style={{display:'flex'}}>
                <InfoBar
                    loading={this.state.isLoading}
                />
                <div style={{width:'97vw'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: this.props.apiKey }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            style={styles.map}
                            onChange={this.onMapViewChange }
                            options={{minZoom:12}}

                        >
                            {this.showLocationMarkers()}
                        </GoogleMapReact>
                </div>
                <div style={styles.sidebar}>
                        <EntiyBades
                            entities={this.getSelectedEntities()}
                            onDelete={this.toggleEntity}
                        />
                        <ArticleSidebar
                            articles={this.state.data}
                            hoverLocation={hoverLocation}
                            leaveLocation={leaveLocation}
                            activeEntityIds={this.state.activeEntityIds}
                            selectedEntityIds={this.state.selectedEntities}
                            loading={this.state.isLoading}
                        />
                </div>
            </div>
        );
    }
}
Map.defaultProps = { // TODO
    center: {
        lat: 52.520008,
        lng: 13.404954
    },
    zoom: 14,
    apiKey: window.googleApiKey
}

if (document.getElementById('map')) {
    ReactDOM.render(<Map />, document.getElementById('map'));
}
