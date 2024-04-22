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
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
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

app.use('/',(req,res)=>{
    res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TukTuk</title>
            <!-- Include Tailwind CSS -->
            <script src="https://cdn.tailwindcss.com"></script>
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
                rel="stylesheet" />
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

            <link rel="icon" type="image/x-icon" href="/static/assets/uploads/tuktuk.png">

    </head>

    <body>
        <section class="bg-white">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center">
                    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#8e70b7] ">404</h1>
                    <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Something's missing.</p>
                    <p class="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <a href="/" class="inline-flex text-white bg-[#8e70b7] hover:bg-[#684e89] focus:ring-4 focus:outline-none focus:ring-[#d3cbe7] font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to Homepage</a>
                </div>   
            </div>
        </section>
    </body>
    </html>
    `)
})
let port = 3000;
app.listen(port, () => {
    console.log(`Server Running at localhost:${port}`);
})