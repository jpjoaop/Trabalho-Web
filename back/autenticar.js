// Armazenamento dos tokens válidos
const validTokens = new Map();

// Função para adicionar um token válido ao armazenamento
function adicionarTokenValido(token, expiration) {
  validTokens.set(token, expiration);
}

// Função para remover um token válido do armazenamento
function removerTokenValido(token) {
  validTokens.delete(token);
}

function verificarTokenValido(token) {
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const expiration = validTokens.get(tokenWithoutBearer);
    const currentTime = new Date().getTime();
  
    console.log('Token:', tokenWithoutBearer);
    console.log('Expiration Time:', expiration);
    console.log('Current Time:', currentTime);
  
    if (expiration) {
      if (expiration > currentTime) {
        console.log('Token é válido e não expirou.');
        return true;
      } else {
        removerTokenValido(tokenWithoutBearer);
        console.error('Token expirou.');
      }
    } else {
      console.error('Token não é válido ou não foi encontrado.');
    }
    return false;
  }
  

  function verificarAutenticacao(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Token não fornecido ou no formato incorreto!');
      return res.status(401).json({ error: 'Token não fornecido ou no formato incorreto' });
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      console.error('Token não fornecido!');
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    const tokenParts = token.split('-');
    if (tokenParts.length < 3) {
      console.error('Token inválido!');
      return res.status(401).json({ error: 'Token inválido' });
    }
  
    const tipoToken = tokenParts[1];
    console.log('Tipo do Token:', tipoToken);
    console.log('Rota acessada:', req.path);

  
    if (!verificarTokenValido(token)) {
      console.error('Token inválido ou expirado!');
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  
    console.log('Token verificado com sucesso.');
    next();
  }
  
  
  




// Função principal do serviço
// Recebe o login e senha informados pelo usuário e retorna um token de autenticação se a autenticação for bem-sucedida
function autenticarUsuario(email, senha, db) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.get(query, [email, senha], (err, row) => {
      if (err) {
        console.error(err);
        reject('Erro ao realizar login');
      } else if (row) {
        const token = gerarToken(row.tipo);
        console.log(`Usuário autenticado com sucesso. Token: ${token}`);
        resolve({ token: token, tipo: row.tipo });
      } else {
        console.log('Falha na autenticação. Credenciais inválidas.');
        reject('Credenciais inválidas');
      }
    });
  });
}

  
  


// Tempo de expiração do token (em milissegundos)
const tokenExpiration = 3600000; // 1 hora

function gerarToken(tipoUsuario) {
  const timestamp = new Date().getTime();
  const expiration = timestamp + tokenExpiration;
  const token = `TOKEN-${tipoUsuario}-${timestamp}`;
  console.log(`Gerando token: ${token}`);
  adicionarTokenValido(token, expiration);
  return token;
}



module.exports = {
    adicionarTokenValido,
    removerTokenValido,
    verificarTokenValido,
    autenticarUsuario,
    gerarToken,
    verificarAutenticacao

  };