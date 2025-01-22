const CreateService = async(Request,DataModel)=>{
    try{
        let body = Request.body
        body.userEmail = Request.headers.email 
        let data = await DataModel.create(body)
        return {status:"success",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = CreateService