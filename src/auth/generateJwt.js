const jwt = require('jsonwebtoken')

const generate_jwt_token = (user_obj) =>{
   return jwt.sign(user_obj , 'SECRET-KEY')
}

module.exports = {generate_jwt_token}