const { Mongoose, default: mongoose } = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
userEmail:{type:String},
expenseTypeId:{type:mongoose.Schema.Types.ObjectId},
amount:{type: Number},
description:{type: String},
createDate:{type: Date,default :Date.now()},
},{versionKey:false})
const ExpenseModel = mongoose.model("Expense", ExpenseSchema)
module.exports = ExpenseModel