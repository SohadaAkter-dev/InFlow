const otpModel = require('../../models/Users/OtpModel'); 
const UserUpdateService = async(Request,DataModel)=>{
    try{
        let data = await DataModel.updateOne ({email:Request.headers.email},Request.body) 
        return {status:"succes",data: data}  
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = UserUpdateService