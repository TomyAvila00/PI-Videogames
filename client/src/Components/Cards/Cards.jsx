import {getAllGames} from "../../Redux/Actions/index.js";
import {connect} from "react-redux";
import { useEffect } from "react";
import Card from "../Card/Card.jsx";
import "./Cards.css";
import flechaDerecha from '../../Images/flechaDerecha.png';
import flechaIzquierda from '../../Images/flechaIzquierda.png';
import timmy from '../../Images/timmy.gif';

function Cards(props){
    const group = 15;
    const finalPage = props.page * group
    const initialPage = finalPage - group

    const game = props.videogames.slice(initialPage, finalPage)
    
    useEffect(() => {
        props.getAllGames()
        // eslint-disable-next-line
    }, [])

    // if(props.page < 1) {
    //     props.setPage(1)
    //     return
    // }

    // if(props.page > 7){
    //     props.setPage(7)
    //     return
    // }

    function prevClick(e){
        console.log(e.target.id)
        if(props.page > 1){
            return props.setPage(props.page - 1)
        }
    }

    function nextClick(){
        if(props.page < 7){
            return props.setPage(props.page + 1)
        }
    }


    return(
        <div className="containerCards">
            <div className="paginado">
                    <button id={props.page} onClick={prevClick}><img src={flechaIzquierda} alt='Flecha izquierda logo'></img></button>
                    <h3 className="number">Page: {props.page}</h3>
                    <button id={props.page} onClick={nextClick}><img src={flechaDerecha} alt='Flecha derecha logo'></img></button>
            </div>
            <div className="cards">
                {game[0] ? game.map((v, index) => 
                <div className="cssCard" key={index}>
                    <Card 
                        ID={v.ID}
                        name={v.name}
                        image={v.image}
                        genres={(typeof v.genres[0] === "string") ? v.genres : v.genres.map(g => g.name)}
                    />
                </div>
                ): (
                    <div className="loadingContainer">
                        <img className="timmyGif" src={timmy} alt="gif loading" />
                        <h4 className="loading">loading...</h4>
                    </div>
                )}
            </div>
            <div className="paginado" id="paginadoBot">
                    <button id={props.page} onClick={prevClick}><img src={flechaIzquierda} alt='Flecha izquierda logo'></img></button>
                    <h3 className="number">Page: {props.page}</h3>
                    <button id={props.page} onClick={nextClick}><img src={flechaDerecha} alt='Flecha derecha logo'></img></button>
            </div>
        </div>
    )
}


function mapStateToProps(state){
    return {
        videogames: state.videogames
    }
}

function mapDispatchToProps(dispatch){
    return {
        getAllGames: () => dispatch(getAllGames())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cards)