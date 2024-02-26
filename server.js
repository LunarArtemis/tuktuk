const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const path = require('path');
const db = require("./src/models")
const initRoutes = require('./src/routes/web')
const {body,validationResult} = require('express-validator');
const dbConnection = require('./src/config/dbConnect');
const bcrypt = require('bcrypt');
const homeController = require('./src/controllers/home');

global.__basedir = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(flash())
app.set('views' , path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
initRoutes(app);

// db.sequelize.sync({force:true}).then(() => {
//     console.log('Drop and Resync db');
// })
db.sequelize.sync();
const ifNotLoggedIn = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.render('login-register'); //res.render('login-register');
    }
    next();
}

const ifLoggedIn = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

// Search endpoint
app.get('/search', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
    if (!searchTerm) {
        return res.status(400).json({error: 'Search term is required'});
    }
    const query = `SELECT * FROM customers WHERE customer_first_name LIKE ?`;
    const searchValue = `%${searchTerm}%`;

    try {
        const [results, fields] = await dbConnection.query(query, [searchValue, searchValue]);
        console.log("results", results);
        res.json(results);
    } catch (err) {
        console.error('Error executing search query:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});


//root page
app.get('/',ifNotLoggedIn,(req,res,next)=>{
    dbConnection.execute("SELECT username FROM user WHERE id=?",[req.session.userID])
    .then(([rows]) => {
        res.render('login-register', {
            name: rows[0].name
        })
    })
})

//Register Page
app.post("/register" , ifLoggedIn,[
    body('regUsername','Username is empty').trim().not().isEmpty().custom((value) => {
        return dbConnection.execute("SELECT username FROM user WHERE username=?",[value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This Username already in use');
            }
            return true;
        })
    }),
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

//Login Page
app.post('/login',ifLoggedIn, [
    body('usernameL','Username is empty').trim().not().isEmpty().custom((value) => {
        return dbConnection.execute('SELECT username from user WHERE username = ? '[value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
            }
            return Promise.reject('Invalid Username');
        });
    }),
    body('passwordL','Password is empty').trim().not().isEmpty(),
],(req,res) => {
    const validation_result = validationResult(req);
    const {passwordL,usernameL} = req.body;
    if(validation_result.isEmpty()){
        dbConnection.execute("SELECT * FROM user WHERE username=?",[usernameL])
        .then(([rows]) => {
            bcrypt.compare(passwordL, rows[0].password).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;
                    res.redirect('/');
                }else{
                    res.render('login-register',{
                        login_errors:['Invalid Password']
                    })
                
                }
            }).catch(err => {
                if(err) throw err;
            })
        }).catch(err => {
                if(err) throw err;
            })
    }else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        })

        res.render('login-register', {
            login_errors: allErrors
        })
    }
})

app.use('/',(req,res)=>{
    res.status(404).send('<h1>404 Page not Found</h1>')
})
let port = 3000;
app.listen(port, () => {
    console.log(`Server Running at localhost:${port}`);
})