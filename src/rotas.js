const express = require('express');
const { cadastrarUsuario, obterPerfil, atualizarPerfil } = require('./controladores/usuario');
const { login } = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');
const { novaPostagem, curtir, comentar, feed } = require('./controladores/postagens');

const rotas = express();

// CADASTRAR USUÁRIO
rotas.post('/cadastro', cadastrarUsuario);

// LOGIN
rotas.post('/login', login);

// FILTRO QUE VERIFICA LOGIN
rotas.use(verificarLogin);

// OBTER PERFIL
rotas.get('/perfil', obterPerfil);

// ATUALIZAR PERFIL
rotas.put('/perfil', atualizarPerfil);

// POSTAGENS
rotas.post('/postagens', novaPostagem);
rotas.get('/postagens', feed);
rotas.post('/postagens/:postagemId/curtir', curtir);
rotas.post('/postagens/:postagemId/comentar', comentar);
module.exports = rotas;