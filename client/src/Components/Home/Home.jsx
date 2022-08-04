import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { refresh, getAllGenres } from "../../Redux/Actions";
import Cards from "../Cards/Cards.jsx";
import NavBar from "../NavBar/NavBar";

export function Home(props){
    const [cont, setCont] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        props.refresh();
        props.getAllGenres();
    })

    return (
        <div className="containerHome">
            <NavBar cont={cont} setCont={setCont} page={page} setPage={setPage} />
        <div>
            <Cards cont={cont} page={page} setPage={setPage} />        
        </div>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return {
        getAllGenres: () => dispatch(getAllGenres()),
        refresh: () => dispatch(refresh())
    }
}

export default connect(null, mapDispatchToProps)(Home)