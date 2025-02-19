
const User = require("../Models/user");

// signup form
module.exports.signupForm = (req, res) =>{
    res.render("users/signup.ejs");
}

// signup
module.exports.signup = async(req, res)=>{
    try {
        let{username, email, password} = req.body;
        let user  = new User({username, email});
        let newUsr= await User.register(user, password);
        console.log(newUsr);
        req.login(newUsr, (err)=>{
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcomeback in WanderLust!");
            res.redirect("/listings/alllistings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }  
}

//login form
module.exports.loginForm = (req, res)=>{
    res.render("users/login.ejs");
}

// login
module.exports.login = async ( req, res )=>{
    req.flash("success", "Welcome back your wanderLust Account!");
    let redirectUrl = res.locals.redirectUrl || "/listings/alllistings";
    res.redirect(redirectUrl);
}

// logout
module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success", "You Logged Out!");
        res.redirect("/listings/alllistings");
    });
}