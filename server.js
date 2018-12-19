var express = require('express')
var bodyParser = require('body-parser')
const mongoose =  require('mongoose')
const port = process.env.PORT || 2200;
var app = express()
const userRoutes = require('./backend/routes/authentication')
const challengeRoutes = require('./backend/routes/challenges')
const seedDB = require('./backend/seedData/seedData')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = process.env.DATABASEURL || "mongodb://localhost/trying";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true, });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
seedDB()


app.use("/", userRoutes)
app.use("/challenges", challengeRoutes)
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, function() {
    console.log('Server listening')
})
