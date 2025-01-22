const mongoose = require("mongoose")

const DetailsServiceById = async(Request,DataModel)=>{
    try{
        let id = Request.params.id 
        let email = Request.headers.email
        const ObjectId = mongoose.Types.ObjectId
        let query = {}
        query['_id'] = new ObjectId(id);
        query['userEmail'] = email;
        let data = await DataModel.aggregate([
        {$match: query},
        ])
        return {status:"success",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = DetailsServiceById