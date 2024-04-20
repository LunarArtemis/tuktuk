const Image = require('../models/images.model');
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
        req.flash('validationErrorsUpdate', validationErrors);
        return res.redirect('/edit');
    })
    .catch(err => {
        const validationErrors = "Image update failed";
        req.flash('validationErrorsUpdate', validationErrors);
        return res.redirect('/edit');
    });
}