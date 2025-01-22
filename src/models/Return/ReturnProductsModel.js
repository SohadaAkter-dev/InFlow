const {mongoose } = require("mongoose");

const ReturnProductSchema = new mongoose.Schema({
    userEmail:{type:String},
    productId:{type:mongoose.Schema.Types.ObjectId}, 
    quantity:{type:Number},
    unitCost:{type:Number},
    total:{type:Number},
    returnId:{type:mongoose.Schema.Types.ObjectId},  
    createdDate:{type:Date, default:Date.now()},
},{versionKey:false});

const ReturnProductModel = mongoose.model("ReturnProducts",ReturnProductSchema);
module.exports = ReturnProductModel;