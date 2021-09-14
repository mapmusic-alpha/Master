const router = require("express").Router();
<<<<<<< createEventAndLocation
const User = require("../models/user");
const Location = require("../models/Location")
const Event = require("../models/Event")
const bcrypt = require("bcrypt")
=======

const { loginCheck } = require('./middleware')

>>>>>>> master

// .GET ROUTES HERE

router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/mission", (req, res, next) => {
  res.render(("mission"))
})

<<<<<<< createEventAndLocation
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
=======
//middleware protected profile route
>>>>>>> master

router.get('/profile', loginCheck(), (req, res, next) => {

  const loggedInUser = req.user
  console.log(req.user)
  res.render('profile', { user: loggedInUser })

})

router.get("/map", (req, res, next) => {
  res.render("map")
})

<<<<<<< createEventAndLocation

//ADMIN ROUTES

router.get("/create-event", (req, res, next) => {
  Location.find()
        .then(location => {
            console.log(location)
            res.render('create-event', { location: location })
        })
        .catch(err => {
            next(err)
        })
})
router.get("/admin", (req, res, next) => {
  res.render("admin")
})

router.get("/list-events", (req, res, next) => {
  res.render("list-events")
})

router.get("/list-locations", (req, res, next) => {
  res.render("list-locations")
})

router.post("/admin", (req, res, next) => {
  const locationName = req.body.location
  const locationDescription = req.body.description
  const locationCoordX = req.body.locationX
  const locationCoordY = req.body.locationY
  const locationLogo = req.body.logo
  const locationNearestStation = req.body.nearestStation
  const locationNearestStationDistance = req.body.nearestStationDistance
  const locationAvailableLines = req.body.nearestStationAvailableLines

  console.log(locationName, locationDescription, locationCoordX, locationCoordY, locationLogo, locationNearestStation, locationNearestStationDistance, locationAvailableLines)

  


  Location.findOne({name : locationName})
          .then(LocationFromDB => {
            if (LocationFromDB !== null){
              res.render("admin", {message : "location already created"})
              return 
           
            } else {
              Location.create({name : locationName, description: locationDescription, logo : locationLogo, coordinates : [Number(locationCoordX), Number(locationCoordY)] }) 
              //nearestStation : {locationNearestStation, locationNearestStationDistance, locationAvailableLines}
               .then(createdLocation => {
                  console.log(createdLocation)
                  res.redirect("/admin")
                })
              
              .catch(err => {
                next(err)
          })             
        }
         
      })
})


router.post("/create-event", (req, res, next) => {
  const location = req.body.chooseLocation
  console.log(location)
  const eventName = req.body.eventName
  const date = req.body.date
  const cost = req.body.cost
  const ageOfEntry = req.body.ageOfEntry
  const openingHours = req.body.openingHours
  const genres = req.body.chooseGenres
  

  const artist1 = req.body.nameArtist1
  const artist1Spotify = req.body.spotifyNameArtist1

  const artist2 = req.body.nameArtist2
  const artist2Spotify = req.body.spotifyNameArtist2

  const artist3 = req.body.nameArtist3
  const artist3Spotify = req.body.spotifyNameArtist3

  const artist4 = req.body.nameArtist4
  const artist4Spotify = req.body.spotifyNameArtist4

  const artist5 = req.body.nameArtist5
  const artist5Spotify = req.body.spotifyNameArtist5

  const artist6 = req.body.nameArtist6
  const artist6Spotify = req.body.spotifyNameArtist6

  const artist7 = req.body.nameArtist7
  const artist7Spotify = req.body.spotifyNameArtist7

  const artist8 = req.body.nameArtist8
  const artist8Spotify = req.body.spotifyNameArtist8


  console.log(eventName, date, cost)

  //location check , location : location missing. Data? only date stupid => all commented out
  //Event.findOne({date : Date})
       //.then(EventFromDB => {
         //if (EventFromDB !== 0){
           //res.render("admin", {message : "event already created"})
        // } else {
           Event.create({name : eventName, date : date, cost : cost, ageOfEntry : ageOfEntry, openingHours : openingHours, artists : [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8], artistsSpotify : [artist1Spotify, artist2Spotify, artist3Spotify, artist4Spotify, artist5Spotify, artist6Spotify, artist7Spotify, artist8Spotify]})
            .then(createdEvent => {
              console.log(createdEvent)
              res.redirect("/admin")
            })

            .catch(err => {
              next(err)
            })
         //}
       })
//})
      


=======
>>>>>>> master
module.exports = router;
