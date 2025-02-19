
            // INITILIZE DATA

            
const Listing = require("../Models/listing.js");
const initData = require("./data.js");

const mongoose = require("mongoose");

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then((res)=>{
    console.log("conected DB________");
    console.log(" ");
}).catch((err)=>{
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});  
    initData.data = initData.data.map((obj)=>({...obj, owner: "66bd91b6855ceab562a61923"}));
    await Listing.insertMany(initData.data);
    console.log("Data was Initilized!");
}

initDB();
