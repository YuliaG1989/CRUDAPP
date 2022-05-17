const mongoose =require('mongoose')

const loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  

}, {timestamps:true})



const Login = mongoose.model('Login', loginSchema)

module.exports = Login