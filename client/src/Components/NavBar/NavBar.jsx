import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import "./NavBar.css";

export default function NavBar(props){
    if(window.location.href.includes('home')){
        return (
            <div className="containerNav">
                <NavLink to={"/videogame"} className="link"><h2>Create videogame</h2></NavLink>
                <Filters cont={props.cont} setCont={props.setCont} className="filtros" setPage={props.setPage} />
                <SearchBar className="searchbar" />
            </div>
        )
    } else if(window.location.href === 'http://localhost:3000/videogame'){
        return (
            <div className="containerNav">
                <NavLink to={'/home'} className= 'link'><h2>Home</h2></NavLink>
            </div>
        )
    } else {
        return (
            <div className="containerNav">
                <NavLink to={'/home'} className= 'link'><h2>Home</h2></NavLink>
                <NavLink to={"/videogame"} className="link"><h2>Create videogame</h2></NavLink>
            </div>
        )
    }
}