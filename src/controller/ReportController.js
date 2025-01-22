const ExpenseReportService = require("../Services/Report/ExpenseReportService")
const PurchaseReportService = require("../Services/Report/PurchaseReportService")
const ReturnReportService = require("../Services/Report/ReturnReportService")
const SaleReportService = require("../Services/Report/SaleReportService")

exports.ExpenseReportByDate = async(req,res)=>{
    let result = await ExpenseReportService(req)
    res.status(200).json(result)
}
exports.PurchaseReportByDate = async(req,res)=>{
    let result = await PurchaseReportService(req)
    res.status(200).json(result)
}
exports.SaleReportByDate = async(req,res)=>{
    let result = await SaleReportService(req)
    res.status(200).json(result)
}
exports.ReturnReportByDate = async(req,res)=>{
    let result = await ReturnReportService(req)
    res.status(200).json(result)
}

