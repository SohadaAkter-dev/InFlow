const cloudinary = require("../utility/Cloudinary")
const ProductModel = require("../models/Product/ProductModel")
const multer = require("multer")
const path = require("path");
const DetailsServiceById = require("../Services/Common/DetailsServiceById");
const UpdateService = require("../Services/Common/UpdateService");
const DropDownService = require("../Services/Common/DropDownService");
const ListService = require("../Services/Common/ListService");
const TwoJoinService = require("../Services/Common/TwoJoinService");
//Multer configuarartion

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function (req,file,cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(new Error('Not an image! Please upload an image.',404),false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024*1024*10} //10 MB file size
}).array('images',5) // Allow up to 5 images to be uploaded

exports.CreateProduct = async(req,res)=>{
    try{
        // Handle from data using multer
        upload(req,res,async(err)=>{
        if(err){
            return res.status(400).json({status:"fail",message:err.message});
        }
        //extract from data and file
        const body = req.body;
        const images = req.files.map(file=>file.path);

        //upload images to cloudinary
        const promises = images.map(imagePath=>{
            return cloudinary.uploader.upload(imagePath,{
            folder: "ProductImages"//specify the folder name
        });
        });
        const uploadImages = await Promise.all(promises);

        //create new product with cloudinary image URLS 
        const email = req.headers['email'];
        const product = await ProductModel.create({
        userEmail : email,
        name : body.name,
        unit : body.unit,
        details : body.details,
        images : uploadImages.map(img=> img.secure_url),//store image URLS in an array
        categoryId : body.categoryId,
        brandId : body.brandId,
        });
        return res.status(200).json({status: "succes",data:product});
    })
    }
    catch(error){
        res.status(500).json({status:"fail",data:error});
    }
}

exports.ProductDetailsById = async(req,res)=>{
    let result = await  DetailsServiceById(req,ProductModel)
    res.status(200).json(result)
} 
exports.UpdateProduct = async(req,res)=>{
    try{
        //handle from data using multer
        upload(req,res,async(err)=>{
        if(err){
            return res.status(400).json({status:'fail',message:err.message})
        }
        //Extract from data and files
        const body = req.body;
        const images= req.files.map(file=>file.path);
        let id = req.params.id;
        const userEmail = req.headers.email;

        //find the existing product by ID and userEmail
        let product = await ProductModel.findOne({_id:id,userEmail:userEmail});
        if(!product){
            return res.status(404).json({status:'fail',message:'Product not found'});
        }

        //Delete old images from cloudinary
        if (product.images && product.images.length>0){
         const deletePromises = product.images.map(imageURL=>{
            //Extract public_id from image URL
            const publicId = imageURL.split('/').pop().split('.')[0];
            return cloudinary.uploader.destroy(`productImages/${publicId}`);
         });
         await Promise.all(deletePromises);
        }

        //upload new images to cloudinary
        const promises = images.map(imagePath=>{
            return cloudinary.uploader.upload(imagePath,{
            folder: "ProductImages"//specify the folder name
        });
        });
        const uploadImages = await Promise.all(promises);
        //update product with new image URLS
        const updateData = {  
        name : body.name,
        unit : body.unit,
        details : body.details,
        images : uploadImages.map(img=> img.secure_url),//store image URLS in an array
        categoryId : body.categoryId,
        brandId : body.brandId,
        };
        await ProductModel.updateOne({_id:id,userEmail:userEmail},updateData);

        return res.status(200).json({status:'success',data:updateData});
        });
    }
    catch(error){
        return res.status(500).json({status:'fail',data:error})
    }
} 
exports.ProductDropDown = async(req,res)=>{
    let result = await DropDownService(req,ProductModel,{_id:1, name:1})
    res.status(200).json(result)
} 
exports.ProductList = async(req,res)=>{
    let searchRegex = {$regex:req.params.searchtext,$options:"i"};
    let JoinStageOne={$lookup:{from:'brands',localField:'brandId',foreignField:'_id',as:'brand'}};
    let JoinStageTwo={$lookup:{from:'categories',localField:'categoryId',foreignField:'_id',as:'category'}};
    let array = [{name:searchRegex},{unit:searchRegex},{details:searchRegex},{'brand.name':searchRegex},{'category.name':searchRegex}]
    let result = await TwoJoinService(req,ProductModel,array,JoinStageOne,JoinStageTwo)
    res.status(200).json(result)
} 
 