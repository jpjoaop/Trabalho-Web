// ListaMusicasAdm.js
import React, { useState, useEffect } from 'react';
import '../styles/ListaMusicas.css';
import capa from '../images/disc.jpg';

const ListaMusicasAdm = () => {
  const [musicas, setMusicas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);

  useEffect(() => {
    const carregarMusicas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/musicas', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMusicas(data);
        } else {
          console.error('Erro ao carregar músicas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error.message);
      }
    };

    carregarMusicas();
  }, []);

  useEffect(() => {
    const resultado = musicas.filter(
      (musica) =>
        musica.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        musica.artista.toLowerCase().includes(pesquisa.toLowerCase())
    );

    setResultadoPesquisa(resultado);
  }, [pesquisa, musicas]);

  return (
    <div className="lista-musicas">
      <h2>Todas as Músicas</h2>
      <div id="principal">
        <input
          type="text"
          placeholder="Pesquisar música..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      <ul>
        {pesquisa === '' ? (
          musicas.map((musica) => (
            <div className="musicinfo" key={musica.id}>
              <img src={capa} alt="capa" id="capa"></img>
              <li>
                {`${musica.nome} - ${musica.artista}`}
                <br></br>
                <audio controls>
                  <source
                    src={`http://localhost:3001/musicas/${musica.endereco_audio.split('\\').pop()}`} //Alterar aqui
                    type="audio/mp3"
                  />
                  Não é possível reproduzir áudio aqui.
                </audio>
              </li>
            </div>
          ))
        ) : resultadoPesquisa.length === 0 ? (
          <li>Nenhuma música encontrada.</li>
        ) : (
          resultadoPesquisa.map((musica) => (
            <div className="musicinfo" key={musica.id}>
              <img src={capa} alt="capa" id="capa"></img>
              <li>
                {`${musica.nome} - ${musica.artista}`}
                <br></br>
                <audio controls>
                  <source
                    src={`http://localhost:3001/musicas/${musica.endereco_audio.split('\\').pop()}`}
                    type="audio/mp3"
                  />
                  Não é possível reproduzir áudio aqui.
                </audio>
              </li>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListaMusicasAdm;