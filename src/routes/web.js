const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');

let routes = (app) => {
    app.set('view engine', 'ejs');
    router.get('/', homeController.getHome)
    router.get('/uploaded', homeController.getUpload);
    router.get('/signin', homeController.getSignin);
    router.post('/upload', upload.single("fileInput"), uploadController.uploadFiles);
    return app.use("/",router);
}

module.exports = routes;