const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
    idDev: String,
    login: { type: String },
    name: { type: String },
    bio: { type: String },
    location: { type: String },
    html_url: { type: String },
    tags: [{ type: String }],

});

const folderSchema = new Schema({

    folderName: { type: String, required: true, unique: true },
    devs: [devSchema],

}, {
        timestamps: true
    });

const folder = mongoose.model('Folder', folderSchema);

module.exports = folder;