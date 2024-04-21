const Image = require('../models/images.model');
const path = require("path");
const fs = require('fs');
module.exports = async (req,res)=>{
    let id = req.params.id;
    let validationError = "";
    try {
        const result = await Image.findOneAndDelete({ _id: id });
        if(result && result.image != ""){
            try{
                fs.unlinkSync(path.join(__dirname+'/../../', result.filepath));
            }catch(err){
                console.log(err);
            }
        }
        validationError = "Image Delete Successfully";
    } catch(err) {
        console.log(err);
        validationError = "Image Delete Failed";
    }
    return res.redirect('/edit?status='+validationError);
}