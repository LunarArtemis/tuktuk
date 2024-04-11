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
const editController = require('../controllers/editController');


let routes = (app) => {
    app.set('view engine', 'ejs');
    //get
    // router.get('/', webController.getHome);
    router.get('/', async (req, res) => {
        let data = await Image.find({}).limit(9).sort({$natural:-1});
        //show image
        res.render('home', { data: data });
    });

    router.get('/upload',webController.getUpload);
    router.get('/login',redirectifAuth, webController.getLogin);
    router.get('/logout', logoutController);
    router.get('/edit', webController.getEdit);
    router.get('/edit/:key', async (req, res) => {
        let data = await Image.find(
            { 
                    // uploaded_by: req.session.userId, //not test yet.
                "$or": [
                    { "title": { "$regex": req.params.key, "$options": "i" } },
                    { "tags": { "$regex": req.params.key, "$options": "i" } }
                ]
            }
        );
        res.render('edit', { data: data });
    });
    router.get('/editSea', editController);
    router.get('/search/:key', async (req, res) => {
        let data = await Image.find(
            { 
                "$or": [
                    { "title": { "$regex": req.params.key, "$options": "i" } },
                    { "tags": { "$regex": req.params.key, "$options": "i" } }
                ]
            }
        );
        res.render('search', { data: data });
    });
    router.get('/pin/:id', async(req, res) => {
        let data = await Image.findById(req.params.id);
        res.render('pin', { data: data });
    });
    
    //post
    router.post('/user/upload',upload.single("fileInput"), uploadController.uploadFiles);
    router.post('/user/register',redirectifAuth,storeController)
    router.post('/user/login',redirectifAuth,loginUserController)

    return app.use("/",router);
}

module.exports = routes;