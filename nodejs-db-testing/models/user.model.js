const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 30
    },
    email : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 30,
        unique : true
    },
    gender : {
        type : String,
        required : true
    }
});

module.exports.User = mongoose.model("Agent", userSchema);