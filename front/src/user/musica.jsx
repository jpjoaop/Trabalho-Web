// Musica.js
import React from 'react';

const Musica = ({ musica }) => {
  if (!musica) {
    return <div>Selecione uma música</div>;
  }

  return (
    <div className="detalhes-musica">
      <h2>{`${musica.nome} - ${musica.artista}`}</h2>
    </div>
  );
};

export default Musica;
