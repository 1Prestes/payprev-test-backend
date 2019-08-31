const axios = require('axios');
const devFolders = require('../models/folders');
const userGit = require('../models/userGit');


module.exports = {
    async searchDevs(req, res) {
        try {
            const devs = await userGit.find({});
            return res.send(devs);

        } catch (error) {
            return res.status(400).send({ error: 'Opa, parece que deu ruim no servidor!' });
        }
    },

    async searchFolder(req, res) {
        try {
            const folders = await devFolders.find({});
            return res.send(folders);

        } catch (error) {
            return res.status(400).send({ error: 'Opa, parece que deu ruim no servidor!' });
        }
    },

    async showDev(req, res) {
        try {
            const dev = await userGit.findById(req.params.id);
            return res.send({ respenso: dev });
        } catch{

        }
    },

    async renameFolder(req, res) {
        const { folderName, newFolderName, id } = req.body;

        if (!folderName || !newFolderName || !id) return res.status(404).send({ error: "Opa, parece que está faltando algum dado :/" });

        if (await devFolders.findOne({folderName})) {

            const newNameFolder = await devFolders.findByIdAndUpdate(id, { folderName: newFolderName }, { new: true });
            return res.send({ response: newNameFolder.folderName });
        } else {
            res.status(404).send({ error: "Opa, parece que não existe nenhama pasta com esse nome :/" });
        }
    },
    async addToFolder(req, res) {

        const { folderName, idDev, tags, } = req.body;

        if (!folderName || !idDev) return res.status(400).send({ error: "Opa, parece que você esqueceu algum dado :/" });

        const verifyDev = await userGit.findById({ _id: idDev });
        const { login, name, bio, location, html_url, } = verifyDev;

        if (!verifyDev) return res.status(404).send({ error: "Opa, não consegui encontrar o dev informado :/" });

        const tagsTrim = [];
        const tagsDev = tags.split(",");

        for (let i = 0; i < tagsDev.length; i++) {
            tagsTrim[i] = tagsDev[i].trim();
        }

        const newFolderSchema = {
            folderName,
            devs: {
                idDev,
                login,
                name,
                bio,
                location,
                html_url,
                tags: tagsTrim,
            }
        }

        const verifyFolder = await devFolders.findOne({ folderName });

        if (verifyFolder) {
            const response = await devFolders.findOneAndUpdate({ folderName }, { $push: { devs: newFolderSchema.devs } })

            return res.status(201).send({ response: response })
        }

        const newFolder = await devFolders.create(newFolderSchema);
        return res.status(201).send({ response: newFolder });

    },
    async deleteFolder(req, res) {
        const { folderName } = req.body;

        if (!folderName) return res.status(404).send({ error: "Opa, parece que você esqueceu de enviar o nome da nova pasta" });

        if (await devFolders.findOne({ folderName: folderName })) {

            const folder = await devFolders.deleteOne({ folderName }, { new: true });
            return res.send({ response: folder });
        } else {
            res.status(404).send({ error: "Opa, parece que não existe nenhama pasta com esse nome :/" });
        }
    },

}

