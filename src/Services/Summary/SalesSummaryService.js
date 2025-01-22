const SalesModel = require("../../models/Sales/SalesModel")

const SalesSummaryService = async(req)=>{
    try{
    let userEmail = req.headers.email
    let data = await SalesModel.aggregate([
    {$match:{userEmail:userEmail}},
    {
    $facet:{
        total:[{$group:{_id:0,totalAmount:{$sum:"$grandTotal"}}}],
        last30Days:[{
        $group:{
            _id:{$dateToString:{format:"%Y-%m-%d",date:"$createdDate"}},
            totalAmount:{$sum:"$grandTotal"}
        }
        },{$sort:{_id:-1}},{$limit:30}]
    }
    }
        ])
        return {status:"success",data:data}
    }
    catch(error){
        return {status:"fail",data:data}
    }
}
module.exports = SalesSummaryService