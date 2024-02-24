const path = require("path");
const home = (req,res) => {
    return res.render(path.join(`${__dirname}/../views/home.ejs`))
}
const upload = (req,res) =>{
    return res.render(path.join(`${__dirname}/../views/upload.ejs`))
}
const signin = (req,res) =>{
    return res.render(path.join(`${__dirname}/../views/login-register.ejs`))
}

module.exports = {
    getHome: home,
    getUpload: upload,
    getSignin: signin
}

