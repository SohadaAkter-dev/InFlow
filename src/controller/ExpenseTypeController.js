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
const ExpenseTypeModel = require("../models/Expense/ExpenseTypeModel")
const ExpenseModel = require("../models/Expense/ExpenseModel")

exports.CreateExpenseType = async(req,res)=>{
    let result = await CreateService(req,ExpenseTypeModel)
    res.status(200).json(result)
} 
exports.ExpenseTypeDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,ExpenseTypeModel)
    res.status(200).json(result)
} 
exports.UpdateExpenseType = async(req,res)=>{
    let result = await  UpdateService(req,ExpenseTypeModel)
    res.status(200).json(result)
} 
exports.ExpenseTypeDropDown = async(req,res)=>{
    let result = await DropDownService(req,ExpenseTypeModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.ExpenseTypeList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let array = [{name:searchRegex}]
    let result = await ListService(req,ExpenseTypeModel,array)
    res.status(200).json(result)
} 

const ObjectId = mongoose.Types.ObjectId
exports.ExpenseTypeDelete = async(req,res)=>{
  let deleteId = req.params.id
  //check mongoose id validation
  const ObjectId= mongoose.Types.ObjectId
 
  //check association before deleting
  let checkAssociation = await AssociateVerificationService({expenseTypeId: new ObjectId(deleteId)},ExpenseModel )
  if (checkAssociation){
    return res.status(200).json({status:'associate',data:'Expense has Expense'})
  }
  else{
    let result = await DeleteService (req,ExpenseTypeModel)
    res.status(200).json(result)
  }
} 