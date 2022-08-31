const mongoose =require('mongoose')

const commentsSchema = new mongoose.Schema({
    name: String,
    comment: String,
   
   

}, {timestamps:true})



const Comments = mongoose.model('Comment', commentsSchema)

module.exports = Comments