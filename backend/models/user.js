var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    _id:       mongoose.Schema.Types.ObjectId,
	firstname: String,
	lastname:  String,
    email:     {
                    type:String,
                    required:true,
                    unique: true,
                    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                },
    password:  {type:String, required:true},
    username:  {type:String, required:true, unique: true},
    points: Number,
    EasyPoints: Number,
    MediumPoints: Number,
    HardPoints: Number,
    country: {
        name: String,
        imgurl: String
    },
    description: {type: String, default: 'No description yet set.'},
    skills: {
        type: Array,
        default: []
    },
    userImage: {type:String, default:'https://res.cloudinary.com/dsv8gwf8s/image/upload/v1545079979/codecup/no-profile.png'}
    });

module.exports = mongoose.model("User",userSchema);

