const expressHandler = require('express-async-handler');
const Image = require('../models/images.model');
const fs = require('fs');
const express = require('express');

const uploadFiles = expressHandler(async(req,res)=>{
    try{
        console.log(req.file.path);

        if(req.file == undefined){
            return res.send("You must select a file to upload")
        }
        console.log(req.body);
        const existingTitle = await Image.findOne({ title: req.body.inputName })
        if (existingTitle) {
            const validationErrors = "Image title already exists";
            filePath = req.file.path;
            req.flash('validationErrors', validationErrors);
            req.flash('success', false);
            req.flash('data', req.body);
            fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error occurred while deleting file:', err);
            }else{
                console.log('File deleted successfully');
            }
        });
            return res.redirect('/upload');
        } else {
            const validationErrors = "Image uploaded successfully";
            req.flash('validationErrors', validationErrors);
            req.flash('success', true);
            req.flash('data', req.body);
            const image = Image({
                title: req.body.inputName,
                type: req.file.mimetype,
                uploaded_by: req.session.userId,
                description: req.body.inputDescription,
                filename: req.file.originalname,
                filepath: "/resources/static/assets/uploads/" + req.file.filename,
                tags: req.body.inputTag.split(/[\s,]/)
            });

            await image.save();
            return res.redirect('/upload');

        }
    } catch(error){
        console.log(error);
        return res.send(`Error when trying to upload images: ${error}`);
    }
})
module.exports = {
    uploadFiles
}
