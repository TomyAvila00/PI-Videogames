import Axios from "axios";

const URL = "http://localhost:3001"




export const getAllGames = () => {
    return async (dispatch) => {
        let res = await Axios.get(`${URL}/videogames`)
        return dispatch({
            type: "GET_ALL_GAMES",
            payload: res.data
        })
    }
}


export const refresh = () => {
    return async (dispatch) => {
        dispatch({
            type: "REFRESH"
        })
    }
}


export function orderByName (payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}


export function filterCreated (payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function searchGame(name) {
    return async function(dispatch){
        try {
            let res = await Axios.get(`${URL}/videogames?name=${name}` );
            return dispatch({
                type: "SEARCH_GAME",
                payload: res.data
            });
        } catch (error) {
            return alert('Videogame not found')
        }
    }
}

export function orderByRating(payload){
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export function filterByGenre(payload){
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}


export const getAllGenres = () => {
    return async(dispatch) => {
        const res = await Axios.get(`${URL}/genres`);
        return dispatch({
            type: "GET_ALL_GENRES",
            payload: res.data
        })
    }
}

export const getGameById = (idVideogame) => {
    return async (dispatch) => {
        let res = await Axios.get(`${URL}/videogame/${idVideogame}`)
        return dispatch ({
            type: "GET_GAME_BY_ID",
            payload: res.data
        })
    }
}

export function getDetail(id) {
    return async function (dispatch){
        try {
            const res = await Axios.get(`${URL}/videogame/${id}`)
            return dispatch({
                type: "GET_DETAILS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const createVideogame = (payload) => {
   return async function (dispatch){
    let res = await Axios.post(`${URL}/videogame`, payload)
    console.log(res)
    return res;
   }
}

