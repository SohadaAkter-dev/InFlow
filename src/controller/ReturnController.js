const CreateParentChildService = require("../Services/Common/CreateParentChildService");
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService");
const OneJoinService = require("../Services/Common/OneJoinService");
const ParentModel = require("../models/Return/ReturnModel")
const ChildModel = require("../models/Return/ReturnProductsModel")

exports.CreateReturn = async(req,res)=>{
    let result = await CreateParentChildService(req,ParentModel , ChildModel, 'returnId');
    res.send(result)
}

exports.ReturnList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let JoinStage={$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customer'}}; 
    let searchArray = [ {'customer.customerName':searchRegex},{'customer.phone':searchRegex},{'customer.email':searchRegex},{'customer.address':searchRegex},{details:searchRegex}]
    let result = await OneJoinService(req,ParentModel,searchArray,JoinStage)
    res.status(200).json(result)
} 
exports.ReturnDelete = async(req,res)=>{
    let result = await DeleteParentChildService(req,ParentModel , ChildModel, 'returnId');
    res.send(result)
}