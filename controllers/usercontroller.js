const router = require('express').Router();
const { User } = require('../models');

//the bcrypt module is needed to hash passwords - password encryption
// we will use in register and login
const bcrypt = require('bcryptjs');
// the jwt module is needed for SESSION VALIDATION we will use it to create a token
const jwt = require('jsonwebtoken');
//get user data from user table - NOT CREATED YET
router.post('/register', async (req, res) => {
  try {
    //deconstructing the req.body properties
    //use let because these will change and const will not allow that
    let { firstName, lastName, email, password, userRole } = req.body;
    //Create User
    let newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 13),
      userRole,
    });
    res.status(201).json({
      user: newUser,
      message: `New Account Created`,
      userRole: newUser.userRole,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "That's a no go on the user creation",
    });
  }
});

//req and res have to be in this order respectively
router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  try {
    //search for email - email is unique
    let loginUser = await User.findOne({ where: { email } });
    //if there is a email that matches the user input && compare the hashed passworde with what is in the db and see if they match
    if (loginUser && bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({ id: loginUser.id}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        message: 'Login successful! 👍',
        user: loginUser,
        sessionToken: token,
      });
    } else {
      res.status(401).json({
        message: 'Oop, You Tried it! Login DENIED! Credentials Incorrect 🚫',
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Get outta here you filthy animal! 😡 ",
    });
  }
});

//export this module -- will send to index.js

module.exports = router;
