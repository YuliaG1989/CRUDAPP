//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const recipeSeed = require('./models/seed.js')
const Recipe = require('./models/schema.js');



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
app.post('/:id/dishes', (req, res)=>{
 Recipe.create(req.body)
  res.redirect('/:id/dishes')
})

// Recipe.create(recipeSeed, (err, data)=>{
//   console.log(data)
// })

//___________________________
//SEED________________________

app.get('/seed', (req,res)=>{
  Recipe.create(recipeSeed, (err, data)=>{
 
  })
  res.redirect('/')
})
// Recipe.collection.drop()

//___________________________
//INDEX_______________________
app.get('/' , (req, res) => {
  Recipe.find({}, (err, recipeData)=>{
  res.render('index.ejs', {recipe: recipeData});
  })
});
//___________________________
//SHOW Dishes_______________________
app.get('/:id/dishes' , (req, res) => {
  Recipe.findById(req.params.id, (err, showCuisine)=>{
    res.render('dishes.ejs', {recipe: showCuisine})
  })
  ;
})

//___________________________
//SHOW recipes_______________________
app.get('/:id/show' , (req, res) => {
  Recipe.findById(req.params.id, (err, showCuisine)=>{
    res.render('show.ejs', {recipe: showCuisine})
  })
  ;
})


//___________________________
//EDIT_______________________
app.get('/:id/edit' , (req, res) => {
  Recipe.findById(req.params.id, (err, currentRecipe)=>{
  res.render('edit.ejs', {recipe: currentRecipe})
})
})

// app.put('/:id', (req, res)=>{
//   res.send(req.body)
// Recipe,findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRecipe)=>{
//   res.redirect('/')
// })
// })







//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));