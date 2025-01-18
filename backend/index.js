const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const { Users } = require('./db') 
app.use(express.json())
app.use(cors())

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
            res.status(200).json({
                success: true,
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