const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body;

    if (!username) {
        return res.status(404).json("O campo nome é obrigatório");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório");
    }

    if (senha.length < 5) {
        return res.status(404).json('A senha deve conter, no minimo, 5 caracteres.');
    }

    try {
        const verificarUsuario = await knex('usuarios').where({ username: username }).first();

        if (verificarUsuario) {
            return res.status(400).json("O username informado já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ username: username, senha: senhaCriptografada });

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json('Usuário cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
    let { nome, email, senha, imagem, username, site, bio, telefone, genero } = req.body;
    const { id } = req.usuario;

    if (!nome && !email && !senha && !imagem && !username && !site && !bio && !telefone && !genero) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        if (senha) {
            if (senha.length < 5) {
                return res.status(404).json('A senha deve conter, no minimo, 5 caracteres.');
            }

            senha = await bcrypt.hash(senha, 10);
        }

        if (email !== req.usuario.email) {
            const verificarEmail = await knex('usuarios').where({ email: email }).first();

            if (verificarEmail) {
                return res.status(404).json('O e-mail informado já existe.');
            }
        }

        const usuarioAtualizado = await knex('usuarios').where({ id: id }).update({ nome: nome, email: email, senha: senha, imagem: imagem, username: username, site: site, bio: bio, telefone: telefone, genero: genero });

        if (!usuarioAtualizado) {
            return res.status(400).json("O usuario não foi atualizado");
        }

        return res.status(200).json('Usuario foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}