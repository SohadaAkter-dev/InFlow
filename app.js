const mongoose = require('mongoose');
const express = require('express')
const multer  = require('multer')
var cors = require('cors')
var bodyParser = require('body-parser');
const route = require('./src/routes/api');

const app= express()
app.use(bodyParser.json())
app.use(cors())

const uri ="mongodb+srv://practice:practice@cluster0.j7uymnz.mongodb.net/InFlow?retryWrites=true&w=majority"
const options = {user:"practice", pass:"practice"}
mongoose.connect(uri,options)
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))


app.use("/api/v1", route)
app.use("*",(req,res)=>{
    res.status(404).json({message:"not found"})
})


module.exports = app