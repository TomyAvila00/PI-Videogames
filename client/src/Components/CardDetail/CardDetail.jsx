import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../Redux/Actions/index";
import { useParams } from "react-router-dom";
import "./CardDetail.css";
import NavBar from "../NavBar/NavBar";
import timmy from '../../Images/timmy.gif';

export default function CardDetail(){
    const dispatch = useDispatch();
    const {idVideogame} = useParams();

    useEffect(() => {
        dispatch(getDetail(idVideogame))
    }, [dispatch, idVideogame])

    const myGame = useSelector((state) => state.gameDetail);
    console.log(myGame);
    
    return(
        <> 
        <NavBar/>
        <div className="containerDetail">
            {myGame? (
                <div className="detail">
                    <div id="detailImage">
                        <img className="imagen" src={myGame.image} alt=""/>
                    </div>
                    <div className="completeDescription">
                        <div className="nombre">
                            <h2 className="title">{myGame.name}</h2>
                        </div><br />
                        <div className="genero">
                            <u>Genre: </u>
                            {(typeof myGame.genres[0] === "string")? myGame.genres + '. ' : myGame.genres.map(g => g.name + ' ')}
                        </div><br />
                        <div className="descripcion">
                            <u>Description: </u>
                            {myGame.description.replace(/(<([^>]+)>)/gi, "")}
                        </div><br />
                        <div className="lanzamiento">
                            <u>Released: </u>
                            {myGame.released}
                        </div><br />
                        <div className="rat">
                            <u>Rating: </u>
                            {myGame.rating}
                        </div><br />
                        <div className="plataformas">
                            <u>Platforms: </u>
                            {myGame.platforms.map((el) => el + ". ")}
                        </div>
                    </div>
                </div>
            ): (
                <div className="loadingContainerDetail">
                    <img className="timmyDetail" src={timmy} alt="Gif loading" />
                    <h4 className="loadingDetail">loading...</h4>
                </div>
            )
            }
        </div>
        </>
    )
}