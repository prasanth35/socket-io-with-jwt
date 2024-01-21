const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config
const post = require('./mock/post.json')
const { generate_jwt_token } = require('./auth/generateJwt')
const { verifiy_jwt } = require('./middlewares/verifyJwt')
const { utils } = require('./lib/util')
const app = express()
app.use(express.json())




app.get('/posts', (req, res) => {
    res.send(post)
})

//Api to get data only when jwt is valid
// verifiy_jwt acts as a middleware
app.get('/protected/post', verifiy_jwt, (req, res) => {
    const decodeJWT = jwt.decode(utils.getTokenSplited(req))
    if(decodeJWT.user_id){
        const filteredData = post.filter(data => data.userId == decodeJWT.user_id)
        res.json({
            data : filteredData
        })
    }else{
        res.sendStatus(404).send("USER ID NOT FOUND WHILE DECRYPTING")
    }
   
 
})

//Api to generate jwt tokem
app.post('/generate_token', (req, res) => {
    console.log("RE",req)
    const user = {
        username: req.body.username ,
        user_id : req.body.user_id
    }
    res.send({
        token: generate_jwt_token(user)
    })
})

app.listen(3000)