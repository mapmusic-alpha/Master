const router = require("express").Router();


// .GET ROUTES HERE

router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/mission", (req, res, next) => {
  res.render(("mission"))
})


router.get("/map", (req, res, next) => {
  res.render("map")
})





module.exports = router;
