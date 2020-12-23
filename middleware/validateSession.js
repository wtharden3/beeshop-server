//required to interact or create web token
const jwt = require('jsonwebtoken')
//const db = require('../db')
const User = require('../models')
//middleware functions are functions that have access to the
// - request OBJECT (req)
// - response OBJECT (res)
// - next FUNCTION - next()
const validateSession = (res, req, next) =>{
  //the token will be pulled from the authorization header of the incoming request
  const token = req.headers.authorization
//if not token 403-forbidden
  if(!token){
    return res.status(403).json({auth: false, message: "No Token provided. You are not allowed!"})
  } else {
    //jwt.verify(token, secretOrPublicKey, [options, callback])
    //token - we are using our token from above
    // secreteOrPublicKey - process.env.JWT_SECRET we are using our secret key which is store in .env
    // [options, callback] - callback fn with two parameters
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {

      if(!err && decodeToken){
        User.findOne({
          where: {
            id: decodeToken.id
          }
        })
        .then(user => {
          if(!user) throw err;

          req.user = user;
          return next();
        })
        .catch(err => next(err))
      } else {
        req.errors = err;
        return res.status(500).json({message: 'Not Authorized'})
      }
    })
  }
}

module.exports = validateSession