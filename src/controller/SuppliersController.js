const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService") 
const SuppliersModel = require("../models/Suppliers/SuppliersModel")

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