const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dotenv = require('dotenv')

dotenv.config()

const ImageSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: String,
    filename: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    tags: [String]
  });

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image
