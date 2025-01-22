const { default: mongoose } = require("mongoose")
const CreateService = require("../Services/Common/CreateService")
const DetailsServiceById = require("../Services/Common/DetailsServiceById")
const DropDownService = require("../Services/Common/DropDownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const CategoryModel = require("../models/Category/CategoryModel")
const AssociateVerificationService = require("../Services/Common/AssociateVerificationService")
const DeleteService = require("../Services/Common/DeleteService")
const ProductModel = require("../models/Product/ProductModel")

exports.CreateCategory = async(req,res)=>{
    let result = await CreateService(req,CategoryModel)
    res.status(200).json(result)
} 
exports.CategoryDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,CategoryModel)
    res.status(200).json(result)
} 
exports.UpdateCategory = async(req,res)=>{
    let result = await  UpdateService(req,CategoryModel)
    res.status(200).json(result)
} 
exports.CategoryDropDown = async(req,res)=>{
    let result = await DropDownService(req,CategoryModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.CategoryList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let array = [{name:searchRegex}]
    let result = await ListService(req,CategoryModel,array)
    res.status(200).json(result)
} 

const ObjectId = mongoose.Types.ObjectId
exports.CategoryDelete = async(req,res)=>{
  let deleteId = req.params.id
  //check mongoose id validation
  const Id = ObjectId.isValid(deleteId) ? new ObjectId(deleteId) : null;
  if (!Id){
    return res.status(200).json({status:'fail' , data:'Invalid Category Id'})
  }
  //check association before deleting
  let checkAssociation = await AssociateVerificationService({categoryId:Id},ProductModel )
  if (checkAssociation){
    return res.status(200).json({status:'fail',data:'Category is associated with products'})
  }
  else{
    let result = await DeleteService (req,CategoryModel)
    res.status(200).json(result)
  }
} 