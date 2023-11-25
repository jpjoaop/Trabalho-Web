// CriaMusica.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Criacao.css'
import ok from '../images/ok.png'

const CriaMusica = () => {
  const [nome, setNome] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Criar um objeto FormData para enviar dados e arquivos
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('artista', artista);
    formData.append('album', album);
    formData.append('dataLancamento', dataLancamento);
    formData.append('audio', audio);

    try {
      // Enviar os dados para o backend
      const response = await fetch('http://localhost:3001/criar-musica', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Música criada com sucesso');
        // Limpar os campos após o envio bem-sucedido
        setNome('');
        setArtista('');
        setAlbum('');
        setDataLancamento('');
        setAudio(null);
      } else {
        console.error('Erro ao criar música:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error.message);
    }
  };

  return (
    <div className="cria-musica">
      <h2>Criar Nova Música</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="artista">Artista:</label>
        <input
          type="text"
          id="artista"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />

        <label htmlFor="album">Álbum:</label>
        <input
          type="text"
          id="album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />

        <label htmlFor="dataLancamento">Data de Lançamento:</label>
        <input
          type="date"
          id="dataLancamento"
          value={dataLancamento}
          onChange={(e) => setDataLancamento(e.target.value)}
        />

        <label htmlFor="audio">Adicione a música aqui:</label>
        <input
          type="file"
          id="audio"

          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
        />

        <button type="submit" className='salva'>
          <img src={ok} alt='botão de criar' className='salva-icon'></img>
          Criar Música
        </button>


        <Link to={'/lista-musicas-adm'}>
        <button type="submit" className='salva'>
        Voltar
        </button>
        </Link>
      </form>
    </div>
  );
};

export default CriaMusica;
