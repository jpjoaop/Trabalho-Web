// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './Rotas';

//imagens
import logoSpotify from './images/logo-spotify.png';

function App() {
  return (
    <Router>
      <>
        <section className="LoginUser">
          <header className="titulo">
          <span className='top'>
            <img src={logoSpotify} alt='logo' id='logospotify'/>
            <h1>Spotify dos cria</h1>
          </span>
          </header>
          <Rotas />
          <footer className="rodape">
            <p>Página desenvolvida por João Paulo e Luiz Raul - 2023</p>
          </footer>
        </section>
      </>
    </Router>
  );
}

export default App;
