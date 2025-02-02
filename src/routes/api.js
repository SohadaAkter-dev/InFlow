const express = require('express')
const UsersController = require("../controller/UsersController")
const BrandsController = require("../controller/BrandsController")
const CategoryController = require("../controller/CategoryController")
const CustomerController = require("../controller/CustomerController")
const ProductController = require('../controller/ProductController')
const SupplierController = require("../controller/SuppliersController")
const ExpenseTypeController = require("../controller/ExpenseTypeController")
const ExpenseController = require("../controller/ExpenseController")
const PurchaseController = require("../controller/PurchaseController")
const SalesController = require("../controller/SalesController")
const ReturnController = require("../controller/ReturnController")
const ReportController = require("../controller/ReportController")
const SummaryController = require("../controller/SummaryController")
const testController = require('../controller/testController') 
const router = express.Router()
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware') 

router.get("/test",testController.test)

// user start
router.post("/registration", UsersController.Registration)
router.post("/login", UsersController.Login)
router.get("/profile-details", AuthVerifyMiddleware,UsersController.ProfileDetails)
router.get("/email-verify/:email", UsersController.EmailVerify)
router.get("/otp-verify/:email/:otp",  UsersController.OtpVerify)
router.post("/reset-password",  UsersController.ResetPassword)
router.post("/update-profile", AuthVerifyMiddleware, UsersController.UpdateUser)

//Brand start
router.post("/create-brand", AuthVerifyMiddleware, BrandsController.CreateBrand)
router.get("/brand-details/:id", AuthVerifyMiddleware, BrandsController.BrandDetailsById)
router.post("/brand-update/:id", AuthVerifyMiddleware, BrandsController.UpdateBrand)
router.get("/brand-dropdown", AuthVerifyMiddleware, BrandsController.BrandDropDown)
router.get("/brand-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, BrandsController.BrandList)
router.get("/brand-delete/:id", AuthVerifyMiddleware, BrandsController.BrandDelete)

//Category start
router.post("/create-category", AuthVerifyMiddleware, CategoryController.CreateCategory)
router.get("/category-details/:id", AuthVerifyMiddleware, CategoryController.CategoryDetailsById)
router.post("/category-update/:id", AuthVerifyMiddleware, CategoryController.UpdateCategory)
router.get("/category-dropdown", AuthVerifyMiddleware, CategoryController.CategoryDropDown)
router.get("/category-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware,  CategoryController.CategoryList)
router.get("/category-delete/:id", AuthVerifyMiddleware, CategoryController.CategoryDelete)


//Customer start
router.post("/create-customer", AuthVerifyMiddleware, CustomerController.CreateCustomer)
router.get("/customer-details/:id", AuthVerifyMiddleware, CustomerController.CustomerDetailsById)
router.post("/customer-update/:id", AuthVerifyMiddleware, CustomerController.UpdateCunstomer)
router.get("/customer-dropdown", AuthVerifyMiddleware, CustomerController.CustomerDropDown)
router.get("/customer-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware,  CustomerController.CustomerList)
router.get("/customer-delete/:id", AuthVerifyMiddleware, CustomerController.DeleteCustomer)

//Supplier start
router.post("/create-supplier", AuthVerifyMiddleware, SupplierController.CreateSupplier)
router.get("/supplier-details/:id", AuthVerifyMiddleware,SupplierController.SupplierDetailsById)
router.post("/supplier-update/:id", AuthVerifyMiddleware, SupplierController.UpdateSupplier)
router.get("/supplier-dropdown", AuthVerifyMiddleware, SupplierController.SupplierDropDown)
router.get("/supplier-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware,  SupplierController.SupplierList)
router.get("/supplier-delete/:id", AuthVerifyMiddleware, SupplierController.DeleteSupplier)

//product start
router.post("/create-product", AuthVerifyMiddleware,ProductController.CreateProduct)
router.get("/product-details/:id", AuthVerifyMiddleware,ProductController.ProductDetailsById)
router.post("/product-update/:id", AuthVerifyMiddleware,ProductController.UpdateProduct)
router.get("/product-dropdown", AuthVerifyMiddleware,ProductController.ProductDropDown)
router.get("/product-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, ProductController.ProductList)

// Expense Type start
router.post("/create-expense-type", AuthVerifyMiddleware,ExpenseTypeController.CreateExpenseType)
router.get("/expense-type-details/:id", AuthVerifyMiddleware,ExpenseTypeController.ExpenseTypeDetailsById)
router.post("/expense-type-update/:id", AuthVerifyMiddleware,ExpenseTypeController.UpdateExpenseType)
router.get("/expense-type-dropdown", AuthVerifyMiddleware,ExpenseTypeController.ExpenseTypeDropDown)
router.get("/expense-type-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, ExpenseTypeController.ExpenseTypeList)
router.get("/expense-type-delete/:id", AuthVerifyMiddleware, ExpenseTypeController.ExpenseTypeDelete)

// Expense start
router.post("/create-expense", AuthVerifyMiddleware,ExpenseController.CreateExpense)
router.get("/expense-details/:id", AuthVerifyMiddleware,ExpenseController.ExpenseDetailsById)
router.post("/expense-update/:id", AuthVerifyMiddleware,ExpenseController.UpdateExpense) 
router.get("/expense-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, ExpenseController.ExpenseList)
router.get("/expense-delete/:id", AuthVerifyMiddleware,ExpenseController.DeleteExpense)
router.get("/expense-dropdown", AuthVerifyMiddleware,ExpenseController.ExpenseDropDown)

// purchase start
router.post("/create-purchase", AuthVerifyMiddleware,PurchaseController.CreatePurchase)  
router.get("/purchase-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, PurchaseController.PurchaseList)
router.get("/purchase-delete/:id", AuthVerifyMiddleware,PurchaseController.PurchaseDelete)

// sales start
router.post("/create-sales", AuthVerifyMiddleware, SalesController.CreateSales)  
router.get("/sales-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, SalesController.SalesList)
router.get("/sales-delete/:id", AuthVerifyMiddleware,SalesController.SalesDelete)

// Return start
router.post("/create-return", AuthVerifyMiddleware, ReturnController.CreateReturn )  
router.get("/return-list/:pageNumber/:perPage/:searchtext", AuthVerifyMiddleware, ReturnController.ReturnList)
router.get("/return-delete/:id", AuthVerifyMiddleware,ReturnController.ReturnDelete)

// Report
router.post("/expense-report", AuthVerifyMiddleware,ReportController.ExpenseReportByDate )  
router.post("/purchase-report", AuthVerifyMiddleware,ReportController.PurchaseReportByDate )  
router.post("/sales-report", AuthVerifyMiddleware,ReportController.SaleReportByDate )  
router.post("/return-report", AuthVerifyMiddleware,ReportController.ReturnReportByDate )  

// Summary
router.get("/expense-summary", AuthVerifyMiddleware,SummaryController.ExpenseSummary )  
router.get("/purchase-summary", AuthVerifyMiddleware,SummaryController.PurchaseSummary )    
router.get("/return-summary", AuthVerifyMiddleware,SummaryController.ReturnSummary )    
router.get("/sales-summary", AuthVerifyMiddleware,SummaryController.SalesSummary )    

module.exports= router