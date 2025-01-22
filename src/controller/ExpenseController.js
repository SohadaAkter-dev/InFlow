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
const ExpenseModel = require("../models/Expense/ExpenseModel")
const OneJoinService = require("../Services/Common/OneJoinService")

exports.CreateExpense = async(req,res)=>{
    let result = await CreateService(req,ExpenseModel)
    res.status(200).json(result)
} 
exports.ExpenseDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,ExpenseModel)
    res.status(200).json(result)
} 
exports.UpdateExpense = async(req,res)=>{
    let result = await  UpdateService(req,ExpenseModel)
    res.status(200).json(result)
}  
exports.DeleteExpense = async(req,res)=>{
    let result = await  DeleteService(req,ExpenseModel)
    res.status(200).json(result)
}
exports.ExpenseList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let JoinStageOne={$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'Type'}}; 
    let array = [{expenseTypeId:searchRegex},{amount:searchRegex},{description:searchRegex},{'Type.name':searchRegex}]
    let result = await OneJoinService(req,ExpenseModel,array,JoinStageOne)
    res.status(200).json(result)
} 

