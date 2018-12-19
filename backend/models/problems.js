var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var challengesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    testcases: [String],
    output: [String],
    points: Number,
    category: String
})


module.exports = mongoose.model('Challenge', challengesSchema)