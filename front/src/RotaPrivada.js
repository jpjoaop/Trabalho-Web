import React from 'react';
import { Navigate } from 'react-router-dom';

const RotaPrivada = ({ children, requerAdmin }) => {
  const token = localStorage.getItem('token');
  console.log('Token recuperado do localStorage:', token);

  if (!token) {
    console.log('Nenhum token encontrado, redirecionando para Login...');
    return <Navigate to="/login" />;
  }

  const tokenParts = token.split('-');
  const tipoToken = tokenParts[1];
  console.log('Tipo do Token:', tipoToken);

  if (requerAdmin && tipoToken !== 'admin') {
    console.log('Acesso negado para usuário não-admin, redirecionando...');
    return <Navigate to="/lista-musicas" />;
  }

  return children;
};


export default RotaPrivada;
