//connect database
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri,{
    useNewUrlParser: true
})
//end connect
module.exports = mongoose;
// Path: src/models/index.js