
const express = require("express");
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


router.post("/", isLoggedIn, validateReview,  wrapAsync(reviewController.createReview));  // Review (Post Rout)

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));  // reviews delete Rout

// above delete route in  we can any words define place of reviewId for review._id.
// (for ex words : rId, reviewId, rvwId )

module.exports = router;