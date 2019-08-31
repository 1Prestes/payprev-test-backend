const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    cpf: { type: String, required: true, unique: true, min: 11, max: 11 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    admin: { type: Boolean, required: true, default: false },
}, {
        timestamps: true,
    });

// Verifica se a senha foi modificada e gera um hash antes de salvar no banco
UserSchema.pre('save', async function (next) {
    let user = this;

    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();

})

module.exports = mongoose.model('User', UserSchema);