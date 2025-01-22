const CreateParentChildService = require("../Services/Common/CreateParentChildService");
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService");
const OneJoinService = require("../Services/Common/OneJoinService");
const ParentModel = require("../models/Sales/SalesModel")
const ChildModel = require("../models/Sales/SalesProductsModel")

exports.CreateSales = async(req,res)=>{
    let result = await CreateParentChildService(req,ParentModel , ChildModel, 'salesId');
    res.send(result)
}

exports.SalesList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let JoinStage={$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customer'}}; 
    let searchArray = [ {'customer.customerName':searchRegex},{'customer.phone':searchRegex},{'customer.email':searchRegex},{'customer.address':searchRegex},{details:searchRegex}]
    let result = await OneJoinService(req,ParentModel,searchArray,JoinStage)
    res.status(200).json(result)
} 
exports.SalesDelete = async(req,res)=>{
    let result = await DeleteParentChildService(req,ParentModel , ChildModel, 'salesId');
    res.send(result)
}