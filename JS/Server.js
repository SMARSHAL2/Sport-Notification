const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');

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
  //password: '18122003',
  port: 5432,
});

fs.readFile('../Cadastros/usuarios.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo usuarios.json:', err);
    return;
  }
  
  try {
    const usuarios = JSON.parse(data);
    console.log('Usuários:', usuarios);
  } catch (err) {
    console.error('Erro ao analisar o conteúdo do arquivo usuarios.json:', err);
  }
});
// Rota para lidar com solicitações de cadastro
app.post('/cadastro', async (req, res) => {
  const { email, name, lastname, password } = req.body;

  try {
    // Inserindo os dados na tabela do PgAdmin
    const result = await pool.query(
      'INSERT INTO usuarios (email, name, lastname, password) VALUES ($1, $2, $3, $4)',
      [email, name, lastname, password]
    );

    res.status(201).send('Usuário cadastrado com sucesso.');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

// Rota para servir o arquivo Main.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/Main.html'));
});

// Rota para servir o arquivo cadastro.html
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../HTML/cadastro.html'));
});

// Servir arquivos estáticos nas pastas 'JS', 'CSS', 'Imagens' e 'HTML'
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use('/CSS', express.static(path.join(__dirname, '../CSS')));
app.use('/Imagens', express.static(path.join(__dirname, '../Imagens')));
app.use('/HTML', express.static(path.join(__dirname, '../HTML')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Função para enviar os dados para o servidor
function enviarDados() {
  // Obtém os dados do formulário
  let formData = new FormData(form);

  // Envia os dados para o servidor via AJAX
  fetch('/cadastro', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          // Verifica se a resposta do servidor foi bem-sucedida
          if (response.ok) {
              window.location.href = "../HTML/Main.html";
          } else {
              console.error('Erro ao salvar os dados:', response.statusText);
          }
      })
      .catch(error => {
          console.error('Erro ao salvar os dados:', error);
      });
}

// Instância do objeto Validator
let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();
  validator.validate(form);
  // Verifica se todas as validações foram passadas
  if (form.querySelectorAll('.error-validation').length === 0) {
      // Se sim, enviar os dados para o servidor
      enviarDados();
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
