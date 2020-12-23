const jwt = require('jsonwebtoken')
//const db = require('../db')
const User = require('../models')

const validateSession = (res, req, next) =>{
  const token = req.headers.authorization

  if(!token){
    return res.status(403).json({auth: false, message: "No token provided"})
  } else {
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