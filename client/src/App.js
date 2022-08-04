
import React from 'react';
import './App.css';
import Home from "./Components/Home/Home.jsx";
import CardDetail from "./Components/CardDetail/CardDetail.jsx";
import CreateGame from "./Components/CreateGame/CreateGame.jsx";
import LandingPage from './Components/Landing/Landing.jsx';
import { Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <div className='App'>
        <Route exact path="/" component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route exact path='/videogame' component={CreateGame} />
        <Route path='/videogame/:idVideogame' component={CardDetail} />
      </div>
    </React.Fragment>    
  );
}

export default App;
