// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//session config
const session = require('express-session')
const MongoStore = require('connect-mongo')
const DB_URL = process.env.MONGO_DB


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        // for how long is the user logged in -> this would be one day 	
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: DB_URL
        })
    })
)


// session ends
// passport begins

const User = require('./models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(userFromDB => {
            done(null, userFromDB);
        })
        .catch(err => {
            done(err);
        })
})

passport.use(

    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username })
            .then(userFromDB => {
                if (userFromDB === null) {
                    console.log('incorrect')
                    done(null, false, { message: 'Wrong Credentials' });
                } else {
                    done(null, userFromDB)
                }
            })
    })

)

app.use(passport.initialize())
app.use(passport.session())



// default value for title local
const projectName = "map-music";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;




// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require('./routes/auth');
const { application } = require("express");
app.use('/', auth)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
