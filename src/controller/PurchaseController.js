const CreateParentChildService = require("../Services/Common/CreateParentChildService");
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService");
const OneJoinService = require("../Services/Common/OneJoinService");
const ParentModel = require("../models/Purchase/PurchaseModel")
const ChildModel = require("../models/Purchase/PurchaseProductModel")

exports.CreatePurchase = async(req,res)=>{
    let result = await CreateParentChildService(req,ParentModel , ChildModel, 'purchaseId');
    res.send(result)
}

exports.PurchaseList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let JoinStage={$lookup:{from:'suppliers',localField:'supplierId',foreignField:'_id',as:'supplier'}}; 
    let searchArray = [ {'supplier.supplierName':searchRegex},{'supplier.phone':searchRegex},{'supplier.email':searchRegex},{'supplier.address':searchRegex},{details:searchRegex}]
    let result = await OneJoinService(req,ParentModel,searchArray,JoinStage)
    res.status(200).json(result)
} 
exports.PurchaseDelete = async(req,res)=>{
    let result = await DeleteParentChildService(req,ParentModel , ChildModel, 'purchaseId');
    res.send(result)
}