const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.join(__dirname, '..', 'bd', 'banco.db');
const db = new sqlite3.Database(dbPath);
// Criando Usuário Master no Banco para Acesso de Administrador
const insertAdminUser = () => {
    const nome = 'Nome do Administrador'; 
    const email = 'master@master.com';
    const senha = 'admin'; 
    const tipo = 'admin';
  
    // Verificando se o usuário já existe
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
  
      // Se não existe, insere no banco de dados
      if (!row) {
        const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
        db.run(query, [nome, email, senha, tipo], (err) => {
          if (err) {
            console.error(err);
            console.log('Erro ao inserir o usuário administrador');
          } else {
            //console.log('Usuário administrador inserido com sucesso');
          }
        });
      } else {
        //console.log('Usuário administrador já existe');
      }
    });
  };
  
  module.exports = insertAdminUser;
