const { Mongoose, default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    userEmail:{type:String},
    name:{type:String},
    createdDate:{type:Date, default:Date.now()},
},{versionKey:false});

const categoryModel = mongoose.model("categories",categorySchema);
module.exports = categoryModel;