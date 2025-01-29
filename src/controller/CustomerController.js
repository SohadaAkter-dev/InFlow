const { default: mongoose } = require("mongoose")
const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService") 
const CustomerModel = require("../models/Customer/CustomerModel")
const AssociateVerificationService = require("../Services/Common/AssociateVerificationService")
const SalesModel = require("../models/Sales/SalesModel")
const DeleteService = require("../Services/Common/DeleteService")

exports.CreateCustomer = async(req,res)=>{
    let result = await CreateService(req,CustomerModel)
    res.status(200).json(result)
} 
exports.CustomerDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,CustomerModel)
    res.status(200).json(result)
} 
exports.UpdateCunstomer = async(req,res)=>{
    let result = await  UpdateService(req,CustomerModel)
    res.status(200).json(result)
} 
exports.CustomerDropDown = async(req,res)=>{
    let result = await DropDownService(req,CustomerModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.CustomerList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let array = [{customerName:searchRegex},{phone:searchRegex},{email:searchRegex},{address:searchRegex}]
    let result = await ListService(req,CustomerModel,array)
    res.status(200).json(result)
} 
exports.DeleteCustomer = async (req,res)=>{
    let deleteId = req.params.ObjectId;
    let objectId = mongoose.Types.ObjectId;
    let checkAssociation = await AssociateVerificationService({customerId: new objectId(deleteId)},SalesModel);
    if(checkAssociation){
        return res.status(200).json({status:"associate",date:"Customer has sale"});
    }
    else{
        let result = await DeleteService(req,CustomerModel);
        res.status(200).json(result);
    }
}