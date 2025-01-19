const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const { Users } = require('./db') 
const jwt = require("jsonwebtoken")
require("dotenv").config();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.post('/create-user', async(req, res)=>{
    const {username, email, password} =  req.body
    console.log(req.body);
    
    const user = await Users.findOne({
        email
    })
    if(user){
       res.json({
        msg: 'user already exist'
       })       
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await Users.create({
        username,
        email,
        password : hashedPassword
       })
       res.json({
        username,
        msg: "user successfully created.."
       })

    }
})

app.post("/signin", async(req, res)=>{
    const {email, password} = req.body    
    const user = await Users.findOne({
        email        
    })    
    if(user){
        const isPasswordCorrect = await bcrypt.compare(password, user.password)    
        if(isPasswordCorrect){
            const { username } = user            
            const jwtToken = jwt.sign({
                username
            }, process.env.JWT_SECRET)                           
            res.status(200).json({
                username,
                success: true,
                jwtToken,
                msg: 'signin successfully..'
            })
        }
        else{
            res.json({
                success: false,
                msg: 'email/password incorrect'
            })
        }
    }else{
        res.json({
            success: false,
            msg: "user does not exist"
        })
    }
    
})

app.listen(3000,()=>{
    console.log("Started..");    
})