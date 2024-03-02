const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const path = require('path');
// const db = require("./src/models")
const initRoutes = require('./src/routes/web')
const dbConnection = require('./src/config/dbConnect')
const dotenv = require('dotenv');
const User = require('./src/models/User');
const dbMongo = require('./src/config/dbMongo');
const { truncateSync } = require('fs');

dotenv.config()

//connect to mongodb
const uri = process.env.MONGODB_URI;
mongoose.connect(uri,{
    useNewUrlParser: true
})
//end connect
global.loggedIn = null;
global.role = null;
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(flash())
app.use(expressSession({
    secret:"node secret"
}))
//set session
app.use('*',(req,res,next)=>{
    loggedIn = req.session.userId;
    role = req.session.role;
    next();
})

//search endpoint
app.get('/search/:key', async (req, res) => {
    console.log(req.params.key);
    let data = await User.find(
        { 
            "$or": [
                {username: {$regex: req.params.key}}
            ]
        }
    );
    res.send(data);
});

app.set('views' , path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
initRoutes(app);

// db.sequelize.sync({force:true}).then(() => {
//     console.log('Drop and Resync db');
// })
//db.sequelize.sync();


app.use('/',(req,res)=>{
    res.status(404).send('<h1>404 Page not Found</h1>')
})
let port = 3000;
app.listen(port, () => {
    console.log(`Server Running at localhost:${port}`);
})