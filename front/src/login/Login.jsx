import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateUser.css';
import loginicon from '../images/login-icon.png';
import novo from '../images/novo-usuario-icon.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosLogin = { email, senha };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosLogin),
      });

      if (response.ok) {
        const { tipo } = await response.json();

        // Redireciona com base no tipo de usuário
        if (tipo === 'admin') {
          navigate('/lista-musicas-adm'); // Use navigate ao invés de history.push
        } else {
          navigate('/lista-musicas'); // Use navigate ao invés de history.push
        }
      } else {
        if (response.status === 401) {
          setMensagem('Credenciais incorretas. Tente novamente.');
        } else if (response.status === 400) {
          setMensagem('Por favor, preencha todos os campos.');
        } else {
          console.error('Erro ao realizar login:', response.statusText);
          setMensagem('Erro ao conectar ao servidor. Tente novamente mais tarde.');
        }
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error.message);
    }
  };

  useEffect(() => {
    // Limpar a mensagem após 3 segundos
    const timeoutId = setTimeout(() => {
      setMensagem('');
    }, 3000);

    // Limpar o timeout quando o componente é desmontado
    return () => clearTimeout(timeoutId);
  }, [mensagem]);

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <h3>{mensagem}</h3>

        <button type="submit">
          <img src={loginicon} alt='enviar' id='enviarbotao'></img>
          Entrar
        </button>
      </form>
    
      <Link to="/criar-usuario">
        <button id='novouser'>
          <img src={novo} alt='novo-usuario' id='enviarbotao'></img>
          Novo Usuário
        </button>
      </Link>
    </div>
  );
};

export default Login;
