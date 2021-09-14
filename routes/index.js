const router = require("express").Router();

const { loginCheck } = require('./middleware')


// .GET ROUTES HERE

router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/mission", (req, res, next) => {
  res.render(("mission"))
})

//middleware protected profile route

router.get('/profile', loginCheck(), (req, res, next) => {

  const loggedInUser = req.user
  console.log(req.user)
  res.render('profile', { user: loggedInUser })

})

router.get("/map", (req, res, next) => {
  res.render("map")
})

module.exports = router;
