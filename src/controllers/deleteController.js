const Image = require('../models/images.model');

const Del = async(req, res) =>{
    Image.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Image deleted successfully');
        }
    });
}

module.exports = Del;