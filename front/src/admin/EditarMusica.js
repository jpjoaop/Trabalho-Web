import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Criacao.css';
import ok from '../images/ok.png';
import trash from '../images/lixo.png';

const EditarMusica = () => {
  const { id } = useParams();
  const [,setMusica] = useState({});
  const [nome, setNome] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [dataLancamento, setDataLancamento] = useState('2023-01-01');
  const history = useNavigate();

  useEffect(() => {
    const carregarMusica = async () => {
      try {
        const response = await fetch(`http://localhost:3001/musicas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMusica(data);
          setNome(data.nome);
          setArtista(data.artista);
          setAlbum(data.album);
          setDataLancamento(data.data_lancamento);
        } else {
          console.error('Erro ao carregar música:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error.message);
      }
    };

    carregarMusica();
  }, [id]);

  const handleEditar = async () => {
    try {
      const response = await fetch(`http://localhost:3001/musicas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          artista,
          album,
          dataLancamento,
        }),
      });

      if (response.ok) {
        console.log('Música editada com sucesso');
        // Redirecionar para a lista de músicas após a edição
        history.push('/lista-musicas-adm');
      } else {
        console.error('Erro ao editar música:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error.message);
    }
  };

  const handleRemover = async () => {
    try {
      const response = await fetch(`http://localhost:3001/musicas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Música removida com sucesso');
        // Redirecionar para a lista de músicas após a remoção
        history.push('/lista-musicas-adm');
      } else {
        console.error('Erro ao remover música:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error.message);
    }
  };

  return (
    <div>
      <h2>Editar Música</h2>
      <div className="editar-musica">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />

        <label htmlFor="artista">Artista:</label>
        <input type="text" id="artista" value={artista} onChange={(e) => setArtista(e.target.value)} />

        <label htmlFor="album">Álbum:</label>
        <input type="text" id="album" value={album} onChange={(e) => setAlbum(e.target.value)} />

        <label htmlFor="dataLancamento">Data de Lançamento:</label>
        <input
          type="date"
          id="dataLancamento"
          value={dataLancamento}
          onChange={(e) => setDataLancamento(e.target.value)}
        />

        <Link to='/lista-musicas-adm'>
        <button onClick={handleEditar} className="salva">
          <img src={ok} alt="botão de salvar" className="salva-icon"></img>
          Salvar Edições
        </button>
        </Link>
        <Link to='/lista-musicas-adm'>
        <button onClick={handleRemover} id="delete">
          <img src={trash} alt="botão de remoção" id="delete-icon"></img>
          Remover Música
        </button>
        </Link>

      </div>
    </div>
  );
};

export default EditarMusica;
