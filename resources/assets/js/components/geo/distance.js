//https://www.geodatasource.com/developers/javascript
export default (a, b) => {
    const radlat1 = Math.PI * a.lat/180
    const radlat2 = Math.PI * b.lat/180
    const theta = a.lng-b.lng
    const radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist * 1609.344
}