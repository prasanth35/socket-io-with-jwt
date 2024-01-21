const jwt = require('jsonwebtoken')
const { utils } = require('../lib/util')

const  verifiy_jwt = (req,res,next) =>{
    //Auth header contains Bearer Token
    //We need to split the token from bearer
    const token = utils.getTokenSplited(req)
    if(!token) return res.sendStatus(403)
    //JWT verify is used to verify the jwt token.
    //Secret key is used to decrypt the jwt token.
    //verify takes in two params error and user , when jwt is invalid error is thrown as unauthorised
    //When the token is valid the session is set for the current user
    jwt.verify(token,'SECRET-KEY' , (err , user)=>{
        if(err) return res.sendStatus(401)
        req.user = user
        next()
})
}   

module.exports = {verifiy_jwt}