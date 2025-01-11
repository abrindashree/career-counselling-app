const express = require('express')
const app = express()
const cors = require('cors')
const { Users } = require('./db') 
app.use(express.json())
app.use(cors())

app.post('/create-user', async(req, res)=>{
    const {username, email, password} =  req.body
    const user = await Users.findOne({
        email
    })
    if(user){
       res.json({
        msg: 'user already exist'
       })
    }
    else{
       const newUser = await Users.create({
        username,
        email,
        password
       })
       res.json({
        username,
        msg: "user successfully created.."
       })

    }
})

app.get("/signin", async(req, res)=>{
    const {email, password} = req.body
    const user = await Users.findOne({
        email,
        password
    })
    if(user){
        res.json({
            msg: 'signin successfully..'
        })
    }
    else{
        res.json({
            msg: 'email/password incorrect'
        })
    }
})

app.listen(3000,()=>{
    console.log("Started..");    
})