const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController.js');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');
const storeController = require('../controllers/storeUserController');
const loginController = require('../controllers/loginPageController');
const loginUserController = require('../controllers/loginUserController');
const logoutController = require('../controllers/logoutController');
const redirectifAuth = require('../middleware/redirectifAuth');
const Image = require('../models/images.model.js');

let routes = (app) => {
    app.set('view engine', 'ejs');
    //get
    router.get('/', webController.getHome)
    router.get('/upload',webController.getUpload);
    router.get('/login',redirectifAuth, loginController);
    router.get('/register',redirectifAuth, webController.getRegister);
    router.get('/logout', logoutController);
    router.get('/search/:key', async (req, res) => {
        let data = await Image.find(
            { 
                "$or": [
                    { "title": { "$regex": req.params.key, "$options": "i" } },
                    { "description": { "$regex": req.params.key, "$options": "i" } },
                    { "tags": { "$regex": req.params.key, "$options": "i" } }
                ]
            }
        );
        //show image
        res.render('search', { data: data });
    });

    
    //post
    router.post('/user/upload',upload.single("fileInput"), uploadController.uploadFiles);
    router.post('/user/register',redirectifAuth,storeController)
    router.post('/user/login',redirectifAuth,loginUserController)
    return app.use("/",router);
}

module.exports = routes;