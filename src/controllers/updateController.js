const Image = require('../models/images.model');
const path = require("path");
module.exports = async (req,res) => {
    const id = req.params.id;
    new_image = req.body.old_image
    Image.findByIdAndUpdate(id, {
        title: req.body.inputName,
        description: req.body.inputDescription,
        tags: req.body.inputTag.split(/[\s,]/)
    })
    .then(result => {
        const validationErrors = "Image update successfully";
        return res.redirect('/edit?status='+validationErrors);
    })
    .catch(err => {
        const validationErrors = "Image update failed";
        return res.redirect('/edit?status='+validationErrors);
    });
}