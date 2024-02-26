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
                    res.redirect('/login')
                }
            })
        }else{
            res.redirect('/login')
        }
    })
}