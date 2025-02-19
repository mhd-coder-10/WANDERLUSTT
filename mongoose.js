
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

Listing.deleteMany().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});


