const mongoose = require('mongoose')

try{
    mongoose.connect("mongodb://0.0.0.0:27017/testDB")
    console.log("db connected successfully");
}catch(e){
    console.log(e);
}

const usersSchema = new mongoose.Schema({
    username : String,
    email : String,
    password: String
})

const Users = mongoose.model("users-table",usersSchema)

module.exports = {
    Users 
}