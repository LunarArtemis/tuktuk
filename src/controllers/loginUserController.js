const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req,res)=>{
    const{username,password} =req.body;
    //verify user
    User.findOne({username: username}).then((user)=>{
        console.log(user)
        if(user){
            let cmp = bcrypt.compare(password,user.password).then((match)=>{
                if(match){
                    req.session.userId=user._id
                    req.session.userName=user.role
                    res.redirect('/')
                }else{
                    const validationErrors = "User or Password Incorrect";
                    req.flash('validationErrors', validationErrors);
                    req.flash('data', req.body);
                    res.redirect('/login')
                }
            })
        }else{
            const validationErrors = "User not found";
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            res.redirect('/login')
        }
    })
}