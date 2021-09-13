const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')



router.get("/sign-up", (req, res, next) => {
    res.render("sign-up")
})


router.get("/log-in", (req, res, next) => {
    res.render("log-in")
})

// .POST ROUTES HERE

router.post("/sign-up", (req, res, next) => {
    const username = req.body.username
    const password = req.body.username
    // const email = req.body.email
    // const emailRepetition = req.body.emailRepetition
    console.log(req.body)

    if (username.length === 0) {
        res.render("sign-up", { message: "Your username cannot be empty" })
        return;
    }
    if (password.length < 5) {
        res.render("sign-up", { message: "Your password should be longer than 5 characters" })
        return;
    }
    // if (email !== emailRepetition) {
    //     res.render("sign-up", { message: "e-mail address wrong" })
    //     return;
    // }

    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB !== null) {
                console.log('did not create user')
                res.render('sign-up', { message: "this name is already taken" })
                return

            } else {

                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)

                User.create({ username: username, password: hash })
                    .then(createdUser => {

                        console.log(createdUser)
                        res.redirect('/login')

                    })
                    .catch(err => {
                        next(err)
                    })
            }
        })
})

// router.post("/log-in", (req, res, next) => {
//     const username = req.body.username
//     const password = req.body.password
// })

module.exports = router