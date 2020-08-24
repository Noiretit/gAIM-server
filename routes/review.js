const express = require("express");
const router = express.Router();

const User = require('../models/user');
const Review = require('../models/comments');


router.post(
    '/review',
    (req, res, next) => {
        const {review, videogameId, user} = req.body;
        Review.create({review, videogameId, user})
        .then(response => {
            console.log(response)
            res.status(200)
        })
        .catch((err) => console.log('Error while creating a review, review.js backend', err), res.status(500))

});
//  Ruta para encontrar todos los reviews
router.get('/review', (req, res, next) => {
    Review.find({})
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch((err) => console.log('Error while gathering ALL reviews in BACK, review.js l.20', err), res.status(500))
})

module.exports = router;