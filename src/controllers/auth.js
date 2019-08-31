const user = require('../models/user');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const auth = (req, res, next) => {
    const { auth, id } = req.headers;
    const token_header = auth;

    if (auth && id) {

        async function verifyAdmin() {
            const isAdmin = await user.findById(id);
            console.log(isAdmin.admin);

        }
        verifyAdmin();
    }

    if (!token_header) return res.status(401).send({ error: 'Opa, parece que você não tem autorização para isso :V' });

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if (err) res.status(401).send({ error: 'Opa, tem algo estranho acontecendo ai o.o' });
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;