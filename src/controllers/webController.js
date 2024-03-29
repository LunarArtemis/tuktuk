const path = require("path");

const home = (req,res) => {
    res.render(path.join(`${__dirname}/../views/home.ejs`))
}
const upload = (req,res) =>{
    res.render(path.join(`${__dirname}/../views/upload.ejs`))
}
const signin = (req,res) =>{
    res.render(path.join(`${__dirname}/../views/login-register.ejs`))
}
const edit = (req,res) =>{
    res.render(path.join(`${__dirname}/../views/edit.ejs`))
}

const register = (req,res)=>{
    let username =""
    let password=""
    let data = req.flash('data')[0]

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render(path.join(`${__dirname}/../views/register.ejs`),{
        errors:req.flash('validationErrors'),
        username:username,
        password:password
    })

}

module.exports = {
    getHome: home,
    getUpload: upload,
    getRegister: register,
    getEdit: edit
}

