const { Mongoose, default: mongoose } = require("mongoose");

const ExpenseTypeSchema = new mongoose.Schema({
userEmail:{type:String},
name:{type:String},
createDate:{type: Date,default :Date.now()},
},{versionKey:false})
const ExpenseTypeModel = mongoose.model("ExpenseType", ExpenseTypeSchema)
module.exports = ExpenseTypeModel