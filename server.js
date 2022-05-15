//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const categoriesSeed = require('./models/seed.js')
const recipeSeed = require('./models/recipeSeed.js')
const Categories = require('./models/schema.js');
const Recipe = require('./models/recipeSchema.js')


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, ()=>{
    console.log('connected')
}
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//___________________________
//NEW________________________
app.get('/new', (req, res)=>{
  res.render('new.ejs')
})

app.post('/new', (req, res)=>{
  Recipe.create(req.body)
  res.redirect('/')
})
// Categories.create(categoriesSeed, (err, data)=>{
//   console.log(data)
// })

// Recipe.create(recipeSeed, (err, data)=>{
//   if(err){
//     console.log(err)
//   }else{
//   console.log(data)
//   }
// })
// ___________________________
//SEED________________________

app.get('/seed', (req,res)=>{
  Recipe.create(categoriesSeed, (err, data)=>{
 
  })
  res.redirect('/')
})

// Recipe.collection.drop()

// Categories.collection.drop()
// app.get('/seed', (req,res)=>{
//   Categories.create(categoriesSeed, (err, data)=>{
 
//   })
//   res.redirect('/')
// })
//___________________________
//INDEX_______________________
app.get('/' , (req, res) => {
  Categories.find({}, (err, categoriesData)=>{
  res.render('index.ejs', {category: categoriesData});
  })
});

//_______________________________________
//SHOW RANDOM RECIPE_____________________
app.get('/random', (req,res)=>{
  // let count = Recipe.find().countDocuments()
  // let random = Math.floor(Math.random * count)
  Recipe.find({}, (err, randomRecipe)=>{
  res.render('random.ejs', {recipe: randomRecipe})
})
})

//_______________________________________
//SHOW DISHES PICTURES AND NAMES_________
app.get('/thai' , (req, res) => {
  Recipe.find({category:'Thai'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/korean' , (req, res) => {
  Recipe.find({category:'Korean'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/chinese' , (req, res) => {
  Recipe.find({category:'Chinese'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/american' , (req, res) => {
  Recipe.find({category:'American'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/japanese' , (req, res) => {
  Recipe.find({category:'Japanese'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/spanish' , (req, res) => {
  Recipe.find({category:'Spanish'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/greek' , (req, res) => {
  Recipe.find({category:'Greek'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})
app.get('/mexican' , (req, res) => {
  Recipe.find({category:'Mexican'}, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
})

//___________________________
//SHOW RECIPES_______________________

app.get('/:id' , (req, res) => {
  Recipe.findById(req.params.id, (err, idRecipe)=>{
    res.render('show.ejs', {recipe: idRecipe})
  })
})
//___________________________
//EDIT_______________________
app.get('/:id/edit', (req, res)=>{
  Recipe.findById(req.params.id, (err, currentRecipe)=>{
    res.render('edit.ejs', {recipe: currentRecipe})
  })
})

app.put('/:id/edit', (req, res)=>{
  req.body
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem)=>{
  
    res.redirect('/')

  })
})


//////////DELETE

app.delete('/:id', (req, res)=>{
    Recipe.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/');//redirect back home
    })
})





//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));