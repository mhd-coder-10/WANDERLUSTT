
const express = require("express");
const app = express();
const Listing = require("../Models/listing.js");

// index route
module.exports.index = async (req, res) => {
    let listingsLink = await Listing.find();
    res.render("listings/listingLinks.ejs", {listingsLink});
}

// allListings
module.exports.allListings = async (req, res) => {
    let lstng = await Listing.find({});
    // console.log(lstng);
    res.render("listings/allListing.ejs", { lstng });
}

// new listing create form
module.exports.createListingForm = (req, res) => {
    res.render("listings/new.ejs");
}

// create listing new
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename; 
    // console.log(url, "...", filename);

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    // or
    // newListing.image = {url : url, filename : filename};   
    await newListing.save();
    console.log(newListing);

    req.flash("success", "New Listing Created!");  // flash msg for created new listings
    res.redirect("/listings/alllistings");
}

// show listings
module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", 
        populate : {path : "author"}}).populate("owner");

    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings/alllistings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}

// edit lstings
module.exports.editListings = async (req, res) => {
    let {id} = req.params;
    let updtList = await Listing.findById(id);
    if(!updtList) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings/alllistings");
    }
    let originalImageUrl = updtList.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/e_blur:250");
    res.render("listings/update.ejs", { updtList, originalImageUrl });
}

// update listings 
module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        listing.save();
    }

    req.flash("success", "Listing Updated!");  // flash msg for update listings
    // console.log(updated);
    res.redirect(`/listings/${id}`);
}

// delete listings
module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deleteLis = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");  // flash msg for Delete listings
    // console.log(deleteLis);
    res.redirect("/listings/alllistings");
}