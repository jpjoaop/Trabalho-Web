import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import CriarUsuario from './login/criarusuario';
import Login from './login/Login';
import ListaMusicas from './user/listamusicas';
import Musica from './user/musica';
import ListaMusicasAdm from './admin/listamusicasadm';
import CriaMusica from './admin/CriaMusica';
import EditarMusica from './admin/EditarMusica';
import PaginaNaoEncontrada from './PaginaNaoEncontrada';
import RotaPrivada from './RotaPrivada'; 

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/criar-usuario" element={<CriarUsuario />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lista-musicas" element={<RotaPrivada><ListaMusicas /></RotaPrivada>} />
      <Route path="/musica/:id" element={<RotaPrivada><Musica /></RotaPrivada>} />
      <Route path="/criar-musica" element={<RotaPrivada requerAdmin={true}><CriaMusica /></RotaPrivada>} />
      <Route path="/lista-musicas-adm" element={<RotaPrivada requerAdmin={true}><ListaMusicasAdm /></RotaPrivada>} />
      <Route path="/editar-musica/:id" element={<RotaPrivada requerAdmin={true}><EditarMusica /></RotaPrivada>} />
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
};

export default Rotas;
