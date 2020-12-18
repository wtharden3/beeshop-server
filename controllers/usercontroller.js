const router = require('express').Router();
const { User } = require('../models');

//get user data from user table - NOT CREATED YET
router.post('/register', async (req, res) => {
try{
  const { firstName, lastName, email, password, isAdmin } = req.body;
  //Create User
  let newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    isAdmin
  });
  res.status(200).json({
    User: newUser,
    message: `New Account Created`,
    Admin: newUser.isAdmin 
  })

}catch(err){
  res.status(500).json({
    error: err,
    message: "That's a no go on the user creation"
    
  })
}
    
   
});

//export this module -- will send to index.js

module.exports = router;
