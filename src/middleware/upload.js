const multer = require('multer');
(req,res) => {
if(!req.session.userId){
        return res.redirect('/')
    }
}
const imageFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else {
        cb("Please upload only images" , false);
    }
}

let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {   
        cb(null, `${Date.now()}-image-${file.originalname}`);
    }
})

let uploadFile = multer({storage: storage, fileFilter: imageFilter});
module.exports = uploadFile
    
