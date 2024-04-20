const Image = require('../models/images.model.js');

const pin = async(req, res) => {
    let data = await Image.findById(req.params.id);
    res.render('pin', { data: data });
};

module.exports = pin;