const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userGitSchema = new Schema({
    login: { type: String, required: true, unique: true },
    name: String,
    bio: String,
    location: String,
    html_url: { type: String, unique: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserGit', userGitSchema);