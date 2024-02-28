const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Please provide a username'],
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],
    },
    role:{
        type: String,
        default: 'member',
        enum: ["member","staff","admin"]
    }
})

UserSchema.pre('save', function(next) {
    const user = this
    const salt_round = process.env.SALT_ROUND
    bcrypt.hash(user.password,parseInt(salt_round)).then(hash => {
        user.password = hash
        next()
    }).catch(err => {
        console.error(err)
    })
})

const User = mongoose.model('users', UserSchema)
module.exports = User