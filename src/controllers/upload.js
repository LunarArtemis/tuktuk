const fs = require('fs');
const db = require('../models');
const Image = db.images;

const uploadFiles = async (req,res) => {
    try{
        console.log(req.file);

        if(req.file == undefined){
            return res.send("You must select a file to upload")
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads" + req.file.filename
            )

        }).then((iamge) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp" + image.name, image.data
                )

            return res.send("File successfully uploaded")
        })


    }catch(error){

    }
}