const mongoose = require("mongoose")

const DeleteService = async(Request,DataModel)=>{
    try{
        let id = Request.params.id 
        let email = Request.headers.email 
        let query = {}
        query['_id'] = id
        query['userEmail'] = email;
        let data = await DataModel.deleteOne(query)
        return {status:"success",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = DeleteService