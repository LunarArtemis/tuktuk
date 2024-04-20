const Image = require('../models/images.model.js');

const search = async (req, res) => {
    let data = await Image.find(
        { 
            "$or": [
                { "title": { "$regex": req.params.key, "$options": "i" } },
                { "tags": { "$regex": req.params.key, "$options": "i" } }
            ]
        }
    );
    res.render('search', { data: data });
};

module.exports = search;