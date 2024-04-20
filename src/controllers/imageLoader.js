const mongoose = require('mongoose');
const Image = require('../models/images.model.js');
const path = require("path");
const flash = require('connect-flash')

module.exports = async (req, res) => {
    try {
        const images = await Image.find({ uploaded_by: req.session.userId });
        const validationErrors = null;
        req.flash('validationErrorsUpdate', validationErrors);
        res.render(path.join(`${__dirname}/../views/edit.ejs`), { images });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}