const path = require("path");
const home = (req,res) => {
    return res.render(path.join(`${__dirname}/../views/home.ejs`))
}
const upload = (req,res) =>{
    return res.render(path.join(`${__dirname}/../views/upload.ejs`))
}

module.exports = {
    getHome: home,
    getUpload: upload
}

