const mongoose =require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    ingredients: Array,
    instructions: String,
   

}, {timestamps:true})



const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe