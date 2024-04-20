const Image = require('../models/images.model');
const path = require("path");
module.exports = async (req,res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const img = await Image.findById(id);
        if(img == null){
            res.redirect('/');
        }else{
            // tags is array so we need to convert it to string split with ,
            const tags = img.tags.join(',');
            res.render(path.join(`${__dirname}/../views/edit_images.ejs`),{
                title: img.title,
                description: img.description,
                tags: tags,
                id: img._id,
                path: img.filepath
            })
        }
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
}