

const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email : {
        type : String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);  // here plugin used to autometicaly impliment username, hashing, salting, password.

// const User = mongoose.model("User",userSchema);
// or
module.exports = mongoose.model("User", userSchema);

