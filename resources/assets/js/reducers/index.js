import { combineReducers } from 'redux'
import infoMenu from './infoMenu'
import articles from './articles'
import locations from './locations'


export default combineReducers({
    infoMenu,
    articles,
    locations,
})