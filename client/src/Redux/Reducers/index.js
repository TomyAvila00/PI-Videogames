const initialState = {
    videogames: [],
    gameDetail: undefined,
    genres: [],
    unfilteredGame: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_ALL_GAMES":
            return({
                ...state,
                videogames: action.payload,
                unfilteredGame: action.payload
            })
        case "REFRESH":
            return({
                ...state,
                gameDetail: undefined
            })
        case "ORDER_BY_NAME":
            let order = action.payload === "ASC" ? 
            state.videogames.sort(function (a, b) {
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0;
            }): 
            state.videogames.sort(function(a, b) {
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1
                }
                return 0;
            })
            return {
                ...state,
                videogames: order
            }
        case "FILTER_CREATED":
            if(state.videogames !== state.unfilteredGame)
            state.videogames = state.unfilteredGame

            const allVideogames = state.videogames
            let created = []

            if(action.payload === "db"){
                created = allVideogames.filter(v => (typeof v.ID) === "string")
            } else {
                if(action.payload === "db"){
                    created = allVideogames.filter(v => (typeof v.ID) === "number")
                } else {
                    created = state.unfilteredGame
                }
            } 
            return{
                ...state,
                videogames: created
            }
        case "SEARCH_GAME":
            return{
                ...state,
                videogames: action.payload
            }
        case "ORDER_BY_RATING":
            let array = action.payload === "top"
            ? state.videogames.sort(function (a, b) {
                if(a.rating > b.rating){
                    return 1
                }
                if(b.rating > a.rating){
                    return -1
                }
                return 0;
            })
            : state.videogames.sort(function (a, b) {
                if(a.rating > b.rating){
                    return -1
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0;
            })
            return {
                ...state,
                videogames: array
            }
        case "FILTER_BY_GENRE":
            if(state.videogames !== state.unfilteredGame)
            state.videogames = state.unfilteredGame

            let filtered = []

            filtered = state.videogames.filter(v => (typeof v.genres[0] === "string")
            ? v.genres.includes(action.payload)
            : (v.genres[0] && v.genres[0].name === action.payload)
            || (v.genres[1] && v.genres[1].name === action.payload)
            || (v.genres[2] && v.genres[2].name === action.payload)
            || (v.genres[3] && v.genres[3].name === action.payload)
            || (v.genres[4] && v.genres[4].name === action.payload)
            )
            if(action.payload === "All")
            filtered = state.unfilteredGame

            return {
                ...state,
                videogames: filtered
            }
        case "GET_ALL_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "GET_NAME_BY_ID":
            return({
                ...state, 
                gameDetail: action.payload
            })
        case "CREATE_VIDEOGAME":
            return {
                ...state
            }
        case "GET_ALL_PLATFORMS":
            return{
                ...state,
                platforms: action.payload
            }
        case "GET_DETAILS":
            return ({
                ...state,
                gameDetail: action.payload
            })
        default: return state
    }
}


export default rootReducer;