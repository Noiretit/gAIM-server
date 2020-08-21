const express = require("express");
const router = express.Router();

const User = require('../models/user')

const {isLoggedIn} = require('../helpers/middlewares')


// GET '/myprofile'
router.get("/myprofile", isLoggedIn(), (req, res, next) => {
  User.findById(req.session.currentUser._id)
  .then(response => {
      res.status(200).json(response)
  })
  .catch((err) => console.log('Error while getting profile', err))
});

router.put("/myprofile/edit", isLoggedIn(), async (req, res, next) => {
    try {
        const {username, email, genre} = req.body;
    
        await User.findByIdAndUpdate(
            req.session.currentUser._id, 
            {username, email, genre},
            {new: true}
        );
        
        const updatedUser = await User.findById();
        req.session.currentUser = updatedUser;
        res.status(200).json(updatedUser)
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;
