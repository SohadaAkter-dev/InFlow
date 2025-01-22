const { Mongoose, default: mongoose } = require("mongoose");

const purchaseProductSchema = new mongoose.Schema({
    userEmail:{type:String},
    productId:{type:mongoose.Schema.Types.ObjectId}, 
    quantity:{type:Number},
    unitCost:{type:Number},
    total:{type:Number},
    purchaseId:{type:mongoose.Schema.Types.ObjectId},  
    createdDate:{type:Date, default:Date.now()},
},{versionKey:false});

const PurchaseProductModel = mongoose.model("purchaseProducts",purchaseProductSchema);
module.exports = PurchaseProductModel;