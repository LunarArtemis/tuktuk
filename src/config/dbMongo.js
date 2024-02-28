//connect database
const mongoose = require('mongoose');
//connect to mongodb
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
