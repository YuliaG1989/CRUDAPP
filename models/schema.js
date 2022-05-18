const mongoose =require('mongoose')

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    intro: String
  

}, {timestamps:true})



const Category = mongoose.model('Category', categorySchema)

module.exports = Category