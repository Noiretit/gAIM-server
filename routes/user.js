const express = require("express");
const router = express.Router();

const User = require("../models/user");

const { isLoggedIn } = require("../helpers/middlewares");

// GET '/myprofile'
router.get("/myprofile", isLoggedIn(), (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => console.log("Error while getting profile", err));
});

router.put("/myprofile/edit", isLoggedIn(), async (req, res, next) => {
  try {
    const { username, email, genre, gender } = req.body;
    // console.log(req.body)
    // console.log(req.session.currentUser)

    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { username, email, genre, gender },
      { new: true }
    );

    req.session.currentUser = updatedUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/myprofile/favorite", (req, res, next) => {
  const { favoriteVideogames, userID } = req.body;

  User.findByIdAndUpdate(userID, {
    $push: { favoriteVideogames: favoriteVideogames },
  })
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

router.post("/myprofile/removeFavorite", (req, res, next) => {
  const { favoriteVideogames, userID } = req.body;

  User.findByIdAndUpdate(userID, {
    $pull: { favoriteVideogames: favoriteVideogames },
  })
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

module.exports = router;
