
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// here create the folder in our cloudinary a/c and save the files in there folder.
// i.e. here 'wanderlust' folder will be create in cloudinary and this waderlsut -
// folder will be save files (here files mean images)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Wanderlust_10',
        allowedFormate : ["png", "jpg", "jpeg"] 
    },
});

module.exports = {
    cloudinary,
    storage
}
