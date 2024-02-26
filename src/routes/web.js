const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');
const storeController = require('../controllers/storeUserController');
const loginUserController = require('../controllers/loginUserController');
const logoutController = require('../controllers/logoutController');

let routes = (app) => {
    app.set('view engine', 'ejs');
    //get
    router.get('/', webController.getHome)
    router.get('/uploaded', webController.getUpload);
    router.get('/signin', webController.getSignin);
    router.get('/login', webController.getLogin);
    router.get('/register', webController.getRegister);
    router.get('/logout', logoutController);
    
    //post
    router.post('/upload', upload.single("fileInput"), uploadController.uploadFiles);
    router.post('/user/register',storeController)
    router.post('/user/login',loginUserController)
    return app.use("/",router);
}

module.exports = routes;