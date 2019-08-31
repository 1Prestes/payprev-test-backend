const user = require('../models/user');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const authAdmin = (req, res, next) => {
    const { auth, id } = req.headers;
    const token_header = auth;

    if (!token_header || !id) return res.status(401).send({ error: 'Opa, parece ue você não tem autorização para isso :V' });

    // Verificando se o Usuario tem super poderes de admin
    async function verifyAdmin() {

        if (! await user.findById(id)) return res.status(404).send({ error: 'Opa, parece ue você não tem autorização para isso :V' })
        const isAdmin = await user.findById(id, (err, res) => { });

        if (isAdmin.admin == true) {

            // Verificando se o token é valido e criado com a senha configurada no jwt_pass
            jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
                if (err) res.status(401).send({ error: 'Opa, tem algo estranho acontecendo ai o.o' });
                res.locals.auth_data = decoded;
                return next();
            });
        } else {
            return res.status(403).send({ error: "Opa, você está tentando acessar uma area restrita!" })
        }
    }

    verifyAdmin();

}

module.exports = authAdmin;