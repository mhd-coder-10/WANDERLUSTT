
const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpError.js");
const User = require("../Models/user.js");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

// signup
router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signup));

// logIn
router.route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local", {failureRedirect: "/login", failureFlash: true }),
        wrapAsync(userController.login));
    
// Logout
router.get("/logout", userController.logout);

module.exports = router;
