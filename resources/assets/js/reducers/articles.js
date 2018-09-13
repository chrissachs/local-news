import {LOADING_ARTICLES, RECEIVE_ARTICLES} from "../actions/articleApi";

const reducers = (state = [], action) => {
    switch (action.type) {
        case LOADING_ARTICLES:
            return Object.assign(
                {},
                state,
                {
                    loading: true
                })
        case RECEIVE_ARTICLES:
            const {articles} = action
            return Object.assign(
                {},
                state,
                {
                    articles,
                    loading: false,
                }
            )
        default:
            return state
    }
}
export default reducers