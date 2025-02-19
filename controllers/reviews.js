
const Listing = require("../Models/listing");
const Review = require("../Models/review");

// review create
module.exports.createReview = async(req, res)=> {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");  // flasg msg for Created new review
    res.redirect(`/listings/${listing.id}`);  // or res.redirect(`/listings/${id}`);
}


// distroy review
module.exports.destroyReview = async(req, res)=>{  
let {id, reviewId} = req.params;
await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId }});   // pull mean remove (pull oprater work to removes.)
let reviewDlt = await Review.findByIdAndDelete(reviewId);
req.flash("success", "Review Deleted!");  // flasg msg for Delete review
// console.log(reviewDlt);
res.redirect(`/listings/${id}`);
}
