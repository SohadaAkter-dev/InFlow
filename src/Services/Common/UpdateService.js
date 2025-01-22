const UpdateService = async(Request,DataModel)=>{
    try{
        let id = Request.params.id 
        let email = Request.headers.email
        let body = Request.body

        let data = await DataModel.updateOne({_id:id, userEmail:email},body)
        return {status:"success",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = UpdateService