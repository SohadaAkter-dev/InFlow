const { Mongoose, default: mongoose } = require("mongoose");

const supplierSchema = new mongoose.Schema({
    userEmail:{type:String},
    supplierName:{type:String},
    phone:{type:String, unique:true},
    email:{type:String,unique:true},
    address:{type:String},
    createdDate:{type:Date, default:Date.now()},
},{versionKey:false});

const SuppliersModel = mongoose.model("Suppliers",supplierSchema);
module.exports = SuppliersModel;