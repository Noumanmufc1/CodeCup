var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var feedbackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{
        userID:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
        username:{type:String,required:true}
    },
    overallRating: {type:Number, required: true},
    comments: {type: String}
})


module.exports = mongoose.model("Feedback",feedbackSchema);
