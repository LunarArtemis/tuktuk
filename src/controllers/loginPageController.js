const path = require("path");
module.exports = (req,res)=>{
    let username =""
    let password=""
    let data = req.flash('data')[0]

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('/views/login.ejs',{
        errors: req.flash('validationError'),
        username:username,
        password:password
    })
}