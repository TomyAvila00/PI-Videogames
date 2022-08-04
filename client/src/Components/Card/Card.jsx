import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";

export default function Card (props) {
    return (
        <Link className="link" to={`/videogame/${props.ID}`} >
            <div className="container">
                <div className="card">
                    <h4>{props.name}</h4>
                    <div className="img">
                        <img id="imagen" src={props.image} alt="imagen no disponible" />
                    </div> 
                    <p>{props.genres.map(g => {
                        return g + '. ';
                    })}</p>
                </div>
            </div>
        </Link>
    )
}