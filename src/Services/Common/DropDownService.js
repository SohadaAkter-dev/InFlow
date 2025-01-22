const mongoose = require("mongoose")

const DropDownService = async(Request,DataModel,projection)=>{
    try{ 
        let userEmail = Request.headers.email 
        let data = await DataModel.aggregate([
        {$match: {userEmail:userEmail}},
        {$project: projection},
        ])
        return {status:"success",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = DropDownService