import {connect} from "react-redux";
import { filterCreated, orderByName, orderByRating, filterByGenre } from "../../Redux/Actions";

import "./Filters.css";

export function Filters(props){
    const genres = props.genres;

    function handleFilterGenres(e){
        e.preventDefault();
        props.filterByGenre(e.target.value)
        props.setPage(1)
    }

    function handleSorting(e){
        e.preventDefault();
        props.orderByName(e.target.value)
        props.setCont(props.cont + 1)
        props.setPage(1)
    }

    function handleFilterRating(e){
        e.preventDefault();
        props.orderByRating(e.target.value)
        props.setCont(props.cont + 1)
        props.setPage(1)
    }

    function handleFilterCreated(e){
        props.filterCreated(e.target.value, props.videogames, props.unfilteredGame)
        props.setPage(1)
    }


    return(
        <div className="containerFilters">
            <div className="select">
                <select className="genre" onChange={(e) => handleFilterGenres(e)}>
                    <option hidden>GENRES</option>
                    <option value="All">All genres</option>
                    {genres && genres.map(g => {
                        return (
                            <option key={g.ID} value={g.name}>{g.name}</option>)
                    })}
                </select>
            </div>
            <div className="selectName">
                <select onChange={e => handleSorting(e)}>
                    <option hidden>ORDER A-Z</option>
                    <option value="ASC">A - Z</option>
                    <option value="DESC">Z - A</option>
                </select>
            </div>
            <div className="selectRating">
                <select onChange={e => handleFilterRating(e)}>
                    <option hidden>RATING</option>
                    <option value="top">Largest rating</option>
                    <option value="down">Lowest rating</option>
                </select>
            </div>
            <div className="selectCreated">
                <select onChange={e => handleFilterCreated(e)}>
                    <option hidden>FILTERS</option>
                    <option value="all">All videogames</option>
                    <option value="db">Videogames created</option>
                    <option value="api">Existing games</option>
                </select>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        genres: state.genres,
        videogames: state.videogames,
        unfilteredGame: state.unfilteredGame
    }
}

function mapDispatchToProps(dispatch){
    return {
        filterCreated: (payload) => dispatch(filterCreated(payload)),
        orderByName: (payload) => dispatch(orderByName(payload)),
        orderByRating: (payload) => dispatch(orderByRating(payload)),
        filterByGenre: (payload) => dispatch(filterByGenre(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)