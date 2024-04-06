const mongoose = require('mongoose');
const Image = require('../models/images.model.js');
const path = require("path");


module.exports = async (req, res) => {
    try {
        const images = await Image.find({ uploaded_by: req.session.userId });
        res.render(path.join(`${__dirname}/../views/edit_sea.ejs`), { images });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}