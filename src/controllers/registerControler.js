const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');
const config = require('../config/config');

// Função para criar um token temporario de autenticação ao efetuar login ou criar uma nova conta
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

module.exports = {
    async list(req, res) {
        try {
            const users = await Users.find({});
            return res.send(users);

        } catch (error) {
            return res.status(400).send({ error: 'Opa, parece que deu ruim no servidor!' });
        }
    },

    async register(req, res) {

        const { cpf, email, password } = req.body;
        const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!cpf || !email || !password) return res.status(400).send({ error: 'Opa, parece que você esqueceu algum campo vaziu :/' });
        if (cpf.length != 11) return res.status(400).send({ error: 'Opa, parece que o CPF digitado não é valido, digite apenas numeros :D' });
        if (password.length < 6) return res.status(400).send({ error: 'Opa, a senha precisa ter pelo menos 6 caracteres!' });

        if (!emailIsValid.test(email)) return res.status(400).send({ error: 'Opa, parece que você não digitou um email invalido :/' });

        try {
            if (await Users.findOne({ email })) return res.status(400).send({ error: 'Opa, parece que você está tentando cadastrar um email já registrado!' });
            if (await Users.findOne({ cpf })) return res.status(400).send({ error: 'Opa, parece que você está tentando cadastrar um CPF já registrado!' });

            const user = await Users.create(req.body);

            //Removendo da a senha da resposta para não ser retornada na API
            user.password = undefined;
            return res.status(201).send({ user, token: createUserToken(user._id) });

        } catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar usuario!' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: 'Opa, parece que você esqueceu algum campo vaziu :/' });

        try {
            const user = await Users.findOne({ email }).select('+password');

            if (!user) return res.status(400).send({ error: 'Opa, parece que esse usuario não está registrado!' });

            // Gerando um hash com a senha enviada pelo usuario e comparando com o hash no banco de dados
            const pass_ok = await bcrypt.compare(password, user.password);

            if (!pass_ok) return res.status(401).send({ error: 'Opa! parece que você está inserindo algum dado invalido :v' });

            // Removendo a senha da resposta para não ser retornada na API
            user.password = undefined;
            return res.send({ user, token: createUserToken(user._id) });

        } catch (error) {
            return res.status(500).send({ error: 'DEU RUIM! deu ruim no servidor!' });
        }
    },
    async editUser(req, res) {
        const { id, cpf, email, password, admin } = req.body;

        const setState = { cpf, email, password, admin, }

        if (!cpf || !email || !password) return res.status(400).send({ error: 'Opa, parece que você esqueceu algum campo vaziu!' });
        if (! await Users.findOne({ _id: id })) {
            return res.status(404).send({ error: 'Opa, esse usuario não  consta no sistema' });
        }

        setState.password = await bcrypt.hash(password, 10);

        await Users.findOneAndUpdate({ _id: id }, setState);

        return res.send(await Users.findOne({ _id: id }));
    },
    async deleteUser(req, res) {

        const { id } = req.body;
        if (!id) res.status(400).send({ error: 'Opa, parece que você esqueceu algum campo vaziu :/' });

        try {
            const user = await Users.findOne({ _id: id });

            if (user) {
                await Users.deleteOne({ _id: id })
                res.send({ message: user });
            } else {
                res.status(400).send({ error: 'Opa, parece que esse usuario não existe :v' });
            }
        } catch (error) {
            res.status(400).send({ error: 'DEU RUIM! deu ruim no servidor!' });

        }

    }
}