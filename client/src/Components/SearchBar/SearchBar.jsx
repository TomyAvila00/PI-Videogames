import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { searchGame } from "../../Redux/Actions";
import "./SearchBar.css";
import searchImage from '../../Images/Lupa.png';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value) 
    }
    
    function handleOnSubmit(e){
        e.preventDefault();
        if(!name){
            return alert('Type something')
        }else{
            dispatch(searchGame(name))
            setName('')
            return alert('Searching...')
        }
    }

    return (
        <div className="containerSearch">
            <form onSubmit={(e) => handleOnSubmit(e)}>
            <input 
                type="text"
                placeholder="Search game..."
                onChange={(e) => handleInputChange(e)}
            ></input>
            <button type="submit"><img className="searchLogo" src={searchImage} alt='Search logo'></img></button>
            </form>
        </div>
    )
}