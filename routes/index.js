const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")

// .GET ROUTES HERE

router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/map", (req, res, next) => {
  res.render("map")
})


router.get("/sign-up", (req, res, next) => {
  res.render("sign-up")
})


router.get("/log-in", (req, res, next) => {
  res.render("log-in")
})


router.get("/mission", (req, res, next) => {
  res.render(("mission"))
})

// .POST ROUTES HERE

router.post("/sign-up", (req, res, next) => {
const username = req.body.username
const password = req.body.username
const email = req.body.email
const emailRepetition = req.body.emailRepetition

if(username.length === 0){
    res.render("sign-up", {message : "your username cannot be nothing..."})
}

if(password.length < 5){
  res.render("sign-up", {message : "your password is to short"})
}

if(email !== emailRepetition){
  res.render("sign-up", {message : "e-mail adress wrong"})
}

User.findOne({username: username})
    .then(userFromDB => {
      if (userFromDB !== null){
        res.render('sign-up', { message : "this name is already taken"})
        return 

      } else {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)

        User.create({ username : username, password: hash})
        .then(createdUser => {
          res.redirect("user-profile")

        })
        .catch(err => {
          next(err)
        })
      }
    })
})

router.post("/log-in", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
})


module.exports = router;
