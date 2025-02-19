
const Joi = require('joi');

const Listing = require("./Models/listing.js");
const Review = require("./Models/review.js");

//FOR LISTING SCHEMA
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        image : Joi.string().required().allow("", null),
        price : Joi.string().required().min(0),
        country : Joi.string().required(),
        location : Joi.string().required(),
        description : Joi.string().required()
    }).required()
});


// FOR REVIEW SCHEMA
const reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});
module.exports = {reviewSchema};