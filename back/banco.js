const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho completo para o banco de dados
const dbPath = path.join(__dirname, '..', 'bd', 'banco.db');

// Criar uma instância do banco de dados
const db = new sqlite3.Database(dbPath);

// Criação da tabela 'usuarios'
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL
  );
`;

const createTableQuery2 = `
CREATE TABLE IF NOT EXISTS musicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    artista TEXT NOT NULL,
    album TEXT NOT NULL,
    data_lancamento DATE NOT NULL,
    endereco_audio TEXT NOT NULL
  );
`;

// Executar a consulta de criação da tabela
db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err.message);
  } else {
    console.log('Tabela criada com sucesso.');
  }
});

db.run(createTableQuery2, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela criada com sucesso.');
    }
  });


// Fechar a conexão com o banco de dados (quando não precisar mais)
db.close();
