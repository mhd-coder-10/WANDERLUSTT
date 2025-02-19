
const ExpressError = require("./utils/ExpError.js");
const Listing = require("./Models/listing.js");
const Review = require("./Models/review.js");
const {listingSchema, reviewSchema} = require("./schema.js");

// listing validation
module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

// review validation
module.exports.validateReview = (req, res, next)=>{
    // let {error} = reviewSchema.validate(req.body); 
    // or
    let result = reviewSchema.validate(req.body);
    let error = result.error;
    if(error) {
        let errMsg = error.details.map((el) => el.message ).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};

// logged in middleware
module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()) {                      //here req.isAuthenticated function chek is any user login or not login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to listing!");
        return res.redirect("/login");
    }
    next();
}

// redircetUrl meddleware
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


// listing Owner permition middleware   (autherization)
module.exports.isOwner = async(req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Permition for only this Listing owner."); 
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// review author (autherization)
module.exports.isReviewAuthor = async(req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry, You didn't posted this Review"); 
        return res.redirect(`/listings/${id}`);
    }
    next();
}
