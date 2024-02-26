const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');
const storeController = require('../controllers/storeUserController');
const loginUserController = require('../controllers/loginUserController');
const logoutController = require('../controllers/logoutController');
const redirectifAuth = require('../middleware/redirectifAuth');

let routes = (app) => {
    app.set('view engine', 'ejs');
    //get
    router.get('/', webController.getHome)
    router.get('/uploaded', webController.getUpload);
    router.get('/login',redirectifAuth, webController.getLogin);
    router.get('/register',redirectifAuth, webController.getRegister);
    router.get('/logout', logoutController);
    
    //post
    router.post('/upload', upload.single("fileInput"), uploadController.uploadFiles);
    router.post('/user/register',redirectifAuth,storeController)
    router.post('/user/login',redirectifAuth,loginUserController)
    return app.use("/",router);
}

module.exports = routes;