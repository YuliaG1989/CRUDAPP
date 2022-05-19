const mongoose =require('mongoose')

const loginSchema = new mongoose.Schema({
    
    email: String,
    password: String
  

}, {timestamps:true})



const Login = mongoose.model('Login', loginSchema)

module.exports = Login