
const express = require('express');
const router = express.Router();
const Categories = require('../models/schema.js');
const Recipe = require('../models/recipeSchema.js')
const categoriesSeed = require('../models/seed.js')
const recipeSeed = require('../models/recipeSeed.js')
const Login = require('../models/login.js')
const bcrypt = require('bcrypt')
const Comments = require('../models/comments.js')
const commentSeed = require('../models/commentsSeed')

router.get('/register', (req, res) => {
  res.render('register.ejs', { currentUser: req.session.currentUser })
})

router.post('/register', (req, res) => {
 
 req.body.password = bcrypt.hashSync(req.body.password.toString(), bcrypt.genSaltSync(10))
  Login.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

router.get('/login', (req, res) => {
  res.render('login.ejs')
})


router.post('/login', (req, res) => {
  
 Login.findOne({ email: req.body.email }, (err, foundUser) => {

      if (err) {
        console.log(err)
        res.send('oops the db had a problem')
      } else if (!foundUser) {
      
        res.send('<a  href="/">Sorry, no user found </a>')
      } else {
      
        if (bcrypt.compareSync(loginPassword, foundUser.password)) {
       
          req.session.currentUser = foundUser
          
          res.redirect('/')
        } else {
          
          console.log(foundUser, loginPassword, foundUser.password)
          res.redirect('/')
        }
      }
    })
  })


// // Routes
// //___________________
// //localhost:3000

// //___________________________
// //NEW________________________
router.get('/new', (req, res)=>{
    res.render('new.ejs')
  })
  
  router.post('/new', (req, res)=>{
    req.body.ingredients.split(',')
    Recipe.create({
       name: req.body.name,
       image: req.body.image,
       category: req.body.category,
       ingredients: req.body.ingredients.split(','),
       instructions: req.body.instructions
    })
    res.redirect('/')
  })
   //___________________________
  //COMMENTS GET________________
// router.get('/comments', (err, res)=>{
//   Comments.find({}, (err, comments)=>{
//     res.render('show.ejs', {allComments : comments})
//   })
  
// })
// router.post('/:_id', (req, res)=>{
//   Comments.create(req.body, (err, comments)=>{
//     res.render('show.ejs', {allComments : comments})
//   })
// })
// //___________________________
// //REGISTER/LOGIN_____________


  // router.post('/register', (req, res)=>{
    
  //   const hashedPassword = bcrypt.hashSync(req.body.password.toString(), bcrypt.genSaltSync(10))
  //     Login.create({name: req.body.name, email: req.body.email, password: hashedPassword}, (err, newUser)=>{
  //      if (err){
  //        console.log(err)
  //      }else{
  //        console.log(newUser)
  //      }
  //     })
  //     res.redirect('/login')
  //   })
  
  // ________________________
  //SEED________________________

  // Comments.create(commentSeed, (err, comments)=>{
  //   console.log(comments)
  // })
  //   router.get('/seed', (req,res)=>{
  //   Comments.create(commentSeed, (err, comments)=>{
  //     res.send(comments)
  //   })
    
  // })
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

  
  // router.get('/seed', (req,res)=>{
  //   Recipe.create(categoriesSeed, (err, data)=>{
   
  //   })
  //   res.redirect('/')
  // })
  
  
 //____DROP 'EM COLLECTIONS_______ 
  
  
// Recipe.collection.drop()
  
// Categories.collection.drop()


 //_______________________________ 
  
  
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
  router.get('/russian' , (req, res) => {
    Recipe.find({category:'Russian'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/croatian' , (req, res) => {
    Recipe.find({category:'Croatian'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
    })
  })
  router.get('/georgian' , (req, res) => {
    Recipe.find({category:'Georgian'}, (err, showCuisine)=>{
      res.render('dishes.ejs', {recipe: showCuisine})
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

  ///


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
 
  
  //___________________________
  //DELETE_____________________
  
  router.delete('/:id', (req, res)=>{
      Recipe.findByIdAndRemove(req.params.id, (err, data)=>{
          res.redirect('/');//redirect back home
      })
  })
  



module.exports = router;
