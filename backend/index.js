const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/signin', (req, res) => {
    const body = req.body;
    const { username} = body
    
    res.status(200)
   res.json({
    msg: "Signin Successful",
    username
   })
    
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
