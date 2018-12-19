var express = require('express');
var router = express.Router();
const mongoose= require('mongoose')
var Challenge = require('../models/problems')
var check = require('../middleware/check')
router.get('/:challengeId', check, function(req, res, next) {
    const id = req.params.challengeId
    Challenge.findById(id)
    .then(doc => {
        console.log(doc)
        res.status(200).json({
            challenge: doc
        })
    })
    .catch(err => {
        console.log(err)
    })
});
router.post('/', check, function(req, res, next) {
    if(req.body.level == 'Any') {
        Challenge.find()
        .then(doc => {
            res.status(200).json({
                challenge: doc
            })
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        Challenge.find({category: req.body.level})
        .then(doc => {
            res.status(200).json({
                challenge: doc
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
});

module.exports = router