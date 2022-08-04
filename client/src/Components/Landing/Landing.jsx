import React from "react";
import {Link} from "react-router-dom";


import "./Landing.css";

export default function LandingPage(){
    return(
        <div className="containerLanding">
            <div className="containerTitle">
                <h1>Videogames browser</h1>
            </div>
            <div className="containerButton">
            <Link to="/home">
                <button className="glow-on-hover">Start</button>
            </Link>
            </div>
        </div>
    )
}