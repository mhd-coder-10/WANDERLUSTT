
const express = require("express");
const app = express();
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");  // middleware require

const listingController = require("../controllers/listings.js");

// Following library/packege used to upload file data in backend (file data : photo,pdf,file)
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// phase 3 (part a)

// All Listings show Route  (created by me for me practice)
router.get("/alllistings", wrapAsync(listingController.allListings));

router.get("/", (req, res)=>{
    res.render("/", listingController.index);
})

router.route("/")
    .get(wrapAsync(listingController.index))   // 1.Index route / listing links
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));   // 3. Create new Route 

router.get("/new", isLoggedIn, listingController.createListingForm);  // 3.new route form

router.route("/:id")
    .get(wrapAsync( listingController.showListing))  // 2.show route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing))  // 4. update route
    .delete(isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));  // 5.delete route

router.get("/:id/update", isLoggedIn, isOwner, wrapAsync(listingController.editListings));  // 4. Edit route

module.exports = router;