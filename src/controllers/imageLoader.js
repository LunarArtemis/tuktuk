const mongoose = require('mongoose');
const Image = require('../models/images.model.js');
const path = require("path");
const flash = require('connect-flash')

module.exports = async (req, res) => {
    try {
        let messageUpdate = null
        if(req.query.status){
            messageUpdate = req.query.status
        }
        const images = await Image.find({ uploaded_by: req.session.userId });
        res.render(path.join(`${__dirname}/../views/edit.ejs`), { 
            images, messageUpdate: messageUpdate
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}