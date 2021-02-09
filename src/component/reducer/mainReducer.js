
const initialState = {
    apartments: {
        forRent: {},
        forSell: {}
    },
    articles: {},
    group: {},
    recommended: {},
    newsPapers: {},
    checkMessages: {},
    features: {},

}

const mainReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'INITIAL':
            console.log(payload)
            return {
                ...state
            }

        default: return state
    }
}

export default mainReducer;