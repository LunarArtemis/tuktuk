const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const path = require('path');
// const db = require("./src/models")
const initRoutes = require('./src/routes/web')
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
const db = mongoose.connection;
db.on('error' , (error)=> console.log(error));
db.once('open',()=> console.log('Connected to database'));
//end connect
global.loggedIn = null;
global.role = null;
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources'))); //dont touch it!!!
app.use('/resources/static/assets/uploads',express.static('resources/static/assets/uploads'));
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