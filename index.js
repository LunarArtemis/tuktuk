const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const {body,validationResult} = require('express-validator');

const app = express();
app.use(express.urlencoded({ extended: false }))

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 //1hr
}))

const ifNotLoggedIn = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.render('home'); //res.render('login-register');
    }
    next();
}

const ifLoggedIn = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}

//root page
app.get('/',ifNotLoggedIn,(req,res,next)=>{
    dbConnection.execute("SELECT username FROM user WHERE id=?",[req.session.userID])
    .then(([rows]) => {
        res.render('home', {
            name: rows[0].name
        })
    })
})

//Register Page
app.post("/register" , ifLoggedIn,[
    body('regUsername','Username is empty').trim().not().isEmpty(),
    body('regPassword','The password must be of minimum length 6 characters').trim().isLength({min:6}),
], //end of post data validation

(req,res,next) => {
    const validation_result = validationResult(req);
    const {regUsername,regPassword} = req.body;
    if (validation_result.isEmpty()){
        bcrypt.hash(regPassword, 12).then((hash_pass) => {
            dbConnection.execute("INSERT INTO user(username,password) VALUES(?,?)",[regUsername,hash_pass])
            .then(result => {
                res.send(`Your account has been created successfully, Now you can <a href="/">Login</a>`);
            }).catch(err => {
                if (err) throw err;
            })
        }).catch(err => {
            if (err) throw err;
        })
    }else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        
        })

        res.render('login-register',{
            register_error: allErrors,
            old_data: req.body
        })
    }
})
app.listen(3000,()=> console.log("Server is running...."))
