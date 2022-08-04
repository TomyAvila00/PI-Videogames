import React, {useEffect, useState}  from "react";
import {useDispatch, useSelector} from "react-redux";
import { createVideogame, getAllGenres } from "../../Redux/Actions"; 
import "./CreateGame.css";
import NavBar from "../NavBar/NavBar";

export default function CreateGame(){
    const genres = useSelector((state) => state.genres)
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    })

    const [errors, setErrors] = useState({})

    function validate(input){
        let errors = {};

        if(!input.name){
            errors.name = "Name is required!"
        } else if(typeof input.name === 'number'){
            errors.name = "Numbers aren't allowed"
        } else if(!input.description){
            errors.description = "Description is required!"
        } else if(!input.released){
            errors.released = "Released is required!"
        } else if(!input.rating){
            errors.rating = "Rating is required!"
        } else if(Number(input.rating) < 0){
            errors.rating = "Negative numbers aren't allowed"
        } else if(Number(input.rating) > 5){
            errors.rating = "Rating must be between 0 - 5"
        } else if(!input.platforms.length){
            errors.platforms = "Platforms are required!"
        } else if(!input.genres.length){
            errors.genres = "Genres are required!"
        }
        return errors;
    }



    const [button, setButton] = useState({})

    useEffect(() => {
        input.name && 
        input.description &&
        input.rating &&
        input.released &&
        input.platforms.length &&
        input.genres.length ? setButton(false) : setButton(true)
    }, [input])


    function handleDelete(element){
       setInput({
        ...input,
        genres: input.genres.filter((g) => g !== element)
       }) 
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleCheck = (e) =>{
        if(e.target.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createVideogame(input))
        alert("Videogame created!")
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        })
    }

    useEffect(() => {
        dispatch(getAllGenres())
        // eslint-disable-next-line
    }, [])


    return(
        <>
        <div>
            <NavBar></NavBar>
        </div>
        <div className="containerForm">
            <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
                <div className="createName">
                    <label><u className="detalles">Name: </u></label>
                    <input 
                        className="inputs"
                        placeholder="Insert a name..."
                        type="text"
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                        name="name"
                        />
                    {errors.name && (<p className="errorCreate">{errors.name}</p>)}
                </div>
                <div className="createDescription">
                    <label><u className="detalles">Description: </u></label>
                    <input 
                        className="inputs"
                        type="text"
                        placeholder="Insert a description..."
                        value={input.description}
                        onChange={handleChange}
                        name="description"
                        />
                    {errors.description && (<p className="errorCreate">{errors.description}</p>)}
                </div>
                <div className="createRelease">
                    <label><u className="detalles">Realeased:  </u></label>
                    <input
                        className="inputs"
                        type="date"
                        value={input.released}
                        onChange={handleChange}
                        name="released"
                        />
                    {errors.released && (<p className="errorCreate">{errors.released}</p>)} 
                </div>
                <div className="createRating">
                    <label><u className="detalles">Rating: </u></label>
                    <input 
                        className="inputs"
                        type="number"
                        placeholder="Numbers from 0 to 5"
                        value={input.rating}
                        onChange={handleChange}
                        name="rating"
                        />
                    {errors.rating && (<p className="errorCreate">{errors.rating}</p>)}
                </div>
                <div className="createPlatforms">
                    <label><u className="detalles">Select a platform: </u></label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="PC"
                            onChange={(e) => handleCheck(e)}
                            name="PC"
                            />PC</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform" 
                            type="checkbox"
                            value="Playstation 5"
                            onChange={(e) => handleCheck(e)}
                            name="Playstation 5"
                            />Playstation 5</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Xbox One"
                            onChange={(e) => handleCheck(e)}
                            name="Xbox One"
                            />Xbox One</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Playstation 4"
                            onChange={(e) => handleCheck(e)}
                            name="Playstation 4"
                            />Playstation 4</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Xbox Series S/X"
                            onChange={(e) => handleCheck(e)}
                            name="Xbox Series S/X"
                            />Xbox Series S/X</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Nintendo Switch"
                            onChange={(e) => handleCheck(e)}
                            name="Nintendo Switch"
                            />Nintendo Switch</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="iOS"
                            onChange={(e) => handleCheck(e)}
                            name="iOS"
                            />iOS</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Android"
                            onChange={(e) => handleCheck(e)}
                            name="Android"
                            />Android</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Nintendo 3DS"
                            onChange={(e) => handleCheck(e)}
                            name="Nintendo 3DS"
                            />Nintendo 3DS</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Nintendo DS"
                            onChange={(e) => handleCheck(e)}
                            name="Nintendo DS"
                            />Nintendo DS</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Nintendo DSi"
                            onChange={(e) => handleCheck(e)}
                            name="Nintendo DSi"
                            />Nintendo DSi</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="macOS"
                            onChange={(e) => handleCheck(e)}
                            name="macOS"
                            />macOS</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Linux"
                            onChange={(e) => handleCheck(e)}
                            name="Linux"
                            />Linux</label><br />
                    <label className="lbl">
                        <input 
                            className="inputPlatform"
                            type="checkbox"
                            value="Xbox 360"
                            onChange={(e) => handleCheck(e)}
                            name="Xbox 360"
                            />Xbox 360</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Xbox"
                            onChange={(e) => handleCheck(e)}
                            name="Xbox"
                            />Xbox</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Playstation 3"
                            onChange={(e) => handleCheck(e)}
                            name="Playstation 3"
                            />Playstation 3</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Playstation 2"
                            onChange={(e) => handleCheck(e)}
                            name="Playstation 2"
                            />Playstation 2</label><br />
                    <label className="lbl">
                        <input
                            className="inputPlatform"
                            type="checkbox"
                            value="Playstation"
                            onChange={(e) => handleCheck(e)}
                            name="Playstation"
                            />Playstation</label><br />
                    {errors.platforms && (<p className="errorCreate">{errors.platforms}</p>)}
                </div>
                <div>
                    <div className="createGenre">
                        <label><u className="detalles">GENRES: </u></label>
                        <select onChange={(e) => handleSelect(e)}>
                            <option hidden >Choose a genre</option>
                            {genres.map((g) => (
                                <option key={g.ID} value={g.name}>{g.name}</option>
                            ))}
                        </select>
                    </div>
                    {input.genres.map((element, index) => (
                        <div key={index} className="genresCreated">
                            <p className="choosedGenre">{element}</p>
                            <button className="buttonx" type="button" onClick={() => handleDelete(element)}> X </button>
                        </div>
                    ))}
                    {errors.genres && (<p className="errorCreate">{errors.genres}</p>)}
                </div>
                <div className="containerSubmit">
                    <button className="button3" disabled={button} type="submit">Create videogame</button>
                </div>
            </form>
        </div>
        </>
    )
}