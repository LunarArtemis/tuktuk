const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dotenv = require('dotenv')

dotenv.config()

const ImageSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    uploaded_by:{
      type: String,
      required: true
    },
    filepath:{
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    tags: {
      type: [String],
      required: true
    }
  });

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image
