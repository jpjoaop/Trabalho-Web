// CriarUsuario.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CreateUser.css';
import envia from '../images/send.png';

const CriarUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Adicionando a variável 'tipo' e configurando como 'usuario' por padrão
    const tipo = 'usuario';

    // Construir o objeto de usuário
    const novoUsuario = { nome, email, senha, tipo };

    try {
      // Enviar os dados para o backend
      const response = await fetch('http://localhost:3001/criar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        console.log('Usuário cadastrado com sucesso');
        // Limpar os campos após o envio bem-sucedido
        setNome('');
        setEmail('');
        setSenha('');
        // Exibir mensagem de sucesso
        setMensagem('Usuário cadastrado com sucesso!!');
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
        // Exibir mensagem de erro
        setMensagem('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error.message);
      // Exibir mensagem de erro
      setMensagem('Erro ao conectar ao servidor');
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
    <div className="criar-usuario">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        <button type="submit">
          <img src={envia} alt="enviar" id="enviarbotao" />
          Criar
        </button>

        <Link to="/login">
        <button id='btnlogin'>
          Fazer Login
        </button>
      </Link>

        
        <div id='msg'>
        {mensagem && <p className={mensagem.includes('sucesso') ? 'success' : 'error'}>{mensagem}</p>}
        </div>
      </form>
    </div>
  );
};

export default CriarUsuario;
