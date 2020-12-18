const router = require('express').Router();
const { User } = require('../models');

//the bcrypt module is needed to hash passwords - password encryption
// we will use in register and login
const bcrypt = require('bcryptjs');
// the jwt module is needed for SESSION VALIDATION we will use it to create a token

//get user data from user table - NOT CREATED YET
router.post('/register', async (req, res) => {
  try {
    //deconstructing the req.body properties
    let { firstName, lastName, email, password, isAdmin } = req.body;
    //Create User
    let newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
      isAdmin,
    });
    res.status(201).json({
      User: newUser,
      message: `New Account Created`,
      Admin: newUser.isAdmin,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "That's a no go on the user creation",
    });
  }
});

//export this module -- will send to index.js

module.exports = router;
