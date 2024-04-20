const path = require("path");

const home = (req,res) => {
    res.render(path.join(`${__dirname}/../views/home.ejs`))
}
const upload = (req,res) =>{
    let success =""
    let data = req.flash('data')[0]
    res.render(path.join(`${__dirname}/../views/upload.ejs`),{
        message: req.flash('validationErrors'),
        success: success,
        data:data
    })
    
}
const edit = (req,res) =>{
    res.render(path.join(`${__dirname}/../views/edit.ejs`),{
        messageUpdate: req.flash('validationErrorsUpdate'),
        success: success
    })
}

const login = (req,res)=>{
    let username =""
    let password=""
    let data = req.flash('data')[0]

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render(path.join(`${__dirname}/../views/login.ejs`),{
        errors: req.flash('validationErrors'),
        username:username,
        password:password
    })

}
const edit_images = (req,res)=>{
     res.render(path.join(`${__dirname}/../views/edit_images.ejs`))
}

module.exports = {
    getHome: home,
    getUpload: upload,
    getLogin: login,
    getEdit: edit,
    getEditImages: edit_images
}

