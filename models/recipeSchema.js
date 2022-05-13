const mongoose =require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {type:String, required: true},
    image: {type:String, required: true},
    category: {type:String, required: true},
    ingredients: [String],
    instructions: String 

}, {timestamps:true})



const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe