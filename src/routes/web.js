const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController.js');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');
const storeController = require('../controllers/storeUserController');
const loginUserController = require('../controllers/loginUserController');
const logoutController = require('../controllers/logoutController');
const redirectifAuth = require('../middleware/redirectifAuth');
const Image = require('../models/images.model.js');
const imageLoader = require('../controllers/imageLoader');
const countDownload = require('../controllers/countDownload');
const countLike = require('../controllers/countLike');
const searchController = require('../controllers/searchController');
const pinController = require('../controllers/pinController');
const notLogin = require('../middleware/notLogin');
const editController = require('../controllers/editController');
const updateController = require('../controllers/updateController');

let routes = (app) => {
    app.set('view engine', 'ejs');
    
    //get
    router.get('/', async (req, res) => {
        let data = await Image.find({}).sort({$natural:1});
        // let data = await Image.find({}).limit(9).sort({$natural:-1});
        res.render('home', { data: data });
    });
    router.get('/upload',notLogin,webController.getUpload);
    router.get('/login',redirectifAuth, webController.getLogin);
    router.get('/logout',notLogin,logoutController);
    router.get('/edit', notLogin, imageLoader);
    router.get('/download/:id', countDownload);
    router.get('/search/:key', searchController);
    router.get('/pin/:id', pinController);
    router.get('/edit/:id', notLogin,editController)
    router.get('/edit_images',notLogin,webController.getEditImages);
    //post
    router.post('/user/upload',upload.single("fileInput"), uploadController.uploadFiles);
    router.post('/user/register',redirectifAuth,storeController)
    router.post('/user/login',redirectifAuth,loginUserController)
    router.post('/like/:id', notLogin, countLike);
    router.post('/update/:id',upload.single("fileInput"),updateController)

    return app.use("/",router);
}

module.exports = routes;