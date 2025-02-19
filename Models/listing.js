
const mongoose = require("mongoose");
const Review = require("./review.js");
const { required } = require("joi");
let Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        url : String,
        filename : String,
        
        // type: String,
        // required : true,
        // required: true,
        // set: (v) => v === "" ? "https://img.freepik.com/free-photo/three-dimensional-house-model_23-2151003966.jpg" : v,

        // default: "https://img.freepik.com/free-photo/three-dimensional-house-model_23-2151003966.jpg",
    
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    // home work for me (this is for filter backend program) 
    // here we can add listing, it's category type
    // categories : {
    //     type : String,
    //     enum : ["mountains, room, farms, arctic, historical, deserts"]
    // }
    
});

// following code for when listing will be delete then all this listing reviews also will delete from review Modele/reviews schema

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing.reviews.length) {
    // OR if(listing) / if(listing.reviews.length) / if(listing.reviews.length > 0 / >=1)
        let dltRviews = await Review.deleteMany({_id : {$in : listing.reviews}});
        // console.log(dltRviews);
    }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;