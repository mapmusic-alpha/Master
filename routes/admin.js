const router = require("express").Router();

router.get("/admin", (req, res, next) => {
    
})

router.post("/admin", (req, res, next) => {
    const locationName = req.body.location
    const locationDescription = req.body.location-description
    const locationCoordX = req.body.location-x
    const locationCoordY = req.body.location-y
    const locationLogo = req.body.logo
    const locationNearestStation = req.body.nearest-station
    const locationNearestStationDistance = req.body.nearest-station-distance
    const locationAvailableLines = req.body.nearest-station-availableLines

    console.log(locationName, locationDescription, locationCoordX, locationCoordY, locationLogo, locationNearestStation, locationNearestStationDistance, locationAvailableLines)
})