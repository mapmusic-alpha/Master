const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')



router.get("/sign-up", (req, res, next) => {
    res.render("sign-up")
})


router.get("/log-in", (req, res, next) => {
    res.render("log-in")
})

// .POST ROUTES HERE

router.post('/log-in', passport.authenticate('local', {

    successRedirect: '/profile',
    failureRedirect: '/log-in',
    passReqToCallback: true

}))

router.post("/sign-up", (req, res, next) => {
    const username = req.body.username
    const password = req.body.username
    const email = req.body.email
    const emailRepetition = req.body.emailRepetition
    console.log(req.body)
    if (password.length < 5) {
        res.render("sign-up", { message: "Your password should be longer than 5 characters" })
        return;
    }
    if (username.length === 0) {
        res.render("sign-up", { message: "Your username cannot be empty" })
        return;
    }
    if (email !== emailRepetition) {
        res.render("sign-up", { message: "Your Email address is incorrect" })
        return;
    }

    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB !== null) {
                console.log('did not create user')
                res.render('sign-up', { message: "This username is unavailable" })
                return

            } else {

                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)

                User.create({ username: username, password: hash, email: email })
                    .then(createdUser => {

                        console.log(createdUser)
                        res.redirect('log-in')

                    })
                    .catch(err => {
                        next(err)
                    })
            }
        })
})

router.get('/logout', (req, res, next) => {


    req.logout();
    res.redirect('log-in')

})

module.exports = router