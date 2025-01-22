const { default: mongoose } = require("mongoose")
const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const BrandsModel = require("../models/Brands/BrandsModel")
const ProductModel = require("../models/Product/ProductModel")
const DeleteService = require("../Services/Common/DeleteService")
const AssociateVerificationService = require("../Services/Common/AssociateVerificationService")

exports.CreateBrand = async(req,res)=>{
    let result = await CreateService(req,BrandsModel)
    res.status(200).json(result)
} 
exports.BrandDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,BrandsModel)
    res.status(200).json(result)
} 
exports.UpdateBrand = async(req,res)=>{
    let result = await  UpdateService(req,BrandsModel)
    res.status(200).json(result)
} 
exports.BrandDropDown = async(req,res)=>{
    let result = await DropDownService(req,BrandsModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.BrandList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let array = [{name:searchRegex}]
    let result = await ListService(req,BrandsModel,array)
    res.status(200).json(result)
} 

const ObjectId = mongoose.Types.ObjectId
exports.BrandDelete = async(req,res)=>{
  let deleteId = req.params.id
  //check mongoose id validation
  const Id = ObjectId.isValid(deleteId) ? new ObjectId(deleteId) : null;
  if (!Id){
    return res.status(200).json({status:'fail' , data:'Invalid Brand Id'})
  }
  //check association before deleting
  let checkAssociation = await AssociateVerificationService({brandId:Id},ProductModel )
  if (checkAssociation){
    return res.status(200).json({status:'fail',data:'Brand is associated with products'})
  }
  else{
    let result = await DeleteService (req,BrandsModel)
    res.status(200).json(result)
  }
} 