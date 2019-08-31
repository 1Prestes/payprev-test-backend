const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerControler');
const getUsersGit = require('../controllers/getUsersGit');
const folderControler = require('../controllers/folderControler');

const auth = require('../controllers/auth');
const authAdmin = require('../controllers/authAdmin');

//  ###### ROTAS DO ADMIN
routes.get('/user/:username', authAdmin, getUsersGit.searchDev);
routes.post('/user/:username/:add', authAdmin, getUsersGit.saveDev);
routes.get('/list', authAdmin, registerController.list);
routes.delete('/deleteuser', authAdmin, registerController.deleteUser);
routes.put('/edit', authAdmin, registerController.editUser);

// ######## ROTAS DO USUÁRIO COMUM
routes.delete('/delete', auth, folderControler.deleteFolder);
routes.get('/devs', auth, folderControler.searchDevs);
routes.get('/folders', auth, folderControler.searchFolder);
routes.put('/renamefolder', auth, folderControler.renameFolder);
routes.post('/adddev/', auth, folderControler.addToFolder);

// ####### ROTAS PUBLICAS
routes.post('/login', registerController.login);
routes.post('/register', registerController.register);


module.exports = routes;
