
// CLOADINARY
if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// Console.log(process.env);

const express = require("express");  // use express framwork of NODE.JS
const app = express();
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");    // use boilerplate        // important topic pro phase 1 - part b
app.engine("ejs", ejsMate);     // use boilerplate

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const ExpressError = require("./utils/ExpError.js");

const cookieParser = require("cookie-parser");     // cookie-parser
const flash = require("connect-flash");      // msg flash 
const session = require("express-session");   // express session

const MongoStore = require('connect-mongo'); // "express-session" neccesary for this package (used to store session information
                                                // in Mongo Cloud (Atlas Database) )

// Note (remember): Used pbkdf2 Hashing algorithm in passport  (algorithm means GANITIK NIYAMO)
const passport = require("passport");  
const LocalStratagy = require("passport-local");
const User = require("./Models/user.js");

// Restructure code router 
const listingRouter = require("./router/listing.js");
const reviewRouter= require("./router/review.js");
const userRouter = require("./router/user.js");


// DATABSE CONNECTION 
const mongoose = require("mongoose");

let Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";  // LOCAL DATABASE URL
const mdb_url = process.env.ATLASDB_URL   // mongo Atlas Url

async function main() {
    await mongoose.connect(mdb_url);
}
main().then((res) => {
    console.log("\n conected DB________");
    console.log("\n");
}).catch((err) => {
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl : mdb_url,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24 * 3600,
});

// following code genrate the error
// store.on("error", ()=> { 
//     console.log("Error In Mongo Session Store ", err);
// }); // if it is define afetr "store block" so face the error


const sessionPoint = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expire : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


// foloowing lines difine always before  app.use("/listings", listings), app.use("/listings/:id/reviews", reviews)
app.use(session(sessionPoint));
app.use(cookieParser("secretcode"));
app.use(flash());

//following 5 line middleware always difine to just after app.use(session(sessionPoint));
app.use(passport.initialize());  // a middleware initializes passport
app.use(passport.session());  
passport.use(new LocalStratagy(User.authenticate()));  // this middleware used to user authenticate (authenticate mean login, signUp)
passport.serializeUser(User.serializeUser());  // serialize mean user related all information store in session
passport.deserializeUser(User.deserializeUser()); // deserialize mean user related all information unstore/remove from session


// Flash msg middleware
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;    // here req.user is saved user all data   for ex : whose user login and whose user logout
    next();
});

// use all router
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error Handling Meddleware
// for wrong page :-
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page does not found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs", { message });
    console.log("Error :-", err.message);    //err msg print in console
});

app.listen(8080, () => {
    console.log("\n Server Listning to Port 8000...");
});

