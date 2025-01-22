const { Mongoose, default: mongoose } = require("mongoose");

const brandsSchema = new mongoose.Schema({
userEmail:{type:String},
name:{type:String},
createDate:{type: Date,default :Date.now()},
},{versionKey:false})
const BrandsModel = mongoose.model("brands", brandsSchema)
module.exports = BrandsModel