const axios = require('axios');
const userGit = require('../models/userGit');

module.exports = {
    async searchDev(req, res) {
        const { username } = req.params;

        await axios.get(`https://api.github.com/users/${username}`)
            .then(response => {

                return res.status(200).send({ response: response.data })

            }).catch(error => {

                return res.status(404).send({ error: 'Opa, o usuario pesquisado não existe :/' });
            })
    },

    async saveDev(req, res) {
        const { username, add } = req.params;

        if (!username || add.toLowerCase() != 'add') return res.status(400).send({ error: "Opa, parece que algum parametro está errado :/" });


        await axios.get(`https://api.github.com/users/${username}`)
            .then(async response => {
                const { login, name, bio, location, html_url, } = response.data;

                const duplicate = await userGit.findOne({ login: login });

                if (duplicate) return res.status(400).send({ error: 'Opa, esse dev já está registrado na nossa base de dados :v' });

                const user = await userGit.create({
                    login,
                    name,
                    bio,
                    location,
                    html_url,
                });
                return res.status(200).send({ response: user });
            })
            .catch(error => {
                if (error.response.status == 403) {
                    return res.status(403).send({ error: 'DEU RUIM!! O limite de requisições a API do GitHub excedeu.' })
                } else if (error.response.status == 404) {
                    return res.status(404).send({ error: 'Opa, esse usuario não existe nos repositorios do GitHub :v' });
                } else {
                    return res.status(500).send({ error: 'DEU RUIM!! provavelmente os servidores explodirão' });
                }
            });
    }

}