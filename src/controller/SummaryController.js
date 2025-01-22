const ExpenseSummaryService = require("../Services/Summary/ExpenseSummaryService");
const PurchaseSummaryService = require("../Services/Summary/PurchaseSummaryService");
const ReturnSummaryService = require("../Services/Summary/ReturnSummaryService");
const SalesSummaryService = require("../Services/Summary/SalesSummaryService");

exports.ExpenseSummary = async(req,res)=>{
    let result = await ExpenseSummaryService(req);
    res.send(result)
}
exports.PurchaseSummary = async(req,res)=>{
    let result = await PurchaseSummaryService(req);
    res.send(result)
}
exports.ReturnSummary = async(req,res)=>{
    let result = await ReturnSummaryService(req);
    res.send(result)
}
exports.SalesSummary = async(req,res)=>{
    let result = await SalesSummaryService(req);
    res.send(result)
}