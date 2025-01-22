const { Mongoose, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
firstName:{type:String},
lastName:{type:String},
email:{type:String,unique:true},
password:{type:String},
photo:{type:String},
createDate:{type:Date,default:Date.now()}
},{versionKey:false})
const UserModel = mongoose.model("users",userSchema)
module.exports= UserModel