const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Middleware para analisar corpos de solicitação JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Sportfy',
  password: '18122003',
  port: 5432,
});

// Rota para lidar com solicitações de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      // Redirecionar para a página principal com uma mensagem de login bem-sucedido
      res.redirect('/?login=sucesso');
    } else {
      // Redirecionar de volta para a página de login com uma mensagem de credenciais inválidas
      res.redirect('/login?error=invalid');
    }
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    res.status(500).send('Erro ao processar o login.');
  }
});

// Rota para lidar com solicitações de cadastro
app.post('/cadastro', async (req, res) => {
  const { email, name, lastname, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (email, name, lastname, password) VALUES ($1, $2, $3, $4)',
      [email, name, lastname, password]
    );

    // Salvar os dados também em um arquivo usuarios.json
    const newUser = { email, name, lastname, password };
    saveUserToJson(newUser);

    // Redirecionar para a página principal com uma mensagem de confirmação
    res.redirect('/?cadastro=sucesso');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

// Função para salvar um usuário em usuarios.json
function saveUserToJson(user) {
  try {
    // Carrega o conteúdo atual do arquivo usuarios.json
    let usuarios = [];
    try {
      usuarios = JSON.parse(fs.readFileSync('../Cadastros/usuarios.json', 'utf8'));
    } catch (err) {
      // Se o arquivo não existir ou estiver vazio, continua com um array vazio
    }

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(user);

    // Escreve os usuários de volta no arquivo usuarios.json
    fs.writeFileSync('../Cadastros/usuarios.json', JSON.stringify(usuarios, null, 2));
    console.log('Usuário salvo em usuarios.json:', user);
  } catch (err) {
    console.error('Erro ao salvar o usuário em usuarios.json:', err);
  }
}

// Rota para servir o arquivo Main.html
app.get('/', (req, res) => {
  let message = '';
  if (req.query.cadastro === 'sucesso') {
    message = 'Cadastro realizado com sucesso!';
  }
  res.sendFile(path.join(__dirname, '../HTML/Main.html'));
});

// Rota para servir o arquivo cadastro.html
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/cadastro.html'));
});

// Rota para servir a página de login
app.get('/login', (req, res) => {
  let message = '';
  if (req.query.error === 'invalid') {
    message = 'Credenciais inválidas. Tente novamente.';
  }
  res.sendFile(path.join(__dirname, '../HTML/login.html'));
});

// Servir arquivos estáticos nas pastas 'JS', 'CSS', 'Imagens' e 'HTML'
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use('/CSS', express.static(path.join(__dirname, '../CSS')));
app.use('/Imagens', express.static(path.join(__dirname, '../Imagens')));
app.use('/HTML', express.static(path.join(__dirname, '../HTML')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
