export const LOADING_ARTICLES = 'LOADING_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'

const requestArticles = () => {
    return {
        type: LOADING_ARTICLES
    }
}

const receiveArticles = (articles) => {
    return {
        type: RECEIVE_ARTICLES,
        articles
    }
}

export const fetchArticles = (center, distance) => {
    return dispatch => {
        dispatch(requestArticles())
        window.axios
            .get('news/geo?longitude='+ center.lng+'&latitude='+ center.lat+'&distance='+distance)
            .then((response) => {
                const {data} = response
                dispatch(receiveArticles(data))
            })
    }
}