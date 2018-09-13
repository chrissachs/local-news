import PropTypes from 'prop-types'

export const geoCoordinates = PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
})

export const entity = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
})

export const geoJson = PropTypes.shape({
    type: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
})

export const location = PropTypes.shape({
    confidence: PropTypes.number,
    entity,
    geo: geoJson
})

export const article = PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(location),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
})

export default {
    geoCoordinates,
    entity,
    geoJson,
    location,
    article,
}