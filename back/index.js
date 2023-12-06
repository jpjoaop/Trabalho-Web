const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Importando os serviços de autenticação
const { autenticarUsuario } = require('./autenticar');
const { verificarAutenticacao } = require('./autenticar');

const insertAdminUser = require('./adminSetup');
insertAdminUser();
const dbPath = path.join(__dirname, '..', 'bd', 'banco.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());
app.use(cors());
app.use('/musicas', express.static(path.join(__dirname, '..', 'musicas')));

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'musicas'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });




// Rota inicial
app.get('/', (req, res) => {
  res.send('Página Inicial');
});

// Middleware para redirecionamento da rota inicial para /login
app.use((req, res, next) => {
  if (req.url === '/') {
    res.redirect('/login');
  } else {
    next();
  }
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('Página Inicial');
});

// Rota de login
app.get('/login', (req, res) => {
  res.send('Página de Login');
});

// Rota para criar novo usuário
app.post('/criar-usuario', (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  // Verifica se todos os campos necessários foram fornecidos
  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Insere o novo usuário no banco de dados
  const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.run(query, [nome, email, senha, tipo], (err) => {
    if (err) {
      console.log("Erro");
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso' });
      console.log("Uhul");

    }
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  autenticarUsuario(email, senha, db)
    .then(data => {
      // 'data' é um objeto que contém tanto o token quanto o tipo do usuário
      res.json({ tipo: data.tipo, token: data.token });
    })
    .catch(error => {
      // O erro poderia ser tanto 'Credenciais inválidas' quanto 'Erro ao realizar login'
      if (error === 'Credenciais inválidas') {
        res.status(401).json({ error: error });
      } else {
        res.status(500).json({ error: error });
      }
    });
});

app.use(verificarAutenticacao);

// Rota para criar nova música
app.post('/criar-musica', verificarAutenticacao, upload.single('audio'), (req, res) => {
  const { nome, artista, album, dataLancamento } = req.body;
  const arquivoAudio = req.file;

  // Verifica se todos os campos necessários foram fornecidos
  if (!nome || !artista || !album || !dataLancamento || !arquivoAudio) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Insere a nova música no banco de dados
  const query =
    'INSERT INTO musicas (nome, artista, album, data_lancamento, endereco_audio) VALUES (?, ?, ?, ?, ?)';
  db.run(
    query,
    [nome, artista, album, dataLancamento, arquivoAudio.path],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar música' });
      }

      res.status(201).json({ message: 'Música criada com sucesso' });
    }
  );
});

app.get('/musicas', (req, res) => {
  const query = 'SELECT * FROM musicas';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao obter músicas' });
    }
    res.json(rows);
  });
});

app.get('/musicas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM musicas WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao obter música' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }

    res.json(row);
  });
});

// Rota para editar uma música específica
app.put('/musicas/:id', verificarAutenticacao, (req, res) => {
  const { id } = req.params;
  const { nome, artista, album, dataLancamento } = req.body;
  const query =
    'UPDATE musicas SET nome = ?, artista = ?, album = ?, data_lancamento = ? WHERE id = ?';

  db.run(query, [nome, artista, album, dataLancamento, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao editar música' });
    }

    res.json({ message: 'Música editada com sucesso' });
  });
});

// Rota para remover uma música específica
app.delete('/musicas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM musicas WHERE id = ?';

  db.run(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao remover música' });
    }

    res.json({ message: 'Música removida com sucesso' });
  });
});

app.listen(3001, () => {
  console.log('Servidor na porta 3001');
});
