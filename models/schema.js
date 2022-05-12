const mongoose =require('mongoose')

const recipeSchema = new mongoose.Schema({
    dish: {type:String, required: true},
    dishImg: {type:String, required: true},
    cuisine: {type:String, required: true},
    cuisineImg:{type:String, required: true},
    cookingTime: {type:String, required: true},
    difficulty: {type:Number, max: 5},
    spiceLevel: {type: Number, max:5},
    isVegan: Boolean,
    ingredients: [String],
    instructions: [String]

})



const recipeCollection = mongoose.model('Recipe', recipeSchema)

module.exports = recipeCollection