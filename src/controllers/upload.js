const expressHandler = require('express-async-handler');
const Image = require('../models/images.model');

const uploadFiles = expressHandler(async(req,res)=>{
    try{
        console.log(req.file);

        if(req.file == undefined){
            return res.send("You must select a file to upload")
        }
        
        const image = Image({
            title: req.body.inputName,
            type: req.file.mimetype,
            description: req.body.inputDescription,
            filename: req.file.originalname,
            filepath: "/resources/static/assets/uploads/" + req.file.filename,
            tags: req.body.inputTag.split(',')
        });

        await image.save();

        return res.send("File successfully uploaded");
    } catch(error){
        console.log(error);
        return res.send(`Error when trying to upload images: ${error}`);
    }
})
module.exports = {
    uploadFiles
}
