const express = require("express")
const router  = express.Router()
const mongoose= require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Feedback = require('../models/feedback')
const UserChallenge = require('../models/userChallenge')
const check = require('../middleware/check')
var hackerRank = require('machinepack-hackerrank');
const upload = require("../middleware/image");

//defining countries dictionary for adding pics of countries along with the name
var countries = {
    "Pakistan" : {name: 'Pakistan', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/Pakistan.jpg'},
    "China": {name: 'China', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/China.jpg'},
    "India": {name: 'India', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg'},
    "America": {name: 'America', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg'},
    "UK": {name: 'UK', imgurl: 'http://flags.fmcdn.net/data/flags/w580/gb.png'},
    "Canada": {name: 'Canada', imgurl: 'http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg'}
}


//route for registering a user
router.post('/register', (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{ 
        if(user.length>=1){
            return res.status(420).json({
                message:"Mail Exists"
            })
        } else {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        firstname:     req.body.firstname,
                        lastname:    req.body.lastname,
                        email: req.body.email,
                        password:hash,
                        points: 0,
                        country: countries[req.body.country]
                    });
                    user
                    .save()
                    .then(result=>{     
                        res.status(201).json({
                            message:'User Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });                    
                }
            })
        }
    })
});


//route for logging in to the website
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

//route for deleteing the user
router.delete('/:userid', (req, res, next) => {
    User.remove({_id: req.params.userid})
    .exec()
    .then(result => {
        result.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//route for adding a feedback to the database
router.post('/feedback', check, (req, res, next) => {
    console.log(req.userData)
    User.find({ email: req.userData.email })
      .exec()
      .then(user => {
        const newFeed = new Feedback({
            _id : new mongoose.Types.ObjectId(),
            user : {
                userID: req.userData.userId,
                username: user[0].username
            },
            overallRating : req.body.rating,
            comments : req.body.comments
    })
    newFeed
    .save()
    .then(result=>{     
        res.status(201).json({
            message:'Feedback Created'
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });   
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

//route for adding points to the user
router.post('/incPoints', check, (req, res, next) => {
    const category = req.body.category
    console.log(category)
    UserChallenge.find({_id: {user: {userID: req.userData.userId}, challenge: {challengeID: req.body.challengeId}}})
    .then(doc => {
        const newChallenge = new UserChallenge({
            _id: 
            {
                user:  req.userData.userId,
                challenge:  req.body.challengeId
            }
        })
        console.log(newChallenge)
        newChallenge
        .save()
        .then(result=>{     
            console.log(result)
            if(category == 'EasyPoints') {
                User.findOneAndUpdate({ "email": req.userData.email }, { $inc: { "points" : req.body.points,"EasyPoints": req.body.points *4.77 } })
                .exec()
                .then(user => {
                    console.log(user)
                })
                .catch(err => {
                    console.log(err);
                }); 
            } else if(category == 'MediumPoints') {
                User.findOneAndUpdate({ "email": req.userData.email }, { $inc: { "points" : req.body.points,"MediumPoints": req.body.points*3.34 } })
                .exec()
                .then(user => {
                    console.log(user)
                })
                .catch(err => {
                    console.log(err);
                }); 
            } else {
                User.findOneAndUpdate({ "email": req.userData.email }, { $inc: { "points" : req.body.points,"HardPoints": req.body.points *2.05} })
                .exec()
                .then(user => {
                    console.log(user)
                })
                .catch(err => {
                    console.log(err);
                }); 
            }
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            }); 
        })            
    })
    .catch(err => {
        console.log(err)
    })
})

//route for getting the users for the leaderboard
router.get('/leaders', check, (req, res, next) => {
    User.find()
    .exec()
    .then(users => {
        res.status(200).json({
            users: users
        })
    })
    .catch(err => {
        console.log(err)
    })
})

//route for compiling the code by sending it to the hackerank api
router.post('/compile', function(req, res, next) {
    hackerRank.submit({
        apiKey: 'hackerrank|665905-1221|d2773ca40a490d766a3910926e0a4c0488eed803',
        source: req.body.code,
        language: 5,
        wait: true,
        testcases :req.body.testcases,
        callbackUrl: '',
        format: 'json',
        }).exec({
            error: function (err) {
                throw err;
            },
            success: function (response) {
                console.log(JSON.parse(response))
                res.status(200).json(JSON.parse(response).result)
            },
        });
    });

//route for getting the profile of a user
router.get('/profile', check, function(req, res, next) {
    const id = req.userData.userId
    User.findById(id)
    .then(doc => {
        res.status(200).json({
            profile: doc,
            country: doc.country
        })
    })
    .catch(err => {
        console.log(err)
    })
});

//route for updating the user description
router.post('/updateDesc', check, function(req, res, next) {
    User.findOneAndUpdate({_id: req.userData.userId},{$set: {'description': req.body.description}})
    .exec()
    .then((doc) => {
        console.log(doc)
        res.status(200).json({
           doc: doc
        });
    })
    .catch(err => {
        console.log(err)
    })
})

//route for updating the skills of a user
router.post('/updateSkills', check, function(req, res, next) {
    console.log(req.body.skills)
    User.findOneAndUpdate({_id: req.userData.userId},{$set: {'skills': req.body.skills}})
    .exec()
    .then((doc) => {
        console.log(doc)
        res.status(200).json({
           doc: doc
        });
    })
    .catch(err => {
        console.log(err)
    })
})

//route for adding a image path to the user and uploading it to cloudinary
router.post('/profileImage',check, upload.single('image'),(req,res,next)=>{
    console.log('Hello')
   User.updateOne({_id:req.userData.userId},{$set: {"userImage": req.file.secure_url}})
   .exec()
   .then(doc=>{
      
       return res.status(200).json({
           message:"Upload Successful"
       })
   })
   .catch(err=>{
    res.status(500).json({
        error:err
    })
})
})


router.get("/middleware",check,(req,res,next)=>{
    return res.status(200).json({
        message:"Successfully Authorized",
        userData: req.userData
    })
})
    

module.exports = router