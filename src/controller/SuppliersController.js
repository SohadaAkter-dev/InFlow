const { Mongoose } = require("mongoose")
const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService") 
const PurchaseModel = require("../models/Purchase/PurchaseModel")
const SuppliersModel = require("../models/Suppliers/SuppliersModel")
const DeleteService = require("../Services/Common/DeleteService")

exports.CreateSupplier = async(req,res)=>{
    let result = await CreateService(req,SuppliersModel)
    res.status(200).json(result)
} 
exports.SupplierDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,SuppliersModel)
    res.status(200).json(result)
} 
exports.UpdateSupplier = async(req,res)=>{
    let result = await  UpdateService(req,SuppliersModel)
    res.status(200).json(result)
} 
exports.SupplierDropDown = async(req,res)=>{
    let result = await DropDownService(req,SuppliersModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.SupplierList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let array = [{customerName:searchRegex},{phone:searchRegex},{email:searchRegex},{address:searchRegex}]
    let result = await ListService(req,SuppliersModel,array)
    res.status(200).json(result)
} 
exports.DeleteSupplier = async (req,res)=>{
    let deleteId = req.params.ObjectId;
    let objectId = Mongoose.Types.ObjectId;
    let checkAssociation = await AssociateVerificationService({supplierId: new objectId(deleteId)},PurchaseModel);
    if(checkAssociation){
        return res.status(200).json({status:"associate",date:"Supplier has purchases"});
    }
    else{
        let result = await DeleteService(req,SuppliersModel);
        res.status(200).json(result);
    }
}