// Rotas.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import CriarUsuario from './login/criarusuario';
import Login from './login/Login';
import ListaMusicas from './user/listamusicas';
import Musica from './user/musica';
import ListaMusicasAdm from './admin/listamusicasadm';
import CriaMusica from './admin/CriaMusica';
import EditarMusica from './admin/EditarMusica';

const Rotas = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" />} 
      />
      <Route path="/criar-usuario" element={<CriarUsuario />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lista-musicas" element={<ListaMusicas />} />
      <Route path="/musica/:id" element={<Musica />} />
      <Route path="/criar-musica" element={<CriaMusica />} />
      <Route path="/lista-musicas-adm" element={<ListaMusicasAdm />} />
      <Route path="/editar-musica/:id" element={<EditarMusica />} />
    </Routes>
  );
};

export default Rotas;
