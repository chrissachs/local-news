import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import LocationMarker from '../container/map/LocationMarker'
import {distance as calculateDistance} from '../utils/geo'
import debounce from 'lodash.debounce'
import shapes from '../utils/shapes'

const MapWithMarkers = ({center, zoom, fetchArticles, locations}) => {
    const styles = {
        map: {
            position:'fixed',
            top:0,
            left:0,
            height:'100%',
            width:'100vw'
        },
    }

    const onMapViewChange = debounce((data) => {
        const distance = calculateDistance(data.center, data.bounds.nw)
        fetchArticles(data.center, distance)
    },200)

    const showLocationMarkers = (locations) => {
        return locations.map((location) => {
            return (
                <LocationMarker
                    key={location.entity.id}
                    location={location}
                    lat={location.geo.coordinates[1]}
                    lng={location.geo.coordinates[0]}
                />
            )
        })
    }

    return (
        <div style={{width:'97vw'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: window.googleApiKey }}
                defaultCenter={center}
                defaultZoom={zoom}
                style={styles.map}
                onChange={onMapViewChange}
                options={{minZoom:12}}
            >
                {showLocationMarkers(locations)}
            </GoogleMapReact>
        </div>
    )
}

MapWithMarkers.propTypes = {
    center: shapes.geoCoordinates.isRequired,
    zoom: PropTypes.number.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf(shapes.location).isRequired,
}

MapWithMarkers.defaultProps = { // TODO
    center: {
        lat: 52.520008,
        lng: 13.404954
    },
    zoom: 14,
}


export default MapWithMarkers