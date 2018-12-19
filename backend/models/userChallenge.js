var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userChallengeSchema = new mongoose.Schema({
    _id: {
        user: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
        challenge:{type:mongoose.Schema.Types.ObjectId, ref: "Challenge"}
    }
})


module.exports = mongoose.model("UserChallenge",userChallengeSchema);
