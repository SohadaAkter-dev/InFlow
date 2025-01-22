const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService") 
const CustomerModel = require("../models/Customer/CustomerModel")

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