const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const uploadController = require('../controllers/upload');
const upload = require('../middleware/upload');

let routes = (app) => {
    app.set('view engine', 'ejs');
    router.get('/', homeController.getHome);
    router.get('/upload', homeController.getUpload);
    router.post('/getUpload', upload.single("fileInput"), uploadController.uploadFiles);
    return app.use("/",router);
}

module.exports = routes;