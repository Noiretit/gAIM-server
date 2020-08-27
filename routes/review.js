const express = require("express");
const router = express.Router();

const Review = require("../models/comments");

router.post("/review", (req, res, next) => {
  const { review, videogameId, videogameName, user } = req.body;
  Review.create({ review, videogameId, videogameName, user })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(
      (err) =>
        console.log("Error while creating a review, review.js backend", err),
      res.status(500)
    );
});

//  Ruta para encontrar todos los reviews
router.get("/review", (req, res, next) => {
  Review.find({})
    .populate("user")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(
      (err) =>
        console.log(
          "Error while gathering ALL reviews in BACK, review.js l.20",
          err
        ),
      res.status(500)
    );
});

//TO DELETE ONE COMMENT
router.post("/review/delete", (req, res, next) => {
  const idOfReview = req.body.id;

  Review.deleteOne(
    {
      _id: idOfReview,
    },
    function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    }
  )
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

module.exports = router;
