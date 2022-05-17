if(process.env.NODE_ENW !== 'production'){
  require('dotenv').config()
}


const express = require('express');
const router = express.Router();
const Categories = require('../models/schema.js');
const Recipe = require('../models/recipeSchema.js')
const Login = require('../models/userSchema.js')
const categoriesSeed = require('../models/seed.js')
const recipeSeed = require('../models/recipeSeed.js')
const users =[]
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportInitialize= require('../passport-config.js')
passportInitialize(passport, email =>{
  return users.find( user => user.email === email),
  id => users.find( user => user.id === id)
})
const flash = require('express-flash')
const session = require('express-session')


router.use(flash())
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


router.use(passport.initialize())
router.use(passport.session())
// Routes
//___________________
//localhost:3000

//___________________________
//NEW________________________
router.get('/new', (req, res)=>{
    res.render('new.ejs')
  })
  
  router.post('/new', (req, res)=>{
    Recipe.create(req.body)
    res.redirect('/')
  })
  //////////////LOGIN & REGISTER
  router.post('/register', async (req,res)=>{
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      Login.insert({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch{
      res.redirect('/register')
    }
    console.log(users)
  })
  router.get('/register', (req,res)=>{
    res.render('register.ejs')
  })
  router.post('/login', (req,res)=>{
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })

  })
  router.get('/login', (req,res)=>{
    res.render('login.ejs')
  })
  
  function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/')
  }

  function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
      res.redirect('/login')
    }
    
  }
  // Categories.create(categoriesSeed, (err, data)=>{
  //   console.log(data)
  // })
  // router.get('/seed', (req,res)=>{
  //   Categories.create(categoriesSeed, (err, data)=>{
   
  //   })
  //   res.redirect('/')
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
  
  // router.get('/seed', (req,res)=>{
  //   Recipe.create(categoriesSeed, (err, data)=>{
   
  //   })
  //   res.redirect('/')
  // })
  
  
  
  
  // Recipe.collection.drop()
  
  // Categories.collection.drop()
  
  
  
  //___________________________
  //INDEX_______________________
  router.get('/' , (req, res) => {
    Categories.find({}, (err, categoriesData)=>{
    res.render('index.ejs', {category: categoriesData});
    })
  });
  
  //_______________________________________
  //SHOW RANDOM RECIPE_____________________
  router.get('/random', (req,res)=>{
    // let count = Recipe.find().countDocuments()
    // let random = Math.floor(Math.random * count)
    Recipe.find({}, (err, randomRecipe)=>{
    res.render('random.ejs', {recipe: randomRecipe})
  })
  })
  
  //_______________________________________
  //SHOW DISHES PICTURES AND NAMES_________
  router.get('/thai' , (req, res) => {
    Recipe.find({category:'Thai'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/korean' , (req, res) => {
    Recipe.find({category:'Korean'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/chinese' , (req, res) => {
    Recipe.find({category:'Chinese'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/american' , (req, res) => {
    Recipe.find({category:'American'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/japanese' , (req, res) => {
    Recipe.find({category:'Japanese'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/spanish' , (req, res) => {
    Recipe.find({category:'Spanish'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/greek' , (req, res) => {
    Recipe.find({category:'Greek'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/mexican' , (req, res) => {
    Recipe.find({category:'Mexican'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/vietnamese' , (req, res) => {
    Recipe.find({category:'Vietnamese'}, (err, showCuisine)=>{
      if(err){
        console.log(err)
      }else{
      res.render('dishes.ejs', {recipe: showCuisine})
      }
    })
  })
  //___________________________
  //SHOW RECIPES_______________________
  
  router.get('/:_id' , (req, res) => {
    Recipe.findById(req.params._id, (err, idRecipe)=>{
      // if (req.params._id === "favicon.ico") {
      //   return res.status(404)
      // }else{
      res.render('show.ejs', {recipe: idRecipe})
      // }
    })
  })
  //___________________________
  //EDIT_______________________
  router.put('/:_id', (req, res)=>{
    // res.send(req.body)
    Recipe.findByIdAndUpdate(req.params._id, req.body, {new: true}, (err, updatedItem)=>{
      if(err){
        console.log(err)
      }else{
      res.redirect('/')
    }
    })
  })
  
  router.get('/:_id/edit', (req, res)=>{
    Recipe.findById(req.params._id, (err, currentRecipe)=>{
      res.render('edit.ejs', {recipe: currentRecipe})
    })
  })
 
  
  //////////DELETE
  
  router.delete('/:id', (req, res)=>{
      Recipe.findByIdAndRemove(req.params.id, (err, data)=>{
          res.redirect('/');//redirect back home
      })
  })
  

module.exports = router;
